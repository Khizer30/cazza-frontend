import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist"
  },
  server: {
    // Proxy only in development
    proxy: mode === 'development' ? {
      '/api': {
        target: 'https://api.cazza.ai',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      }
    } : undefined
  }
}))
