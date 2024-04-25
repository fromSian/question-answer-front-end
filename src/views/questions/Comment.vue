<template lang="">
  <div class="comments">
    <el-divider><span style="font-size: 20px">评论详情</span></el-divider>
    <div class="sort">
      <el-radio-group v-model="sort">
        <el-radio :label="'-is_great'">优秀度</el-radio>
        <el-radio :label="'created'">发布时间升序</el-radio>
        <el-radio :label="'-created'">发布时间降序</el-radio>
      </el-radio-group>
    </div>
    <el-empty v-if="!comments.length" description="暂无评论"></el-empty>
    <div v-loading="loading">
      <el-card
        v-if="comments.length"
        class="comment"
        v-for="comment in comments"
        size="small"
      >
        <div slot="header" class="comment-header">
          <div>
            <span class="comment-author">{{ comment.author?.username }}</span>
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
    <el-pagination
      style="float: right; margin-bottom: 16px"
      background
      v-if="comments.length"
      layout="sizes, prev, pager, next"
      :total="total"
      :page-sizes="[8, 10, 20, 30, 40]"
      :page-size="size"
      :current-page="page"
      @current-change="
        (page) => {
          this.page = page;
          queryComment();
        }
      "
      @size-change="
        (size) => {
          this.size = size;
          queryComment();
        }
      "
    >
    </el-pagination>
  </div>
</template>
<script>
import request from "@/utils/request";
import { mapGetters } from "vuex";
export default {
  props: {
    questionInfo: {
      type: Object,
      default: () => ({}),
    },
    update: Boolean,
  },
  data() {
    return {
      sort: "-is_great",
      comments: [],
      page: 1,
      size: 8,
      total: 0,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    isQuestioner() {
      return this.user.id === this.questionInfo.author.id;
    },
  },
  watch: {
    update(newV, oldV) {
      if (newV) {
        this.queryComment();
      }
    },
    questionInfo(newV) {
      if (newV.id) {
        this.queryComment();
      }
    },
    sort(newV) {
      this.page = 1;
      this.queryComment();
    },
  },
  methods: {
    queryComment() {
      if (!this.questionInfo.id) {
        return;
      }
      this.loading = true;
      request
        .get(
          `/comment/?article=${this.questionInfo.id}&page=${this.page}&size=${this.size}&sort=${this.sort}`
        )
        .then((result) => {
          this.loading = false;
          this.total = result.data.count;
          this.comments = result?.data?.results || [];
          this.$emit("update", false);
        })
        .catch((err) => {
          this.$message.error("查询评论失败");
          this.loading = false;
        });
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
<style lang="less" scoped>
.sort {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  .el-radio {
    margin-right: 8px;
  }
}
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
