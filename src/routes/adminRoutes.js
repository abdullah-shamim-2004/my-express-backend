const express = require("express");
const fetchAndStoreNews = require("../services/newsIngestionService");

const router = express.Router();

router.get("/refresh-news", async (req, res) => {
  await fetchAndStoreNews();
  res.json({ message: "News refreshed manually" });
});

module.exports = router;