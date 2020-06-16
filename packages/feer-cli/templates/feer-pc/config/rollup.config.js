/* eslint-disable */

import {
  name
} from '../package.json';
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

const {
  DEV,
  BUILD
} = process.env;

export default {
  input: 'src/index.js',
  output: {
    name,
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
    jscc(),
    postcss({
      // extract: true, //此时跟js同级目录
      extract: BUILD ? 'build/css/index.css' : '.temp/css/index.css', // 自定义输出路径
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
      exclude: ['src/styles/*'],
      fix: true, // Auto fix source code
      throwOnError: true // Throw an error if any errors were found
    }),
    BUILD ?
    null :
    livereload({
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