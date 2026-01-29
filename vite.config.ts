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
        rewrite: (path) => path,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
            proxyReq.setHeader('Connection', 'keep-alive');
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            const cookies = proxyRes.headers['set-cookie'];
            if (cookies) {
              proxyRes.headers['set-cookie'] = cookies.map((cookie: string) =>
                cookie
                  .replace(/;\s*Secure/gi, '')
                  .replace(/;\s*SameSite=\w+/gi, '')
                  .replace(/domain=[^;]+/gi, 'domain=localhost')
              );
            }
          });
        },
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
