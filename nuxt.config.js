
module.exports = {
  env: {
    baseUrl: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:10098' : 'http://127.0.0.1:10098'
  },
  port: 9962,
  host: '0.0.0.0',
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'referrer', content: 'no-referrer' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_543384_msjvd6htfjp.css' },
      { rel: 'preload', type: 'font.woff2', href: '/fontawesome-webfont.woff2' },
    ],
    script: [
      { src: '//at.alicdn.com/t/font_1413038_97vhth4nczv.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/index.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/element-ui', ssr: false },
    '~/plugins/axios.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/, /^vue-particles/, /^vue-markdown/, /^le-markdown-editor/, /^vue-meditor/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
}
