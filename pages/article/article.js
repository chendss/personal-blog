import axios from "axios"
import { markDownToc } from '../../static/utils'

export default {
  data () {
    return {}
  },
  mounted () {
    console.log('popop', this.article)
    const html = this.article.html
    console.log('test', markDownToc(html))
  },
  async asyncData ({ query }) {
    const { articleId } = query
    const res = await axios.get(`/blog/article?id=${articleId}`)
    const article = res.data.data
    return { article }
  }
}