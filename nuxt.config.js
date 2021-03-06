
const analyze = function () {
  if (process.env.analyze === 'analyze') {
    return {
      analyze: true,
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }
  return {}
}

module.exports = {
  env: {
    baseUrl: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:10098' : 'https://adminserver.dashao.me:2'
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
    'assets/index.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
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
    ...analyze(),
    transpile: [/^lodash-es/, /^vue-particles/, /^vue-markdown/, /^le-markdown-editor/, /^vue-meditor/, /^vue-typer/, /^static/, /^easy-typer-js/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
}
