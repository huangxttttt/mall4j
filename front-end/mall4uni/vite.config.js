import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import h5ProdEffectPlugin from 'uni-vite-plugin-h5-prod-effect'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mall/',
  plugins: [
    uni(),
    AutoImport({
      imports: [
        'vue',
        'uni-app'
      ],
      dirs: [
        'src/utils',
        'src/wxs/**'
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true
      }
    }),
    // 对h5 production环境打包时的特殊处理，否则uni-crazy-router在这个环境会异常
    h5ProdEffectPlugin()
  ],
  server: {
    host: true,
    port: 80,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8086',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
