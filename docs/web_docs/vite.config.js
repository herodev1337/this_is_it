import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/this_is_it/",
  build: {
    outDir: "../../docs",
  },
  resolve: {
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, './src'),
    },
  },
});
