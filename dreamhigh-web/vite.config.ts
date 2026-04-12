import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all interfaces (IPv4 + IPv6) to avoid localhost -> ::1 connection refused on some setups
    host: true,
    // Dev URL: http://localhost:5175/ or http://127.0.0.1:5175/
    port: 5175,
    strictPort: true,
    open: true,
    // Proxy /api to NestJS :3000 in dev
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
})
