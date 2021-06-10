import { defineConfig, ConfigEnv, UserConfigExport, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import styleImport from "vite-plugin-style-import";
import { svgBuilder } from "./src/plugins/svgBuilder";
import { configMockPlugin } from "./src/plugins/configMockPlugin";
import { configSvgIconsPlugin } from './src/plugins/configSvgIconsPlugin'
import { configStyleImportPlugin } from './src/plugins/configStyleImportPlugin'
import { wrapperEnv } from './src/utils/env';

const resolve = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isBuild = command === "build";
	const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const {
    VITE_PORT,
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv

  return defineConfig({
    // base: './',
    plugins: [
      vue(),
      [
        svgBuilder("./src/assets/icons/svg/"), // 已经将src/icons/svg/下的svg全部导入，无需再单独导入
        configMockPlugin(isBuild), // mock 模拟请求
        configSvgIconsPlugin(isBuild),
        configStyleImportPlugin(isBuild),
      ],
      styleImport({
        libs: [
          {
            libraryName: "element-plus",
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              name = name.slice(3);
              return `element-plus/packages/theme-chalk/src/${name}.scss`;
            },
            resolveComponent: (name) => {
              return `element-plus/lib/${name}`;
            },
          },
        ],
      }),
    ],
    // 配置别名
    resolve: {
      alias: {
        "@": resolve("src"),
        // 解决路由组件采用模板语言报错问题，更换别名指向
        vue: "vue/dist/vue.esm-bundler.js",
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
      port: 3088,
      //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
      open: false,
      //自定义代理规则
      proxy: {
        "/api": {
          target: "http://localhost:3088",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
