import { defineConfig, ConfigEnv, UserConfigExport, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import styleImport from "vite-plugin-style-import";
// import { svgBuilder } from "./src/plugins/svgBuilder";
import { configSvgIconsPlugin } from "./src/plugins/configSvgIconsPlugin";
import { configMockPlugin } from "./src/plugins/configMockPlugin";
import { configStyleImportPlugin } from "./src/plugins/configStyleImportPlugin";
import { configHtmlPlugin } from "./src/plugins/configHtmlPlugin";
import { configCompressPlugin } from "./src/plugins/configCompressPlugin";
import { wrapperEnv } from "./src/utils/env";

const resolve = (dir: string) => path.join(__dirname, dir);

// 根据环境变量配置代理 https://blog.csdn.net/chendf__/article/details/115676683
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const isBuild = command === 'build'

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)

  const {
    VITE_PORT,
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv

  return defineConfig({
    base: "./",
    plugins: [
      vue(),
      // [
      //   svgBuilder("./src/assets/icons/svg/"), // 已经将src/icons/svg/下的svg全部导入，无需再单独导入
      // ],
      configSvgIconsPlugin(isBuild), // svg 处理
      configStyleImportPlugin(isBuild), // element-plus 按需引入
      configHtmlPlugin(viteEnv, isBuild), //  EJS 标签处理
      configMockPlugin(VITE_USE_MOCK, isBuild), // mock 模拟请求
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      ), // gzip 或者 brotli 来压缩资源
      // styleImport({
      //   libs: [
      //     {
      //       libraryName: "element-plus",
      //       esModule: true,
      //       ensureStyleFile: true,
      //       resolveStyle: (name) => {
      //         name = name.slice(3);
      //         return `element-plus/packages/theme-chalk/src/${name}.scss`;
      //       },
      //       resolveComponent: (name) => {
      //         return `element-plus/lib/${name}`;
      //       },
      //     },
      //   ],
      // }),
    ],
    // 配置别名
    resolve: {
      alias: {
        "@": resolve("src"),
        // 解决路由组件采用模板语言报错问题，更换别名指向
        // vue: "vue/dist/vue.esm-bundler.js",
        comps: resolve("src/components"),
        apis: resolve("src/apis"),
        views: resolve("src/views"),
        utils: resolve("src/utils"),
        store: resolve("src/store"),
        routes: resolve("src/routes"),
        styles: resolve("src/styles"),
      },
    },
    // 配置服务
    server: {
      //服务器主机名
      host: "",
      //端口号
      port: VITE_PORT,
      //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
      open: false,
      //自定义代理规则
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://localhost:' + VITE_PORT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build:{
      rollupOptions:{
        // input: 'app.js',
        // external: ['elementPlus'],
        // output: {
        //   globals: {
        //     'elementPlus': 'https://unpkg.com/element-plus@1.0.2-beta.44/lib/index.js'
        //   }
        // }
      },
    }
  })
}
