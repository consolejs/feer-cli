import './sass/index.scss';
import Foo from './mods/foo';

console.log("Home! PC-Multipage.", Foo()); 

/**
 * 可在代码内使用，见 config/rollup.config.js
 * plugins: replace{}
 * 环境变量：process.env.NODE_ENV
 * 发布日期： __buildDate__
 */
console.log(process.env.NODE_ENV);
console.log(`\uD83D\uDC2C %cBasis! --> \uD83D\uDC95 %c${__buildDate__}`, 'color: #f93ef1;', 'color: #14f571;');
