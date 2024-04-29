# question-answer-front-end
 在线问答社区前端

## 启动项目
> 启动前端项目前确保调用的后端服务已经启动, vue.config.js 文件中配置后台地址
1. 安装依赖
`npm install`
2. 启动服务
`npm run serve`

## 打包
`npm run build`

## 文件目录树和功能说明
src
├── components
│   └── Layout
│       └── Header.vue 头部
├── permission.js 路由权限验证
├── router 路由
│   └── index.js
├── store 状态管理
│   ├── getters.js
│   ├── index.js
│   └── modules
│       └── user.js 用户信息和token
├── utils
│   ├── auth.js token相关方法
│   ├── get-page-title.js html标题格式化方法
│   └── request.js axios实例
└── views
    ├── Home.vue 首页入口
    ├── auth
    │   ├── Login.vue 登录组件
    │   └── Register.vue 注册组件
    ├── error
    │   └── 404.vue
    ├── questions 提问
    │   ├── Comment.vue 提问详细-评论
    │   ├── Detail.vue 提问详细
    │   ├── Home.vue 提问首页入口
    │   ├── List.vue 提问列表
    │   ├── Publish.vue 发布提问
    │   └── Tags.vue 首页标签组件
    └── user
        └── UserInfo.vue 我的信息组件