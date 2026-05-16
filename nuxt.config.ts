// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/seo',
  ],
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
  app: {
    baseURL: '/',
    buildAssetsDir: 'assets'
  },
  content: {
    highlight: {
      theme: 'github-dark',
    },
  },
  nitro: {
    preset: 'github-pages'
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})