<template>
  <div><HomeVue></HomeVue></div>
</template>

<script>
import HomeVue from "./questions/Home.vue";
export default {
  name: "Home",
  components: { HomeVue },
  data() {
    return {
      billboard: {
        content: "",
      },
    };
  },
  created() {},
  methods: {},
};
</script>
