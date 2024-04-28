<!-- 问答系统固定头部区域前端页面 -->
<template>
  <header class="header has-background-white has-text-black">
    <b-navbar class="container is-white" :fixed-top="true">
      <template slot="brand">
        <b-navbar-item
          class="header-title"
          tag="router-link"
          :to="{ path: '/' }"
        >
          在线问答社区
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item v-if="token">
          <b-button type="primary" tag="router-link" :to="{ path: `/publish` }"
            >发布提问</b-button
          >
        </b-navbar-item>

        <b-navbar-item v-if="token == null || token === ''" tag="div">
          <div class="buttons">
            <b-button
              class="is-light"
              tag="router-link"
              :to="{ path: '/register' }"
            >
              注册
            </b-button>
            <b-button
              class="is-light"
              tag="router-link"
              :to="{ path: '/login' }"
            >
              登录
            </b-button>
          </div>
        </b-navbar-item>

        <b-navbar-dropdown v-else :label="user.username">
          <b-navbar-item tag="router-link" :to="{ path: `/userinfo/1231` }">
            我的信息
          </b-navbar-item>
          <hr class="dropdown-divider" />
          <b-navbar-item tag="a" @click="logout"> 退出登录 </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
  </header>
</template>

<script>
import { removeToken } from "@/utils/auth";
import request from "@/utils/request";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      searchKey: "",
    };
  },
  computed: {
    ...mapGetters(["token", "user"]),
  },
  mounted() {
    if (localStorage.getItem("token")) {
      let cVue = this; 
      // 页面初始化的时候调用接口获取用户信息
      request
        .get("/user/info/")
        .then((res) => {
          if (res && res.data && res.data.status) {
            // 接口返回后，将获取的信息修改到存储的用户信息中
            cVue.$store.commit("user/SET_USER_STATE", {
              id: res.data.id,
              username: res.data.username,
              coins: res.data.coins,
            });
          }
        })
        .catch((err) => {
          this.$store.commit("user/SET_TOKEN_STATE", null);
          this.$store.commit("user/SET_USER_STATE", {});
          removeToken();
        });
    }
  },
  methods: {
    // 退出登录
    async logout() {
      // 移除存储的token和用户信息
      removeToken();
      this.$store.commit("user/SET_TOKEN_STATE", null);
      this.$store.commit("user/SET_USER_STATE", {});
      this.$message.success("退出登录成功");
      setTimeout(() => {
        this.$router.push({ path: this.redirect || "/" });
      }, 500);
    },
    search() {
      if (this.searchKey.trim() === null || this.searchKey.trim() === "") {
        this.$message.info({
          showClose: true,
          message: "请输入关键字搜索！",
          type: "warning",
        });
        return false;
      }
      this.$router.push({ path: "/?key=" + this.searchKey });
    },
  },
};
</script>

<style scoped>
input {
  width: 80%;
  height: 86%;
}

.header-title {
  font-size: 28px;
  font-weight: 600;
}
</style>
