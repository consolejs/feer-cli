/* eslint-disable */

const path = require("path");
const nunjucks = require("nunjucks");
const fs = require("fs");
const minify = require('html-minifier').minify; //压缩html

/**
 * __dirname: 当前模块的目录名，xx/xx/config
 * 需借助 path返回到上一级，找到views
*/
const directory = path.join(__dirname, "../views/");

nunjucks.configure(path);

// 渲染方法
function toRender(name) {
  const res = nunjucks.render(directory + name + ".html", {
    version: Date.now()
  });
  fs.writeFileSync("./build/" + name + ".html", minify(res, {
    removeComments: true,//默认值false；是否去掉注释
    collapseWhitespace: true,//默认值false；是否去掉空格
    minifyJS: true,//是否压缩html里的js（使用uglify-js进行的压缩）
    minifyCSS: true//是否压缩html里的css（使用clean-css进行的压缩
  }));
}

// 待渲染文件名
const filesNames = ['index'];

// 执行渲染
for (let i in filesNames) {
  toRender(filesNames[i])
}