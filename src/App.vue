<template>
  <div>
    <div class="mb-5">
      <Header></Header>
    </div>

    <div class="container">
      <router-view :key="this.$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Layout/Header";

export default {
  name: "App",
  components: { Header },
};
</script>

<style lang="less">
.container {
  min-height: calc(100vh - 100px);
}

.el-popconfirm__main {
  margin-bottom: 8px;
}
.el-date-table td span {
  text-align: center;
}
</style>
