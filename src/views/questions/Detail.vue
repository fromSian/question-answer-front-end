<template lang="">
  <div class="">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <div class="detail">
      <el-card shadow="never">
        <div class="detail_header" slot="header">
          <div>
            <div class="title">{{ info.title }}</div>
            <span class="questioner">{{ info.author.username }}</span>
            <span class="create-time">提问于 {{ info.created }}</span>
          </div>
          <el-button plain size="small">举报</el-button>
        </div>
        <div class="detail_content">{{ info.content }}</div>
      </el-card>
      <div class="operation">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入评论内容"
          v-model="commentToSubmit"
        >
        </el-input>
        <el-button type="primary" @click="submitComment" size="small"
          >评论</el-button
        >
      </div>
      <Comment :questionInfo="info"></Comment>
    </div>
  </div>
</template>
<script>
import Comment from "./Comment.vue";
import request from "@/utils/request";

export default {
  name: "Detail",
  components: { Comment },
  data() {
    return {
      info: {},
      commentToSubmit: "",
    };
  },
  created() {
    this.queryQuestion(this.$route.params.id);
  },
  methods: {
    queryQuestion(id) {
      request
        .get(`/article/${id}/`)
        .then((result) => {
          this.info = result?.data || {};
        })
        .catch();
    },
    submitComment() {
      request
        .post("/comment/", {
          content: this.commentToSubmit,
          article: this.info.id,
        })
        .then((result) => {
          this.info = result?.data || {};
        })
        .catch();
    },
    goBack() {
      this.$router.push({ path: `/` });
    },
  },
};
</script>
<style lang="less">
.detail {
  margin: 20px 0;

  .detail_header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .questioner {
      font-size: 14px;
      margin-right: 8px;
    }
    .create-time {
      font-size: 12px;
      color: #999;
    }

    .detail_content {
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
