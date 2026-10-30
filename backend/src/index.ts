import "dotenv/config";
import { Hono } from "hono";
import health from "./routes/health";
import dictionary from "./routes/dictionary";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Welcome to Bubble Chat!",
    status: "success",
  });
});

app.route("/api/health", health);

app.route("/api/dictionary", dictionary);
console.log(
  "API key loaded:",

  Boolean(process.env.KRDICT_API_KEY),
);

export default {
  port: 3000,
  fetch: app.fetch,
};
