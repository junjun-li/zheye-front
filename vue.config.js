module.exports = {
  devServer: {
    port: 19265,
    // 自动开启浏览器
    open: true,
    progress: true
    // proxy: {
    //   '/sns': {
    //     target: `https://api.weixin.qq.com`,
    //     changeOrigin: true,
    //     // pathRewrite: {
    //     //   '^/sns': '',
    //     // },
    //   },
    // },
    // proxy: 'http://localhost:3000'
  }
}
