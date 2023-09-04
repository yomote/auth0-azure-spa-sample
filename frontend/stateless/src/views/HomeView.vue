<template>
  <main>
    <h1>Hello, world.</h1>

    <el-button type="primary" @click="callApi">Call Backend API</el-button>
  </main>
</template>
<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "HomeView",
  methods: {
    async callApi() {
      const accessToken = await this.$auth0.getAccessTokenSilently();
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_AUTH0_AUDIENCE}/api/message`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        ElMessage({
          message: response.data,
          type: "success",
        });
      } catch (error) {
        ElMessage({
          message: error.message,
          type: "error",
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
main {
  text-align: center;
}
</style>
