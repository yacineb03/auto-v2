export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  ssr: false,

  typescript: {
    typeCheck: false,
    strict: false
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'fr',
        class: 'scroll-smooth'
      },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
        }
      ],
      script: [
        {
          src: 'https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js',
          defer: true
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon'
    }
  }
})


