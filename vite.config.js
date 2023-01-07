import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        open: 'src/pages/index.html'
    },
    build: {
      target: 'src/js/main.js'
    }
})
