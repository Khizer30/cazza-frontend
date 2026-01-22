import path from "path";

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(() => ({
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
    proxy: {
      '/api': {
        target: 'https://api.cazza.ai',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      }
    }
  },
  preview: {
    proxy: {
      '/api': {
        target: 'https://api.cazza.ai',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: {
          'api.cazza.ai': 'www.cazza.ai',
          '.api.cazza.ai': '.cazza.ai'
        },
      }
    }
  }
}));
