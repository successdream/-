module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/public/'
  //   : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        // target: 'http://192.168.3.109:7001',
        // target: 'http://192.168.3.115:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
