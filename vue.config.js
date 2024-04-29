/**
 * 开发环境后台地址代理
 */
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
