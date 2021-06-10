# 从零搭建后台管理系统

> 主要技术：Vite2，vue3，vuex4.x，Vue Router 4.x，TypeScript；预处理语言：sass；前端UI框架：ElementPlus

- 跟着大佬做的项目，步骤很详细，原文链接为https://juejin.cn/post/6960971380435189773

## 项目问题解决

### 1. npm init @vitejs/app 命令报错

![报错截图](https://github.com/zptime/resources/blob/master/images/shanglv-cms-vite/error_1.png)

问题原因：node_cache的路径中存在空格

解决办法：重设nodejs路径

```bash
npm config set prefix “D:\Program\nodejs\node_global”
npm config set cache “D:\Program\nodejs\node_cache”
```

### 2. [vue/no-multiple-template-root] The template root requires exactly one element

问题原因：vue模板下不能有多个根元素。但是vue3 template下可以有多个根元素

解决办法：安装vetur，vscode配置：文件->首选项->设置->eslint（vetur配置去除，取消勾选）

![解决截图](https://github.com/zptime/resources/blob/master/images/shanglv-cms-vite/error_2.png)


### 3. 找不到模块“path”或其相应的类型声明

解决办法：

```bash
npm install @types/node --save-dev
```

### 4. icon组件看不到小爬虫图标

问题原因：没有添加代码

解决办法：
```html
<svg-icon iconClass="bug"></svg-icon>
```

### 5. sass编译报错

sass安装：

```bash
npm install -D sass sass-loader
```

报错信息：Sass currently treats / as a division operation in some contexts and a separator in others. This makes it difficult for Sass users to tell what any given / will mean, and makes it hard to work with new CSS features that use / as a separator.（Sass当前/在某些情况下被视为除法运算，而在另一些情况下则被视为分隔符。这使Sass用户很难说出任何给定的/含义，并使使用/用作分隔符的新CSS功能变得困难。）

解决办法：将sass手动降级到1.32（"sass": "~1.32.12"）

#### 6. vue router 4.x报错

报错信息：Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".（组件提供了模板选项，但此 Vue 版本不支持运行时编译。配置你的 bundler 将“vue”别名为“vue/dist/vue.esm-bundler.js”。）

解决办法：在vite.config.ts文件中配置别名

![配置截图](https://github.com/zptime/resources/blob/master/images/shanglv-cms-vite/error_3.png)





