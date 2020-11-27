/* eslint-disable */

const appConfig = require("./app");// 本地配置
const { projectName } = appConfig || {};

import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel'; //提供 Babel 能力, 需要安装和配置 Babel 
import resolve from 'rollup-plugin-node-resolve'; //解析 node_modules 中的模块
import commonjs from 'rollup-plugin-commonjs'; //转换 CJS -> ESM, 通常配合上面一个插件使用
import filesize from 'rollup-plugin-filesize'; //显示 bundle 文件大小
import jscc from 'rollup-plugin-jscc';//Rollup的条件编译和编译时变量替换
import livereload from 'rollup-plugin-livereload'; //热更新
import {eslint} from 'rollup-plugin-eslint'; //提供 ESLint 能力, 需要安装和配置 ESLint 
import {string} from 'rollup-plugin-string'; //将html转为js模板
import {uglify} from 'rollup-plugin-uglify'; // 压缩 bundle 文件
import replace from '@rollup/plugin-replace';//类比 Webpack 的 DefinePlugin , 可在源码中通过 process.env.NODE_ENV 用于构建区分Development 与 Production 环境.
import copy from 'rollup-plugin-copy';

const {
  DEV,
  BUILD
} = process.env;

//随机产生区间数字，如 300~500
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//自定义输出css路径
const cssPath = BUILD ? 'build/css/index.css' : '.temp/css/index.css'; 

export default {
  input: 'src/index.js',
  output: {
    projectName,
    file: BUILD ? 'build/js/index.js' : '.temp/js/index.js',
    format: 'iife',
    extend: true,
    minify: true,
    globals: {
      jquery: '$'
    },
    sourcemap: BUILD ? false : 'inline'
  },
  external: ['jquery'],
  plugins: [
    replace({
      "__buildDate__": ()=> JSON.stringify(new Date().toLocaleString()),
      // __buildVersion: 15,
      'process.env.NODE_ENV': JSON.stringify(DEV ? "development" : "production")
    }),
    jscc(),
    postcss({
      extract: cssPath,
      minimize: {
        reduceIdents: false
      },
      sourceMap: BUILD ? false : 'inline'
    }),
    string({
      include: '**/*.html'
    }),
    BUILD || DEV ?
    copy({
      targets: [{
          src: 'src/*.js',
          dest: BUILD ? 'build/js/' : '.temp/js/'
        },
        { // 已不使用本地图片，改为cdn地址
          src: ['!images/*', '!images/sprite'],
          dest: BUILD ? 'build/img/' : '.temp/img/'
        }
      ]
    }) :
    null,
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    resolve(),
    BUILD ?
    eslint({
      exclude: ['src/**'],
      fix: true, // Auto fix source code
      throwOnWarning: true,// Throw an warning if any warnings were found
      throwOnError: true // Throw an error if any errors were found
    }): null,
    BUILD ?
    null :
    livereload({
      port: getRandomArbitrary(3e4, 5e4), //随机占用一个端口
      watch: ['views/', '.temp/'] //监听文件夹;
    }),
    BUILD ?
    uglify({
      ie8: true,
      compress: {
        drop_debugger: true,
        drop_console: false, // 移除console
        // pure_funcs: ['console.log'] // 也可：移除console等
      },
    }) :
    null,
    filesize()
  ],
  watch: {
    exclude: ['node_modules/**']
  }
}