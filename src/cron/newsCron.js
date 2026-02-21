const cron = require("node-cron");
const fetchAndStoreNews = require("../services/newsIngestionService");

const startNewsCron = async () => {
  // 1 . after route start it will bring data
  console.log("Fetching initial news right now...");
  try {
    await fetchAndStoreNews();
    console.log("Initial news fetch successful!");
  } catch (error) {
    console.error("Initial fetch failed:", error);
  }

  // ২. every six hour it will bring data
  cron.schedule("0 */6 * * *", async () => {
    console.log("Running scheduled news fetch...");
    await fetchAndStoreNews();
  });

  console.log("News cron scheduled (every 6 hours)");
};

module.exports = startNewsCron;
