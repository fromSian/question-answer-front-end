<template lang="">
  <div class="list">
    <div
      class="list_item"
      v-for="item in items"
      @click="() => handleDetail(item.id)"
    >
      <h2>{{ item.title }}</h2>
      <span
        @click="
          (e) => {
            e.stopPropagation();
            handleUser(123);
          }
        "
        >{{ item.username }}</span
      >
      <span>评论数{{ item.comment }}</span>
      <div class="tags">
        <el-tag v-for="tag in item.tags" size="small">{{ tag }}</el-tag>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      items: [
        {
          id: 123,
          title: "标题",
          username: "发布用户名",
          like: 2,
          comment: 4,
          tags: ["标签1", "标签2"],
        },
        {
          id: 123,
          title: "标题",
          username: "发布用户名",
          like: 2,
          comment: 4,
          tags: ["标签1", "标签2"],
        },
      ],
    };
  },
  methods: {
    handleDetail(id) {
      this.$router.push({ path: `/questions/${id}` });
    },
    handleUser(id) {
      this.$router.push({ path: `/userinfo/${id}` });
    },
  },
};
</script>
<style scoped lang="less">
.list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  .list_item {
    background: rgb(156, 164, 169);
    border-radius: 4px;
    height: 96px;
    width: 100%;
    padding: 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
