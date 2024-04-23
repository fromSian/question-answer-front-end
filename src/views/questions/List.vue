<template>
  <div>
    <template v-for="item in questions">
      <el-card
        v-if="
          currentTag === '全部' ||
          (currentTag && item?.tag_list?.includes(currentTag))
        "
        :key="item.id"
        @click.native="handleDetail(item.id)"
        class="question_item"
      >
        <el-row>
          <el-col :span="6">
            <div class="question-title">{{ item.title }}</div>
          </el-col>
          <el-col :span="6">
            <span :title="item.author.username">
              {{ item.author.username }}
            </span>
          </el-col>
          <el-col :span="6">
            <span>评论数：{{ item.comment_counts }}</span>
          </el-col>
          <el-col :span="6">
            <el-tag
              v-for="(tag, index) in item.tag_list"
              :key="index"
              style="margin-left: 8px"
              >{{ tag }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>发布于{{ item.created }}</div>
          </el-col>
          <el-col :span="12">
            <div>过期时间{{ item.expired }}</div>
          </el-col>
        </el-row>
      </el-card>
    </template>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  name: "List",
  props: {
    currentTag: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      questions: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      request
        .get("/article/")
        .then((result) => {
          this.questions = result?.data?.results || [];
        })
        .catch((err) => {});
    },
    handleDetail(id) {
      this.$router.push({ path: `/questions/${id}` });
    },
    showUserDetail(ev, id) {
      ev.stopPropagation();
      this.$router.push({ path: `/userinfo/${id}` });
    },
  },
};
</script>
<style scoped lang="less">
.question_item {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  .el-row {
    width: 100%;
  }
  :deep(.el-card__body) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
