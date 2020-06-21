import { q, get, getBatch, mouseMutex, numberUppercase } from '@/static/utils'
import { cloneDeep } from 'lodash'

export default {
  data () {
    return {}
  },
  computed: {
    today () {
      const date = new Date()
      const nowMonth = date.getMonth() + 1
      const strDate = date.getDate()
      const year = date.getFullYear()
      return `${numberUppercase(nowMonth)}月 ${strDate}, ${year}`
    }
  },
  mounted () {
    mouseMutex('#id-vibrant-mask', '#id-cover-layer', 120)
  },
  methods: {
  },
  async asyncData ({ $axios }) {
    console.log('waht', $axios)
    return { a: 1 }
  }
}
