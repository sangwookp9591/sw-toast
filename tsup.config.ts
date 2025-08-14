import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildPlugins: [vanillaExtractPlugin()],
  // CSS 파일이 dist 폴더에 생성되도록 보장
  onSuccess: async () => {
    const fs = await import('fs');
    const path = await import('path');

    const files = fs.readdirSync('./');
    files.forEach((file) => {
      if (file.endsWith('.css')) {
        fs.copyFileSync(path.join('./', file), path.join('./dist', file));
      }
    });
  },
});
