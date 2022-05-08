const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath :'./ ',
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: { externals: {
    'AMap': 'AMap'
  }, },
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
})
