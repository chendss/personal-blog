import axios from 'axios'
import HomeMain from './HomeMain'
import Icon from '@/components/Icon'
import Particles from '@/components/Particles'
import { mouseMutex, today, get, log } from '@/static/utils'
import EasyTyper from '../../static/utils/easyTyper'

export default {
  data () {
    return {
      today: today(),
      obj: { output: '' },
    }
  },
  components: { Icon, Particles, HomeMain },
  computed: {
    config () {
      const state = get(this.$store, 'state.home', {})
      return state
    }
  },
  mounted () {
    mouseMutex('#id-vibrant-mask', '#id-cover-layer', 120)
    this.typed = new EasyTyper(this.day.text, this.obj)
  },
  methods: {
  },
  async asyncData ({ store }) {
    let result = {}
    const state = store.state
    const { articleNumber } = state.home
    const dayData = async function () {
      const r = await axios.get('/blog/oneDay')
      const data = r.data
      return data
    }
    const listData = async function () {
      const r = await axios.get(`/blog/articleList?pageSize=${articleNumber}`)
      const data = r.data.data
      return data
    }
    result.day = await dayData()
    result.remote = await listData()
    return result
  }
}
