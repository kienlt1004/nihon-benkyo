import { executeServerSync } from "../lib/serverSync";

async function main() {
  console.log("Starting full Firestore sync for N3 Kanji & Vocabulary...");
  try {
    const res = await executeServerSync("initial_seed");
    console.log("Sync result:", JSON.stringify(res, null, 2));
    process.exit(0);
  } catch (err) {
    console.error("Sync error:", err);
    process.exit(1);
  }
}

main();
