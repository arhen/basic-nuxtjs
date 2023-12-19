// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	
  devtools: { enabled: true },
  app: {
	baseURL: '/oddinary/',
    head: {
      viewport:
        "width=device-width, height=device-height, initial-scale=1, user-scalable=no",
      htmlAttrs: {
        lang: "en-id",
      },
    },
  },
  
  css:[
    '~/assets/styles/style.scss',
    "~/assets/styles/plasticbeach.css",
    "~/assets/styles/satoshi.css",
  ],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-delay-hydration', 'nuxt-swiper'],
  delayHydration: {
    mode: 'init',
    // enables nuxt-delay-hydration in dev mode for testing
    // NOTE: you should disable this once you've finished testing, it will break HMR
    // debug: process.env.NODE_ENV === 'development'
  }
})
