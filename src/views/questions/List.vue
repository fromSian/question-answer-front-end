<template>
  <div>
    <div class="sort">
      <el-radio-group v-model="sort">
        <el-radio :label="'-views'">浏览量降序</el-radio>
        <el-radio :label="'views'">浏览量升序</el-radio>
        <el-radio :label="'created'">发布时间升序</el-radio>
        <el-radio :label="'-created'">发布时间降序</el-radio>
        <el-radio :label="'comment'">评论数升序</el-radio>
        <el-radio :label="'-comment'">评论数降序</el-radio>
      </el-radio-group>
    </div>
    <el-empty v-if="!questions.length" description="暂无数据"></el-empty>
    <template v-else>
      <div
        v-for="item in questions"
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
    <el-pagination
      v-if="questions.length"
      style="float: right; margin-bottom: 16px"
      background
      layout="sizes, prev, pager, next"
      :total="total"
      :page-sizes="[8, 10, 20, 30, 40]"
      :page-size="size"
      :current-page="page"
      @current-change="
        (page) => {
          this.page = page;
          getList(currentTag, page);
        }
      "
      @size-change="
        (size) => {
          this.size = size;
          getList(currentTag, cur1);
        }
      "
    >
    </el-pagination>
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
      sort: "-views",
      questions: [],
      size: 8,
      page: 1,
      total: 0,
    };
  },
  watch: {
    currentTag(newV, oldV) {
      this.getList(newV, 1);
    },
    sort() {
      this.getList(this.currentTag, 1);
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(tags = "ALL", page = 1) {
      if (tags == "全部") {
        tags = "ALL";
      }
      request
        .get(
          `/article/?page=${page}&size=${this.size}&tags=${tags}&sort=${this.sort}`
        )
        .then((result) => {
          this.total = result.data.count;
          this.questions = result?.data?.results || [];
        })
        .catch((err) => {});
    },
    handleDetail(id) {
      this.$router.push({ path: `/questions/${id}` });
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
.sort {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  .el-radio {
    margin-right: 8px;
  }
}
</style>
