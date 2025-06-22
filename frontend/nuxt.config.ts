// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/image'],
  build: {
    transpile: ['tslib'],
  },
  icon: {
    customCollections: [
      {
        prefix: 'cars',
        dir: 'components/global/icons/cars'
      },
      {
        prefix: 'global',
        dir: 'components/global/icons'
      },
    ],
  },
})