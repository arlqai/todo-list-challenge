import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { serveStatic } from "@hono/node-server/serve-static";
import { db } from "./db";
import { CreateTodoSchema, UpdateTodoSchema } from "./schemas";

const app = new Hono();

// API Routes
app.get("/api/todos", (c) => {
  try {
    const todos = db.getAll();
    return c.json(todos);
  } catch (error) {
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

app.post("/api/todos", zValidator("json", CreateTodoSchema), (c) => {
  try {
    const data = c.req.valid("json");
    const todo = db.create({ ...data, completed: false });
    return c.json(todo, 201);
  } catch (error) {
    return c.json({ error: "Failed to create todo" }, 500);
  }
});

app.patch("/api/todos/:id", zValidator("json", UpdateTodoSchema), (c) => {
  try {
    const id = c.req.param("id");
    const data = c.req.valid("json");

    const todo = db.update(id, data);
    if (!todo) {
      return c.json({ error: "Todo not found" }, 404);
    }

    return c.json(todo);
  } catch (error) {
    return c.json({ error: "Failed to update todo" }, 500);
  }
});

app.delete("/api/todos/:id", (c) => {
  try {
    const id = c.req.param("id");
    const deleted = db.delete(id);

    if (!deleted) {
      return c.json({ error: "Todo not found" }, 404);
    }

    return c.body(null, 204);
  } catch (error) {
    return c.json({ error: "Failed to delete todo" }, 500);
  }
});

// In production: serve static files and handle SPA routing
if (import.meta.env.PROD) {
  app.use("/*", serveStatic({ root: "./dist/client" }));

  // Fallback for client-side routing
  app.get("*", async (c) => {
    return c.notFound(); // Will be caught by serveStatic middleware above
  });
}
// In development: @hono/vite-dev-server automatically serves index.html for non-API routes

export default app;
