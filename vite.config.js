import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Surface heavy chunks early so we keep the bundle lean (perf budget).
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split big animation/3D libs into their own cacheable chunks so the
        // initial route paint isn't blocked by them.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap', '@gsap/react'],
          lenis: ['lenis'],
        },
      },
    },
  },
})
