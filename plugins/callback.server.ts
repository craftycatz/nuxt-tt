import { LoginCallback } from "@okta/okta-vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("LoginCallback", LoginCallback);
  // add the LoginCallback component to the Nuxt app
  // add it to the route /signin/callback
  nuxtApp.vueApp.config.globalProperties.$router.addRoute({
    path: "/signin/callback",
    component: LoginCallback,
  });
});
