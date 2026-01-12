import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { todoService } from "./services";
import { CreateTodoSchema, UpdateTodoSchema } from "./schemas";

export const todoRoutes = new Hono();

todoRoutes.get("/", (c) => {
  try {
    const todos = todoService.getAll();
    return c.json(todos);
  } catch (error) {
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

todoRoutes.post("/", zValidator("json", CreateTodoSchema), (c) => {
  try {
    const data = c.req.valid("json");
    const todo = todoService.create(data);
    return c.json(todo, 201);
  } catch (error) {
    return c.json({ error: "Failed to create todo" }, 500);
  }
});

todoRoutes.patch("/:id", zValidator("json", UpdateTodoSchema), (c) => {
  try {
    const id = c.req.param("id");
    const data = c.req.valid("json");

    const todo = todoService.update(id, data);
    if (!todo) {
      return c.json({ error: "Todo not found" }, 404);
    }

    return c.json(todo);
  } catch (error) {
    return c.json({ error: "Failed to update todo" }, 500);
  }
});

todoRoutes.delete("/:id", (c) => {
  try {
    const id = c.req.param("id");
    const deleted = todoService.delete(id);

    if (!deleted) {
      return c.json({ error: "Todo not found" }, 404);
    }

    return c.body(null, 204);
  } catch (error) {
    return c.json({ error: "Failed to delete todo" }, 500);
  }
});
