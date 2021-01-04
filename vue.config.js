module.exports = {
  devServer: {
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
  }
}
