
## 什么是 Feer?

`Feer`, 基于[RollupJS](https://www.rollupjs.com/) 打造的前端工具集成环境.

### 使用

- install
```bash
yarn 或 npm install
```
- start
```
yarn start 或 npm run start
```
- build
```bash
yarn build 或 npm run build
```

## 项目目录结构

```c
├── .babelrc ---> babel配置文件
├── .gitignore ---> git过滤规则
├── .eslintrc ---> ESLint配置
├── .eslintignore ---> ESLint过滤规则
├── README.MD
├── package.json
├── build ---> 打包文件夹
├── config ---> 配置文件夹(`*`)
├── views ---> Nunjucks 模板引擎
├── imgs ---> 图片资源文件 (使用cdn时，可删除该文件夹)
└── src ---> 源代码文件夹
```

### config 配置文件夹

```c
├── build.js ----> nunjucks模板处理
├── server.js ----> fastify静态服务器、路由处理
└── rollup.config.js ---> RollupJS配置文件, 内可配置环境变量
```

### src 文件夹

```c
├── libs ---> 可存放引入的第三方库文件
├── mods ---> 各模块业务逻辑
├── index.js ---> 入口文件index.js
└── styles ---> scss 源代码文件夹, 可自定义
```

### build 文件夹

```c
├── index.html ---> html模板文件
├── js ---> js源代码文件夹
├── css ---> css资源文件
└── img ---> 图片资源文件 (使用cdn时，可删除该文件夹)
```

### 特性

* 基于`RollupJS`快速打包，让bundle最小化
* Tree-shaking帮助你移除无用代码
* 支持单/多页面开发
* 支持Proxy代理访问接口
* 基于MockJS 模拟 api
* 配置简单便捷、打包迅速
* Nunjucks, 功能丰富、强大的模板引擎
* 支持Sass、Less强大的CSS扩展语言
* 可灵活配置路由
* ES6书写优雅的JS代码
* 支持自动打开浏览器(自动获取本地的ip地址)
* 历经多个项目考验、不断改进升级
* 可兼容支持ie6、7+
