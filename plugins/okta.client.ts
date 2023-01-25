import { OktaAuth } from "@okta/okta-auth-js";
import OktaVue from "@okta/okta-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  
  const oktaAuth = new OktaAuth({
    issuer: config.OKTA_ISSUER,
    clientId: config.OKTA_CLIENT_ID,
    redirectUri: config.OKTA_REDIRECT_URI,
    scopes: ["openid", "email", "profile"],
    tokenManager: {
      storage: "sessionStorage",
    },
  });

  nuxtApp.vueApp.use(OktaVue, { oktaAuth });

  return {
    provide: {
      oktaAuth,
    },
  };
});
