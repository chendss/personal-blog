import { mouseMutex, today } from '@/static/utils'

export default {
  data () {
    return {
      today: today(),
    }
  },
  computed: {
  },
  mounted () {
    mouseMutex('#id-vibrant-mask', '#id-cover-layer', 120)
  },
  methods: {
  },
  async asyncData ({ $axios }) {
    const res = await $axios.get('http://localhost:3001/oneDay')
    const data = res.data
    return { day: data }
  }
}
