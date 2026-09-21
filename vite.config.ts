import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        contact: path.resolve(import.meta.dirname, 'contact.html'),
        privacy: path.resolve(import.meta.dirname, 'privacy.html'),
        terms: path.resolve(import.meta.dirname, 'terms.html'),
      },
    },
  },
});
