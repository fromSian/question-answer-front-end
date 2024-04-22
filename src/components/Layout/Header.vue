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
        <!-- <b-navbar-item tag="div">
          <b-field position="is-centered">
            <b-input
              v-model="searchKey"
              class="s_input"
              width="80%"
              placeholder="请输入关键字"
              rounded
              clearable
              @keyup.enter.native="search()"
            />

            <p class="control">
              <b-button class="is-info" @click="search()">检索 </b-button>
            </p>
          </b-field>
        </b-navbar-item> -->
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
  watch: {},
  created() {},
  methods: {
    async logout() {
      removeToken()
      this.$store.commit("user/SET_TOKEN_STATE", null);
      this.$store.commit("user/SET_USER_STATE", {});
      this.$message.success('退出登录成功')
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
  mounted() {
    if (localStorage.getItem('token')) {
      let cVue = this
      request.get("/user/info/").then((res) => {
        if (res && res.data && res.data.status) {
          cVue.$store.commit("user/SET_USER_STATE", {
            id: res.data.id,
            username: res.data.username,
            coins: res.data.coins,
          });
        }
      });
    }
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
