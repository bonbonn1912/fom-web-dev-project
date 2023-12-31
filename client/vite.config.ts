import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { compression } from 'vite-plugin-compression2'
export default defineConfig({
  plugins: [
    react(),
    compression(),
    VitePWA({
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^\/logout/,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^\/auth\//,
            handler: "NetworkOnly", // oder ein anderer Handler, je nach Anforderung
          },
          {
            urlPattern: /^\/api/,
            handler: "NetworkOnly",
          },
        ],
        navigateFallbackDenylist: [/^\/auth\//, /^\/logout/,/^\/api\//],
      },
      manifest: {
        start_url: "/",
        scope: "/",
        display: "standalone",
        shortcuts: [
          {
            name: "Dashboard",
            short_name: "DB",
            description: "Your Workout Dashboard",
            url: "/dashboard/workouts",
            icons: [
              {
                src: "bicycle.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
              },
            ],
          },
        ],
        icons: [
          {
            src: "bicycle.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
 // plugins: [react()],
  build: {
    outDir: "../build/client/",
  },
  server: {
    port: 3001,
    strictPort: true,
    proxy: {
      "/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/logout": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
