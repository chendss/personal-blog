import { q, get, getBatch, mouseMutex, numberUppercase } from '@/static/utils'
import { cloneDeep } from 'lodash'

export default {
  data () {
    return {
      packUp: 'true',
      infos: [
        {
          name: 'Contact',
          url: '',
        },
        {
          name: 'Links',
          url: '',
        },
        {
          name: 'Archive',
          url: '',
        },
        {
          name: 'Rainy',
          url: '',
        },
      ]
    }
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
    menuClick () {
      this.packUp = this.packUp === 'false' ? 'true' : 'false'
    }
  },
  async asyncData ({ $axios }) {
    const res = await $axios.get('http://localhost:3001/oneDay')
    const data = res.data
    return { day: data }
  }
}
