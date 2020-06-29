import Icon from '@/components/Icon'
import { mouseMutex, today } from '@/static/utils'

export default {
  data () {
    return {
      today: today(),
    }
  },
  components: { Icon },
  computed: {
  },
  mounted () {
    mouseMutex('#id-vibrant-mask', '#id-cover-layer', 120)
  },
  methods: {
  },
  async asyncData ({ $axios, app }) {
    const { host, origin, port } = app.config
    const url = path => `${origin}://${host}:${port}${path}`
    let result = {}
    const dayData = async function () {
      const r = await $axios.get(url('/oneDay'))
      const data = r.data
      return data
    }
    const listData = async function () {
      const r = await $axios.get(url('/homeData'))
      const data = r.data
      return data
    }
    result.day = await dayData()
    result.remote = await listData()
    return result
  }
}
