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
import axios from "axios";

export default {
  name: "HeaderView",
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created: function () {
    axios.get("/auth").then((res) => {
      this.isAuthenticated = true;
    });
  },
  methods: {
    logout() {
      location.href = "/logout";
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
