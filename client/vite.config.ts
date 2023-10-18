import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [react(),VitePWA({
    manifest:{
      start_url: "/",
      scope: "/",
      display: "standalone",
      icons:[{
        src: "bicycle.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }]
    }
  })],
  build: {
    outDir: '../build/client/'
  },
  server: {
    port: 3001,
    strictPort: true,
    proxy: {
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
