import Icon from '@/components/Icon'
import Particles from '@/components/Particles'
import { mouseMutex, today } from '@/static/utils'
import axios from 'axios'

export default {
  data () {
    return {
      today: today(),
    }
  },
  components: { Icon, Particles },
  computed: {
  },
  mounted () {
    mouseMutex('#id-vibrant-mask', '#id-cover-layer', 120)
    console.log('fauiuu', this.remote)
  },
  methods: {
    articleClick (articleItem) {
      const { id } = articleItem
      const url = `/article?articleId=${id}`
      this.$router.push(url)
    }
  },
  async asyncData () {
    let result = {}
    const dayData = async function () {
      const r = await axios.get('/oneDay')
      const data = r.data
      return data
    }
    const listData = async function () {
      const r = await axios.get('/articleList?pageSize=5')
      const data = r.data.data
      return data
    }
    result.day = await dayData()
    result.remote = await listData()
    return result
  }
}
