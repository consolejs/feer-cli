module.exports = {
    projectName: 'project-name',
    port: 4000,
    pageName:['index', 'other'], //pageName: HTML template name
    jsFilename:['index', 'other'], // 页面单独打包，配置js文件名
    routerConfig: {
      //
    },
    mockConfig: {
      // the access path as the key
      // '/index': {
      //   api: 'https://postman-echo.com/get?page=index',
      //   format: data => data.args,
      // },
      // '/about': {
      //   api: 'https://postman-echo.com/get?page=about',
      //   format: data => data.args,
      // },
    },
    build: {
      publicPath: '/',
      outputhPath: {
        // isHash: true,
        // css: {
        //   path: 'build/css/',
        // },
        // others: 'build/media/',
        // img: 'build/media/',
        // js: {
        //   path: 'build/js/',
        // },
      },
      htmlMinify: true,
    }
  }