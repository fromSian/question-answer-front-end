<template lang="">
  <div>
    <TagsVue @clickTag="filterList"></TagsVue>
    <List :currentTag="currentTag"></List>
  </div>
</template>
<script>
import List from "./List.vue";
import TagsVue from "./Tags.vue";
export default {
  name: "Home",
  components: { TagsVue, List },
  data() {
    return {
      currentTag: "",
    };
  },
  mounted() {},
  methods: {
    filterList(curTag) {
      this.currentTag = curTag;
    },
  },
};
</script>
<style lang=""></style>
