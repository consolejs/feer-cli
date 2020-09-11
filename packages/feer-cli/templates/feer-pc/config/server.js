/* eslint-disable */

const appConfig = require("./app");// 本地配置
const { port, pageName } = appConfig || {}; 

const path = require("path");
const fetch = require("node-fetch");
const fastify = require("fastify")({
  logger: false
});

let addr;
addr = require('address'); //可以获取，并使用 本机IP地址
const ip4 =  addr ? addr.ip() : "127.0.0.1";

//A better opn. Reuse the same tab on Chrome for 👨‍💻.
const opn = require('better-opn'); 

// 本地接口.配置
const dataInfo_Opts = require("./mock/data_info");

fastify.register(require("point-of-view"), {
  engine: {
    nunjucks: require("nunjucks")
  },
  templates: "views",
  options: {
    filename: path.resolve("views")
  }
});


fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "../.temp"),
  prefix: "/"
});

// 配置router方法
function configRouter(name) {
  // 若默认为空 ''，指向 index文件
  fastify.get("/" + name, (req, reply) => {
    reply.view((name == "" ? "index" : name) + ".html", {});
  });
}

// 路由名字,首页一般为空 '/'
const routerNames = [''].concat(pageName);

// 执行配置
for (let i in routerNames) {
  configRouter(routerNames[i]);
}

//本地接口.调用
fastify.get('/api/local', dataInfo_Opts);


// proxy
const pathname = "/api/proxy";
fastify.get(pathname, async (request, reply) => {
  reply.type("application/json").code(200);
  const url = new URL("https://jsonplaceholder.typicode.com/todos/1");
  const query = request.query;
  Object.keys(request.query).forEach(key =>
    url.searchParams.append(key, query[key])
  );
  const body = await fetch(url).then(res => res.json());
  return body;
});

// 启用静态服务，4000端口
fastify.listen(port, ip4, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
  opn(address);//同一chrome tab内打开
});
