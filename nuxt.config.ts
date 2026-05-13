// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/fonts', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
      {
        name: 'JetBrains Mono',
        provider: 'google',
        weights: [300, 400, 500, 600, 700],
        global: true,
      },
    ],
  },
  content: {
    highlight: {
      theme: 'github-dark',
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
