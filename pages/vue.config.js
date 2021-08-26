// vue.config.js
module.exports = {
    configureWebpack: {
      devServer: {
        proxy: {
          '/api': {
            target: 'http://127.0.0.1:8787',
            pathRewrite: { '^/api': '' },
          },
        },
      },
    }
  }