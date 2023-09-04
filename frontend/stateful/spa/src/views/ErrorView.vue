<template>
  <main>
    <h1>{{ error }}</h1>
    <p>
      {{ error_description }}
    </p>
    <el-button type="primary" @click="backToTop">Back To Top</el-button>
  </main>
</template>
<script>
export default {
  name: "ErrorView",
  props: {
    error: {
      type: String,
      required: true,
    },
    error_description: {
      type: String,
      required: true,
    },
  },
  methods: {
    backToTop() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped lang="scss">
main {
  text-align: center;
}
</style>
