const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

router.get("/news", async (req, res) => {
  try {
    const {
      category,
      language,
      country,
      author,
      startDate,
      endDate,
      contentType,
    } = req.query;

    // ১. Query Object making
    let query = {};

    if (category) query.category = { $in: [category] }; // Multi-select
    if (language) query.language = language;
    if (country) query.country = country;
    if (author) query.author = { $regex: author, $options: "i" }; // Case-insensitive search
    if (contentType) query.contentType = contentType;

    // ২. Date Range Filter
    if (startDate || endDate) {
      query.pubDate = {};
      if (startDate) query.pubDate.$gte = new Date(startDate);
      if (endDate) query.pubDate.$lte = new Date(endDate);
    }

    // ৩. last sorting
    const news = await Article.find(query).sort({ pubDate: -1 });

    res.json({
      total: news.length,
      data: news,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
// GET: /api/news/trending
router.get("/news/trending", async (req, res) => {
  try {
    // top news
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const trendingNews = await Article.find({
      pubDate: { $gte: oneDayAgo },
    })
      .sort({ pubDate: -1 })
      .limit(10);

    res.json({ success: true, data: trendingNews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Trending fetch failed" });
  }
});

module.exports = router;
