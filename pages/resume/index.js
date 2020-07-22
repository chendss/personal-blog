import axios from "axios"
import Effects from '@/components/Effects'

export default {
  data () {
    return {
    }
  },
  components: { Effects },
  mounted () {
    console.log('object', this.resume)
  },
  async asyncData () {
    const res = await axios.get(`/blog/site`)
    const resume = res.data.data
    return { resume }
  }
}