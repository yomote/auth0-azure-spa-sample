import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { createAuth0 } from "@auth0/auth0-vue";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

// Register the Authentication plugin
app.use(
  createAuth0(
    {
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: `${window.location.origin}/callback`,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "profile email read:message",
      },
    },
    {
      errorPath: "/error",
      skipRedirectCallback: window.location.pathname === "/error",
    }
  )
);

app.mount("#app");
