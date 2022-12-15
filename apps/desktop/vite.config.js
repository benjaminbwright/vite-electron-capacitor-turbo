import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.IS_DEV !== 'true' ? './' : '/',
  build: {
    copyPublicDir: true
  },
  plugins: [react()],
  server: {
    port: 5000
  }
})
