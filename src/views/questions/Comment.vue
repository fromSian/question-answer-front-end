<template lang="">
  <div class="comments">
    <p>评论详情</p>
    <div class="comment" v-for="comment in comments">
      <div>{{ comment.username }}</div>
      <div>{{ comment.content }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      comments: [
        {
          username: "评论用户",
          content: "评论内容",
        },
        {
          username: "评论用户",
          content: "评论内容",
        },
        {
          username: "评论用户",
          content: "评论内容",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="less">
.comment {
  margin-top: 16px;
  display: flex;
  background: wheat;
  justify-content: space-between;
  padding: 16px 0;
}
</style>
