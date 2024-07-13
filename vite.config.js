import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "src/scss/app.scss";` }
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
		proxy: {
			'/registration': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				ws: true,
			},
		},
	} 
})