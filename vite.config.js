import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { dependencies } from './package.json';

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['preact'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['preact'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
})
