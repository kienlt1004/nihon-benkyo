import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) {
                return 'vendor-firebase';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              return 'vendor-core';
            }
            if (
              id.includes('src/data/hanTu1200') ||
              id.includes('src/data/kanjiSoTrungCap') ||
              id.includes('src/data/dongDuKanji') ||
              id.includes('src/data/tuVungN3.')
            ) {
              return 'data-kanji';
            }
            if (id.includes('src/data/tuVungN3SouMatome')) {
              return 'data-n3soumatome';
            }
            if (id.includes('src/data/listening')) {
              return 'data-listening';
            }
            if (id.includes('src/data/personalReviewNotes')) {
              return 'data-review';
            }
          },
        },
      },
    },
  };
});
