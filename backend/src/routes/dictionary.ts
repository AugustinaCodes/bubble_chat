import { Hono } from "hono";
import { XMLParser } from "fast-xml-parser";

const dictionary = new Hono();
const parser = new XMLParser();

dictionary.get("/", async (c) => {
  const query = c.req.query("query")?.trim();

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

    const channel = jsonData.channel;

    if (!channel) {
      return c.json({ error: "Invalid dictionary response" }, 502);
    }

    // The main data we are interested in:
    // const word = channel.item[0].word;
    const {
      item: [
        {
          word,
          pronunciation,
          sense: [
            {
              definition,
              translation: { trans_word, trans_dfn },
            },
          ],
        },
      ],
    } = channel;

    const newObj = {
      searchedWord: word,
      pronunciation: pronunciation,
      wordDefinition: definition,
      englishTranslation: trans_word,
      translationDefinition: trans_dfn,
    };

    console.log(word, pronunciation, definition, trans_word, trans_dfn);
    console.log(newObj);

    //return c.json(jsonData);
    return c.json(newObj);
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
