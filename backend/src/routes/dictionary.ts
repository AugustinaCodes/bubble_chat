import { Hono } from "hono";
import { XMLParser } from "fast-xml-parser";

const dictionary = new Hono();
const parser = new XMLParser();

dictionary.get("/", async (c) => {
  const query = c.req.query("query");

  // Checking if the query was provided
  if (!query) {
    return c.json(
      {
        error: "Please provide a search query",
      },
      400,
    );
  }

  const apiKey = process.env.KRDICT_API_KEY;

  if (!apiKey) {
    return c.json(
      {
        error: "Dictionary API key is missing",
      },
      500,
    );
  }

  try {
    const url = new URL("https://krdict.korean.go.kr/api/search");

    url.searchParams.set("key", apiKey);
    url.searchParams.set("q", query);
    url.searchParams.set("translated", "y");
    url.searchParams.set("trans_lang", "1");

    const response = await fetch(url);

    if (!response) {
      return c.json(
        {
          error: "Dictionary API request failed",
        },
        502,
      );
    }

    // Get the XML response
    const xmlData = await response.text();

    // Convert XML into JSON
    const jsonData = parser.parse(xmlData);

    return c.json(jsonData);
  } catch (error) {
    console.error("Dictionary error:", error);
    return c.json(
      {
        error: "Something went wrong while searching",
      },
      500,
    );
  }
});

export default dictionary;
