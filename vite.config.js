import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            // 配置别名
            '@': resolve('src')
        },
        extensions: ['.js', '.vue', '.json']
    },
    envDir: './env' // 用于加载 .env 文件的目录
})
