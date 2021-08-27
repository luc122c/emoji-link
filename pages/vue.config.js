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
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Emoji Linker";
        return args;
      })
  }
}