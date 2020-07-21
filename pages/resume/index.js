import axios from "axios"
export default {
  data () {
    return {
    }
  },
  mounted () {
    console.log('object', this.resume)
  },
  async asyncData () {
    const res = await axios.get(`/blog/site`)
    const resume = res.data.data
    return { resume }
  }
}