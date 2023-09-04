<template>
  <header>
    <div class="wrapper">
      <h1></h1>
      <el-button type="info" @click="logout" v-if="isAuthenticated"
        >Log out</el-button
      >
    </div>
  </header>
</template>
<script>
export default {
  name: "HeaderView",
  data() {
    return {
      isAuthenticated: this.$auth0.isAuthenticated,
    };
  },
  methods: {
    logout() {
      this.$auth0.logout();
    },
  },
};
</script>
<style lang="scss">
h1 {
  text-align: center;
  margin-bottom: 20px;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
