import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build can be hosted at the domain root or in a subfolder.
export default defineConfig({
  base: './',
  plugins: [react()],
})
