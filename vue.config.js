module.exports = {
    devServer: {
      proxy: {
        '/api': {
        /** baseUrl说明
        * 每一个完整的请求地址 = baseUrl + 请求地址
        * eg: 
        *    http://192.168.2.127:80/admin/carManage/add
        *    http://192.168.2.127:80/admin/carManage/edit
        *    http://192.168.2.127:80/admin/carManage/delete
        *    ...
        *    这里 baseUrl = /admin
        *    而 请求地址 = /carManage/add 或 /carManage/edit ...
        */
          target: 'http://127.0.0.1:8000',//代理的接口地址
          changeOrigin: true,//允许跨域
          secure: false,
          pathRewrite: {
            '^/api': '/'   //本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
          }
          /** secure说明
          * 若接口地址为http协议，配置secure: false,
          * 若接口地址为https协议，配置secure: true,
          *   一般情况下，配置secure: false,
          *   eg:
          *        上面 target: '【http】://192.168.2.127:80'就是http协议
          */
       }
     }
  }
}