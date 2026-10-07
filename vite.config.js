import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: replace "activity-points-app" with your actual GitHub repo name
// (GitHub Pages project sites are served from https://<user>.github.io/<repo>/)
export default defineConfig({
  plugins: [react()],
  base: '/activity-points-app/',
})
