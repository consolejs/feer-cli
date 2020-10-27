/* eslint-disable */

const appConfig = require("./app");// 本地配置
const {projectName, jsFilename} = appConfig || {};

import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import jscc from 'rollup-plugin-jscc';
import livereload from 'rollup-plugin-livereload'; //热更新
import { eslint } from 'rollup-plugin-eslint';
import { string } from 'rollup-plugin-string'; //将html转为js模板
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';
import multiInput from 'rollup-plugin-multi-input'; //多入口汇总输出插件

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

const sharedObj = {
  input: 'src/*.js',
  output: {
    projectName,
    dir: BUILD ? 'build/js/' : '.temp/js/',
    format: 'cjs',
    extend: true,
    minify: true,
    globals: {
      jquery: '$'
    },
    sourcemap: BUILD ? false : 'inline'
  },
  external: ['jquery'],
  plugins: [
    multiInput({ relative: 'src/' }),
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
      targets: [
        { // 若不使用本地图片,可改为cdn地址
          src: ['images/*', '!images/sprite'],
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
    eslint({
      exclude: ['src/sass/*'],
      fix: true, // Auto fix source code
      throwOnError: true // Throw an error if any errors were found
    }),
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


// 通过配置中心的js文件名称，处理为任务数组，作分别打包使用
const getTargetTask = (jsFiles) => {
  const tasks = [];
  jsFiles.map((file) => {
    tasks.push(Object.assign({}, sharedObj, {input: `src/${file}.js`}))
  })
  return tasks
}

// 获取任务列表
const taskArray = getTargetTask(jsFilename);

console.log('111',jsFilename)

export default taskArray
