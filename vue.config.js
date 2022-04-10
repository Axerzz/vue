const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: { externals: {
    'AMap': 'AMap'
  }, },
  devServer: {
    port: 9876,
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
})