<template lang="">
  <div class="tags">
    <el-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      effect="plain"
      class="tag"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>
<script>
export default {
  name: "Tags",
  data() {
    return {
      items: [
        { type: "info", label: "全选" },
        { type: "info", label: "标签一" },
        { type: "info", label: "标签二" },
        { type: "info", label: "标签三" },
        { type: "info", label: "标签四" },
        { type: "info", label: "标签五" },
      ],
    };
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
