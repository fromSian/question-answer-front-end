// 存储登录的token和用户信息的状态容器
import { getToken } from "@/utils/auth";

const state = {
  token: getToken(), // token
  user: {}, // 用户对象
};

const mutations = {
  SET_TOKEN_STATE: (state, token) => {
    state.token = token;
  },
  SET_USER_STATE: (state, user) => {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
