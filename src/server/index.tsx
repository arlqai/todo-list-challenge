import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { todoRoutes } from "./todos/routes";
import { renderToString } from "react-dom/server";

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
} else {
  app.get("/*", (c) =>
    c.html(
      renderToString(
        <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Todo List Challenge</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main.tsx"></script>
          </body>
        </html>
      ),
      200
    )
  );
}
// In development: @hono/vite-dev-server automatically serves index.html for non-API routes

export default app;
