import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register"),
    meta: { title: "注册" },
  },
  // 登录
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/auth/Login"),
    meta: { title: "登录" },
  },
  // 发布
  {
    name: "publish",
    path: "/publish",
    component: () => import("@/views/questions/Publish"),
    meta: { title: "发布提问", requireAuth: true },
  },
  {
    name: "question",
    path: "/questions/:id",
    component: () => import("@/views/questions/Detail"),
    meta: { title: "问题详情" },
  },
  {
    name: "userinfo",
    path: "/userinfo/:id",
    component: () => import("@/views/user/UserInfo"),
    meta: { title: "用户信息", requireAuth: true },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: { title: "404-NotFound" },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

export default router;
