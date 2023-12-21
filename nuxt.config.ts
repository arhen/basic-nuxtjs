// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
	// baseURL: '/oddinary/',
	buildAssetsDir: '/oddinary/_nuxt/',
    head: {
      viewport:
        "width=device-width, height=device-height, initial-scale=1",
      htmlAttrs: {
        lang: "en-id",
      },
      script:[
        {
          type:'text/javascript',
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MDB2NV49');`,
          tagPosition: "head",
        }
      ],
      noscript: [
        {
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MDB2NV49"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          tagPosition: "bodyOpen",
        },
      ],
    },
  },
  css:[
    '~/assets/styles/style.scss',
    "~/assets/styles/plasticbeach.css",
    "~/assets/styles/satoshi.css",
  ],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-delay-hydration', '@nuxt/image'],
  delayHydration: {
    mode: 'init',
    // enables nuxt-delay-hydration in dev mode for testing
    // NOTE: you should disable this once you've finished testing, it will break HMR
    // debug: process.env.NODE_ENV === 'development'
  },
  routeRules: {
    '/': { prerender: true },
  },
})
