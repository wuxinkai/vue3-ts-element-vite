import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  resolve: {
    alias: {
      '@': resolve('./src')  //设置绝对路径
    }
  },
  server: {
    proxy: {
      '/api': {    //只要有api就走这
        target: 'localhost:8080',    //目标地址
        changeOrigin: true,    //是否开启跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // 生产环境打包配置
  //去除 console debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
