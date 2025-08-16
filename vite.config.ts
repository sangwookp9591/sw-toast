import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      // Emotion CSS-in-JS 지원을 위한 설정
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SwToast',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return 'index.mjs';
        if (format === 'cjs') return 'index.js';
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
