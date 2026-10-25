import { Hono } from "hono";
import health from "./routes/health";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Welcome to Bubble Chat!",
    status: "success",
  });
});

app.route("/api/health", health);

export default {
  port: 3000,
  fetch: app.fetch,
};
