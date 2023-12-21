import vue from "@vitejs/plugin-vue";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  modules: ["@pinia/nuxt", "@nuxt/test-utils/module"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "TodoList app - Nuxt3",
    },
  },
});
