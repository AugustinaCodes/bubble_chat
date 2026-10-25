import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Welcome to Bubble Chat!",
    status: "success",
  });
});

app.get("/api/health", (c) => {
  return c.json({
    status: "ok",
    message: "Bubble Chat backend is running!",
  });
});

export default {
  port: 3000,
  fetch: app.fetch,
};
