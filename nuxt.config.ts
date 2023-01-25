export default defineNuxtConfig({
  runtimeConfig: {
    // private stuff goes here
    public: {
      // public stuff goes here
      OKTA_ISSUER: process.env.OKTA_ISSUER,
      OKTA_REDIRECT_URI: process.env.OKTA_REDIRECT_URI,
      OKTA_CLIENT_ID: process.env.OKTA_CLIENT_ID,
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@vueuse/nuxt"],

  build: {
    transpile: ["trpc-nuxt"],
  },

  css: ["@/assets/css/main.css"],
});