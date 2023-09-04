<template>
  <main>
    <h1>{{ error.error }}</h1>
    <p>
      {{ error.error_description }}
    </p>
    <el-button type="primary" @click="backToTop">Back To Top</el-button>
  </main>
</template>
<script>
export default {
  name: "ErrorView",
  data: function () {
    return {
      error: this.$auth0.error,
    };
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
