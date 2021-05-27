import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

import { svgBuilder } from './src/plugins/svgBuilder';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
		// 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
		[svgBuilder('./src/assets/icons/svg/')]
	],
  // 配置别名
  resolve: {
		alias: {
			'@': resolve('src'),
			comps: resolve('src/components'),
			apis: resolve('src/apis'),
			views: resolve('src/views'),
			utils: resolve('src/utils'),
			routes: resolve('src/routes'),
			styles: resolve('src/styles')
		}
	},
  // 配置服务
  server: {
		//服务器主机名
		host: '',
		//端口号
		port: 3088,
		//设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
		strictPort: false,
		//服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
		open: false,
		//自定义代理规则
		proxy: {
			'/api': {
				target: 'http://jsonplaceholder.typicode.com',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	}
})
