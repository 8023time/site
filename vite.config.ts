import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/common/utils', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/common/styles', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/common/assets', import.meta.url)),
      '@layout': fileURLToPath(new URL('./src/layout', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@generated': fileURLToPath(new URL('./src/generated', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/common/data', import.meta.url)),
    },
  },
});
