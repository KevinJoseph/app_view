import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist'
  },
  base: process.env.VITE_BASE_PATH || "app_view"
})