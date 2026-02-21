const mongoose = require("mongoose");
// Artical schema
const articleSchema = new mongoose.Schema(
  {
    newsId: { type: String, required: true, unique: true },
    title: String,
    link: String,
    image_url: String,
    description: String,
    content: String,
    pubDate: Date,
    language: String,
    country: String,
    category: [String],
    author: String,
    source: String,
    contentType: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Article", articleSchema);
