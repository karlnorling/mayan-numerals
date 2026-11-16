import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const source = (pkg: string) =>
  fileURLToPath(new URL(`./packages/@mayan-numerals/${pkg}/src/index.ts`, import.meta.url));

export default defineConfig({
  resolve: {
    // Test against source, matching the paths in tsconfig.json.
    alias: {
      '@mayan-numerals/core': source('core'),
      '@mayan-numerals/raster': source('raster'),
    },
  },
  test: {
    include: ['packages/*/*/test/**/*.test.ts'],
  },
});
