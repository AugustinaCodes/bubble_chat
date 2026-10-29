import "dotenv/config";

const apiKey = process.env.KRDICT_API_KEY;

if (!apiKey) {
  throw new Error("API key is missing");
}

const url = new URL("https://krdict.korean.go.kr/api/search");

url.searchParams.set("key", apiKey);
url.searchParams.set("q", "사랑");
url.searchParams.set("translated", "y");
url.searchParams.set("trans_lang", "1");

try {
  const response = await fetch(url);
  console.log("HTTP status:", response.status);
  const data = await response.text();

  if (!response.ok) {
    console.error("The API request failed");
    process.exit(1);
  } else {
    console.log("Dictionary API response:");
    console.log(data);
  }
} catch (error) {
  console.error("Could not connect to the dictonary API", error);
  process.exitCode = 1;
}
