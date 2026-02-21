const axios = require("axios");
const Article = require("../models/Article");

const fetchAndStoreNews = async () => {
  try {
    console.log("Fetching news...");

    const response = await axios.get("https://newsdata.io/api/1/news", {
      params: {
        apikey: process.env.NEWSDATA_API_KEY,
        category: "technology",
        language: "en",
      },
    });

    const articles = response.data.results;

    for (const item of articles) {
      const normalizedArticle = {
        newsId: item.article_id,
        title: item.title,
        link: item.link,
        image_url: item.image_url || null,
        description: item.description,
        content: item.content,
        pubDate: new Date(item.pubDate),
        language: item.language,
        country: item.country?.[0],
        category: item.category,
        author: item.creator?.[0],
        source: item.source_id,
        contentType: item.type,
      };

      await Article.findOneAndUpdate(
        { newsId: normalizedArticle.newsId },
        normalizedArticle,
        { upsert: true, new: true },
      );
    }

    console.log("News updated successfully!");
  } catch (error) {
    console.error("Error fetching news:", error.message);
  }
};

module.exports = fetchAndStoreNews;
