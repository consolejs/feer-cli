# Feer

`Feer`, 基于[RollupJS](https://www.rollupjs.com/) 打造的前端工具集成环境. &ensp;🚀 

> 命名灵感来自 **`F`** ront- **`E`** nd&ensp; Engine **`er`**, 即前端工程构建师 `FEer`, 类似`PHPer`、`JAVAer` 

[**English**](./README_EN.md)

<p align='center'>
  <img src='./screenshot.svg' width='640' alt='yarn start'>
</p>

### 使用

- 全局安装
```bash
npm i feer-cli -g
```
- 默认使用
```
feer <project-name>
```
- 或者
```bash
npx feer-cli <project-name>
```

### 支持pc和h5场景选择

在使用 `feer` 命令创建过程中，会提供模板选择功能:

```bash
? Which type do you want to create? (Use arrow keys)
❯ PC - (build the pc page)
  H5 - (build the h5 page)
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

<!-- ### 特性

* 

## License

[MIT](./LICENSE)
 -->
