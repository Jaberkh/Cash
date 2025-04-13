import fs from "fs/promises";
import path from "path";

const CACHE_PATH = path.join("data", "DB.json");

async function fetchDuneData() {
  const res = await fetch("https://api.dune.com/api/v1/query/4837362/results?api_key=" + process.env.DUNE_API_KEY);
  if (!res.ok) throw new Error("Failed to fetch data from Dune");
  return await res.json();
}

async function updateCache() {
  const data = await fetchDuneData();
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, JSON.stringify({ updatedAt: Date.now(), data }, null, 2));
  console.log("✅ Dune data cached successfully.");
}

updateCache().catch(err => {
  console.error("❌ Failed to update Dune cache:", err);
  process.exit(1);
});
