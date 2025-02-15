import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // Exactly matching your repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
})