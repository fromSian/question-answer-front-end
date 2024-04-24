<template lang="">
  <div class="user_wrap">
    <div class="user_header">
      <span>{{ user.username }}</span>
      <span>
        <span class="user_header_count">{{ user.coins }}</span
        ><span class="user_header_icon">💰</span>
      </span>
    </div>

    <div class="user_detail">
      <el-menu :default-active="current" class="catalog" @select="handleSelect">
        <el-menu-item v-for="catalog in catalogs" :index="catalog.key">
          <span slot="title">{{ catalog.name }}</span>
        </el-menu-item></el-menu
      >
      <div class="detail_content">
        <div class="detail_content_wrap">
          <div class="detail_content_item" v-for="data in datas">
            <div class="detail_content_left">
              <el-tooltip v-if="current == '1'" :content="data.content">
                <p class="detail_content_item_comment">{{ data.content }}</p>
              </el-tooltip>
              <p
                v-if="current == '1'"
                class="detail_content_item_article"
                @click="handleArticleGo(data.article.id)"
              >
                {{ data.article.title }}
              </p>

              <el-tooltip
                v-if="current == '0'"
                :content="data.title"
                placement="top"
              >
                <p @click="handleArticleGo(data.id)" style="cursor: pointer">
                  {{ data.title }}
                </p>
              </el-tooltip>

              <el-tooltip v-else :content="data.article.title" placement="top">
                <p
                  @click="handleArticleGo(data.article.id)"
                  style="cursor: pointer"
                >
                  {{ data.article.title }}
                </p>
              </el-tooltip>
            </div>

            <div class="detail_content_item_status" v-if="current == '2'">
              <i
                :class="
                  data.denounce_status == 0
                    ? 'el-icon-question'
                    : data.denounce_status == 1
                    ? 'el-icon-success'
                    : 'el-icon-error'
                "
              ></i>
              <p>
                {{
                  data.denounce_status == 0
                    ? "审核中"
                    : data.denounce_status == 1
                    ? "通过"
                    : "拒绝"
                }}
              </p>
            </div>
            <el-popconfirm
              v-else
              position="top"
              title="确定删除吗？"
              confirm-button-text="确认"
              confirm-button-type="danger"
              icon="el-icon-info"
              icon-color="red"
              @confirm="handleDelete(current, data.id)"
            >
              <el-button slot="reference" type="danger">删除</el-button>
            </el-popconfirm>
          </div>
        </div>
        <el-pagination
          class="pagination"
          background
          layout="sizes, prev, pager, next"
          :total="total"
          :page-sizes="[8, 10, 20, 30, 40]"
          :page-size="size"
          :current-page="page"
          @current-change="
            (page) => {
              this.page = page;
              queryData(current, page);
            }
          "
          @size-change="
            (size) => {
              this.size = size;
              queryData(current, 1);
            }
          "
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import { mapGetters } from "vuex";

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
        {
          key: "2",
          name: "我的举报",
        },
      ],
      datas: [],
      total: 0,
      page: 1,
      size: 8,
    };
  },
  computed: {
    ...mapGetters(["token", "user"]),
  },
  methods: {
    handleArticleGo(id) {
      window.open(`/#/questions/${id}`);
    },
    handleSelect(index) {
      this.current = index;
      this.queryData(this.current, 1);
    },
    queryData(type = "0", page = 1) {
      request
        .get(
          `/${
            type == "0" ? "article" : type == "1" ? "comment" : "denounce"
          }/mine/?page=${page}&size=${this.size}`
        )
        .then((res) => {
          if (res && res.data) {
            this.total = res.data.count;
            this.datas = res.data.results;
          }
        });
    },
    handleDelete(type, id) {
      if (type === "2") {
        return;
      }
      request
        .delete(`/${type == "0" ? "article" : "comment"}/${id}/`)
        .then((res) => {
          if (res.status == 204) {
            this.queryData(this.current, 1);
          }
        });
    },
  },
  mounted() {
    this.queryData(0, 1);
  },
};
</script>
<style lang="less" scoped>
.pagination {
  position: absolute;
  bottom: 0;
  right: 16px;
}
.user_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background: #9da2a7;
  padding: 20px;
  border-radius: 4px;

  > span:nth-child(1) {
    font-size: 24px;
    font-weight: 500;
  }

  .user_header_count {
    font-size: 28px;
    margin-right: 8px;
  }

  .user_header_icon {
    font-size: 24px;
  }
}
.user_detail {
  margin-top: 24px;
  display: flex;
  gap: 16px;
  height: 70vh;
  overflow-y: auto;

  .catalog {
    width: 20%;
  }

  .detail_content {
    padding-top: 12px;
    width: 80%;
    position: relative;

    .detail_content_wrap {
      height: calc(100% - 48px);
      overflow-y: auto;
    }

    .detail_content_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 8px;

      .detail_content_left {
        max-width: 80%;

        > p {
          font-weight: 500;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: keep-all;
          text-wrap: nowrap;
        }

        .detail_content_item_comment {
          margin-bottom: 4px;
          font-size: 16px;
          font-weight: 500;
        }

        .detail_content_item_article {
          cursor: pointer;
          color: gray;
          font-size: 12px;
        }
      }
      .detail_content_item_status {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 4px;

        > i {
          font-size: 24px;
        }
        > p {
          color: gray;
          font-size: 14px;
        }
      }
      &:not(:first-child) {
        margin-top: 16px;
      }
    }
  }
}
</style>
