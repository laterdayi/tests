import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { createVitePlugins } from './src/plugins/vite/plugins';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: '0.0.0.0'
  },
  plugins: createVitePlugins(),
  build: {
    // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用此功能可能会提高大型项目的构建性能。
    reportCompressedSize: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@c': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@v': fileURLToPath(new URL('./src/views', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: { additionalData: `@import "src/style/index.less";`, javascriptEnabled: true }
    }
  }
});
