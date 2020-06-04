/* eslint-disable */

const chalk = require('chalk');
const loc =  "127.0.0.1";
const address = require('address'); //获取IP地址
const ip4 = address.ip() || loc;

module.exports = projectName => {
  console.log(
    `${chalk.cyan(`${projectName} installed success!`)}\r\n\r\n`,
    `${chalk.cyan('快速开始: 🚀 \r\n\r\n')}`,
    `${chalk.cyan(`  cd ${chalk.green(projectName)}\n`)}`,
    `${chalk.green('  npm start')} 访问: \`http://${ip4}:4000\`\n`
  );
};
