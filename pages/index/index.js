import Icon from '@/components/Icon'
import HomeMain from './HomeMain'
import Particles from '@/components/Particles'
import { mouseMutex, today } from '@/static/utils'
import axios from 'axios'

export default {
  data () {
    return {
      today: today(),
    }
  },
  components: { Icon, Particles, HomeMain },
  computed: {
  },
  mounted () {
    mouseMutex('#id-vibrant-mask', '#id-cover-layer', 120)
    console.log('fauiuu', this.remote)
  },
  methods: {
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
