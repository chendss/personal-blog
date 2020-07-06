export default {
  data () {
    return {}
  },
  async asyncData ({ $axios, app }) {
    let url
    if (process.client) {
      url = (path = '') => (window.location.origin + path)
    } else {
      const { host, origin, port } = app.config
      url = (path = '') => `${origin}://${host}:${port}${path}`
    }
    console.log('[][][]555555555555****]', app.config)
  }
}