<template lang="">
  <div class="">
    <el-page-header @back="goBack" content="详情页面"> </el-page-header>
    <div class="detail">
      <div class="info">
        <div class="detail_header">
          <h1>{{ info.title }}</h1>
          <p>{{ info.username }}</p>
          <p>发布时间</p>
          <el-button>举报</el-button>
        </div>
        <div class="detail_content">{{ info.content }}</div>
      </div>
      <div class="operation">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入评论内容"
          v-model="textarea"
        >
        </el-input>
        <el-button type="primary">评论</el-button>
      </div>
      <Comment :id="info.id"></Comment>
    </div>
  </div>
</template>
<script>
import Comment from "./Comment.vue";

export default {
  name: "Tags",
  components: { Comment },
  data() {
    return {
      info: {},
    };
  },
  methods: {
    query(id) {
      this.info = {
        title: "标题",
        content: "内容",
        username: "发布用户名",
      };
    },
    goBack() {
      this.$router.push({ path: `/` });
    },
  },
  mounted() {
    this.query(this.$route.params.id);
  },
};
</script>
<style lang="less">
.detail {
  margin-top: 20px;

  .info {
    .detail_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .detail_content {
      margin-top: 16px;
      min-height: 300px;
      background: rgb(198, 216, 198);
    }
  }
  .operation {
    display: flex;
    margin-top: 16px;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
}
</style>
