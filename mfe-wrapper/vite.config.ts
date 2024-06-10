import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    federation({
      name: "wrapper-app",
      remotes: {
        todoList: "http://localhost:5001/assets/todolistRemoteEntry.js",
        todoManager: "http://localhost:5002/assets/todoManagerRemoteEntry.js",
        todoAuth: "http://localhost:5003/assets/todoAuthRemoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});