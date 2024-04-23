<template lang="">
  <div class="comments">
    <el-divider>评论详情</el-divider>
    <el-card class="comment" v-for="comment in comments">
      <div slot="header" class="comment-header">
        <div>
          <span class="comment-author">{{ comment.author.username }}</span>
          <span class="create-time">发表于{{ comment.created }}</span>
        </div>
        <div style="display: flex; align-items: center">
          <el-button
            v-if="isQuestioner && !comment.is_great"
            type="text"
            @click="setGreat(comment.id)"
            >设置为优秀作答</el-button
          >
          <el-button
            v-else-if="isQuestioner && comment.is_great"
            type="text"
            @click="setGreat(comment.id)"
            >取消优秀作答</el-button
          >

          <i class="el-icon-s-flag" v-if="comment.is_great"></i>
        </div>
      </div>
      <div>{{ comment.content }}</div>
    </el-card>
  </div>
</template>
<script>
import request from "@/utils/request";
import { mapState } from "vuex";
export default {
  props: {
    questionInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  computed: {
    ...mapState(["user"]),
    isQuestioner() {
      return this.user.id === this.questionInfo.author.id;
    },
  },
  mounted() {
    this.queryComment();
  },
  methods: {
    queryComment() {
      request
        .get(`/comment/?article=${this.questionInfo.id}`)
        .then((result) => {
          this.comments = result?.data?.results || [];
        })
        .catch();
    },
    setGreat(id) {
      request
        .post(`/comment/great/`, { comment: id })
        .then((result) => {
          this.queryComment();
        })
        .catch();
    },
  },
};
</script>
<style lang="less">
.comment {
  margin: 8px 0;
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .comment-author {
    font-size: 18px;
    font-weight: 700;
    margin-right: 8px;
  }
  .create-time {
    font-size: 12px;
    color: #999;
  }
  .el-icon-s-flag {
    font-size: 28px;
    color: #f56c6c;
    margin-left: 18px;
  }
}
</style>
