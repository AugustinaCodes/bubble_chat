import "dotenv/config";

const apiKey = process.env.KRDICT_API_KEY;

if (!apiKey) {
  console.error("API key not found");
  process.exit(1);
}

console.log("API key loaded successfully");
