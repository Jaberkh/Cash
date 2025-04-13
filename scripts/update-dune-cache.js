// scripts/update-dune-cache.js
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const CACHE_PATH = path.join(__dirname, "../data/DB.json");

async function updateCache() {
  const duneRes = await fetch(`https://api.dune.com/api/v1/query/4837362/results?api_key=${process.env.DUNE_API_KEY}`);
  if (!duneRes.ok) throw new Error("Failed to fetch Dune data");
  const duneJson = await duneRes.json();

  const updatedData = {
    updatedAt: Date.now(),
    data: duneJson,
  };

  fs.writeFileSync(CACHE_PATH, JSON.stringify(updatedData, null, 2));
  console.log("✅ Cache updated!");
}

updateCache().catch((err) => {
  console.error("❌ Failed to update cache:", err);
  process.exit(1);
});
