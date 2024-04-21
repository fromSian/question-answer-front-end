<template>
  <div class="tags">
    <el-radio-group v-model="curTag">
      <el-radio-button label="全部"></el-radio-button>
      <el-radio-button v-for="tag in tags" :key="tag" :label="tag">
      </el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  name: "Tags",
  data() {
    return {
      tags: [],
      curTag: '全部'
    };
  },
  watch: {
    curTag: {
      handler() {
        this.$emit("clickTag", this.curTag);
      },
      immediate: true,
    },
  },
  mounted() {
    this.getTags();
  },
  methods: {
    getTags() {
      request
        .get("/tags/")
        .then((result) => {
          this.tags = result?.data?.tags || [];
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="less">
.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  .tag {
    cursor: pointer;
  }
}
</style>
