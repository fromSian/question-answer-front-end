<template lang="">
  <div>
    <TagsVue></TagsVue>
    <List></List>
  </div>
</template>
<script>
import List from "./List.vue";
import TagsVue from "./Tags.vue";
export default {
  name: "Home",
  components: { TagsVue, List },
  mounted() {
    console.log(this.$route.query);
  },
};
</script>
<style lang=""></style>
