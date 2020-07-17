import axios from "axios"
export default {
  data () {
    return {}
  },
  mounted () {
    console.log('popop', this.article)
  },
  async asyncData ({ query }) {
    const { articleId } = query
    const res = await axios.get(`/blog/article?id=${articleId}`)
    const article = res.data.data
    return { article }
  }
}