import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { todoRoutes } from "./todos/routes";

const app = new Hono();

// API Routes
app.route("/api/todos", todoRoutes);

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
