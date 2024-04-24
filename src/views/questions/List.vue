<template>
  <div>
    <template v-for="item in questions">
      <div
        v-if="
          currentTag === '全部' ||
          (currentTag && item?.tag_list?.includes(currentTag))
        "
        :key="item.id"
        @click="handleDetail(item.id)"
        class="question_item"
      >
        <div class="question_list">
          <span v-if="item.expired" class="question_list_expired">
            {{ item.expired }}前可评论
          </span>
          <div>
            <div style="display: flex; align-items: center; flex-wrap: wrap">
              <el-tooltip :content="item.title">
                <span class="question_list_title">{{ item.title }}</span>
              </el-tooltip>
              <span class="question_list_label">{{
                item.author.username
              }}</span>
            </div>
            <div>
              <span class="question_list_label">已有</span
              ><span class="question_list_value count">{{
                item.comment_counts
              }}</span
              ><span class="question_list_label">条评论</span>
            </div>
          </div>
          <div>
            <div>
              <el-tag
                v-for="(tag, index) in item.tag_list"
                :key="index"
                :style="index ? 'margin-left: 8px' : ''"
                >{{ tag }}
              </el-tag>
            </div>
            <div>
              <span class="question_list_label">发布于</span
              ><span class="question_list_value time">{{ item.created }}</span>
            </div>
          </div>
        </div>
      </div>
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
  margin-bottom: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  height: 124px;
  padding: 24px 16px;

  .question_list {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .question_list_title {
      display: inline-block;
      max-width: 60vw;
      text-overflow: ellipsis;
      overflow: hidden;
      text-wrap: nowrap;
      font-size: 20px;
      font-weight: 500;
      margin-right: 8px;
    }
    .question_list_label {
      color: gray;
      font-size: 12px;
    }

    .question_list_expired {
      position: absolute;
      top: -20px;
      right: 0px;
      display: block;
      color: red;
      font-size: 12px;
    }

    .question_list_value {
      margin: 0 4px;

      &.time {
        color: rgb(22, 94, 153);
      }
    }
  }
}
</style>
