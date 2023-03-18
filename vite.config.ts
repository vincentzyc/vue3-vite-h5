/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 3100,
  },
  build: {
    minify: 'terser',
    // 清除console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
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
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    createHtmlPlugin({
      minify: true, // 压缩html
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

// const fs = require('fs');

// // 读取package.json文件
// const packageJson = JSON.parse(fs.readFileSync('./package.json'));

// // 修改配置
// packageJson.version = '1.0.1';
// packageJson.author = 'John Doe';
// packageJson.description = 'A sample project';

// // 将修改后的配置写入package.json文件
// fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
