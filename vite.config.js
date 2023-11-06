import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "tsx",
    include: [
      "src/**/*.jsx",
      "src/**/*.tsx",
      "db/**/*.jsx",
      "db/**/*.tsx",
      "node_modules/**/*.jsx",
      "node_modules/**/*.tsx",
    ]
  },
  define: {
    CODE_OK: 0,
    CODE_PREP : 1,
    CODE_FATAL: 2,
  }
})
