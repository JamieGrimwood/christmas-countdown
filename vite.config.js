import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { dependencies } from './package.json';

const { readdir: asyncReaddir, stat: asyncStat } = fsPromises;

const getFilesInDir = async (directoryPath) => {
  try {
    const files = await asyncReaddir(directoryPath);
    const filePaths = [];

    for (const file of files) {
      const filePath = join(directoryPath, file);
      const stats = await asyncStat(filePath);
      if (stats.isFile()) {
        filePaths.push(file);
      }
    }

    return filePaths;
  } catch (error) {
    throw error;
  }
};

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests: await getFilesInDir('public'),
  manifest: {
    name: "Jamie's Christmas Countdown",
    short_name: "Jamie's Christmas Countdown",
    description: "A christmas countdown created by Jamie!",
    icons: [
      {
        "src": "/favicon-16x16.png",
        "sizes": "16x16",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/favicon-32x32.png",
        "sizes": "32x32",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/favicon-180x180.png",
        "sizes": "180x180",
        "type": "image/png",
        "purpose": "any"
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/maskable_icon.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'maskable any',
      }
    ],
    theme_color: '#1d232b',
    background_color: '#1d232b',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  }
}

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
  plugins: [preact(), VitePWA(manifestForPlugIn)],
  /*
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
  */
})
