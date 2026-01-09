import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import devServer from '@hono/vite-dev-server';
import build from '@hono/vite-build/node';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [react()],
      build: {
        outDir: 'dist/client',
        rollupOptions: {
          input: '/index.html',
        },
      },
      resolve: {
        alias: {
          '#': '/src',
        },
      },
    };
  }

  return {
    plugins: [
      devServer({
        entry: 'src/server/index.ts',
      }),
      react(),
      build({
        entry: 'src/server/index.ts',
        outputDir: 'dist',
      }),
    ],
    resolve: {
      alias: {
        '#': '/src',
      },
    },
  };
});
