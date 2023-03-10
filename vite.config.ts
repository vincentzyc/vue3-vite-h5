/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 3100,
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue'],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['vant'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
