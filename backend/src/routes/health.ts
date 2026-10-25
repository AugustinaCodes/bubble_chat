import { Hono } from "hono";

const health = new Hono();

health.get("/", (c) => {
  return c.json({
    status: "ok",
    message: "Bubbble Chat API is running!",
  });
});

export default health;
