require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const startNewsCron = require("./cron/newsCron");
const adminRoutes = require("./routes/adminRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();
const port = process.env.PORT || 3000;

// ১. Middleware
app.use(express.json());
app.use(cors());

// ২. MongoDB Connection (Mongoose)
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected via Mongoose");

    // ৩. after srver connect cron job start
    startNewsCron();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ৪. Routes
app.get("/", (req, res) => {
  res.send("News Aggregator Server is Running...");
});

// admin role for manually refresh data
app.use("/api/admin", adminRoutes);

// main news route for front-end call 
app.use("/api", newsRoutes);

// ৫. Server Listen
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
