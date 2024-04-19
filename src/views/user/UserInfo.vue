<template lang="">
  <div>
    <div class='user_header'>
    <span>{{ username }}</span>
    <span>金币数{{ 123 }}</span>
    </div>

    <div class="user_detail">
      <el-menu :default-active="current" class="catalog" @select="handleSelect">
        <el-menu-item v-for="catalog in catalogs" :index="catalog.key">
          <span slot="title">{{ catalog.name }}</span>
        </el-menu-item></el-menu
      >
      <div class="detail_content">
        <div class="detail_content_item" v-for="data in datas">
          <el-tooltip content="所有内容" placement="top">
            <p v-if="current == '0'">标题</p>
            <p v-if="current == '1'">回答内容</p>
          </el-tooltip>

          <el-button>删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "用户名",
      current: "0",
      catalogs: [
        {
          key: "0",
          name: "我的提问",
        },
        {
          key: "1",
          name: "我的回答",
        },
      ],
      datas: [
        {
          id: "id",
          name: "名称",
        },
        {
          id: "id",
          name: "名称",
        },
        {
          id: "id",
          name: "名称",
        },
      ],
    };
  },
  methods: {
    handleSelect(index) {
      this.current = index;
    },
  },
};
</script>
<style lang="less" scoped>

.user_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background: whitesmoke;
}
.user_detail {
  margin-top: 20px;
  display: flex;
  gap: 16px;

  .catalog {
    width: 20%;
  }

  .detail_content {
    width: 80%;

    .detail_content_item {
      display: flex;
      justify-content: space-between;
      width: 100%;

      &:not(:first-child) {
        margin-top: 16px;
      }
    }
  }
}
</style>
