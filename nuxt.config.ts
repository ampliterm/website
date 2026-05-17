// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/plausible',
  ],
  plausible: {
    apiHost: 'https://a.521dimensions.com',
    domain: 'ampliterm.com',
    autoOutboundTracking: true,
  },
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
    buildAssetsDir: '_nuxt'
  },
  content: {
    highlight: {
      theme: 'github-dark',
    },
  },
  nitro: {
    preset: 'github-pages'
  },
  site: {
    url: 'https://ampliterm.com',
    name: 'Ampliterm'
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})