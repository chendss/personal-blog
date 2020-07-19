import axios from "axios"
import { markDownToc, timestapToDate } from '../../static/utils'

export default {
  data () {
    return {
      toc: []
    }
  },
  mounted () {
    const html = this.article.html
    this.toc = markDownToc(html)
    console.log('object', this.article)
  },
  methods: {
    timestapToDate,
  },
  async asyncData ({ query }) {
    const { articleId } = query
    const res = await axios.get(`/blog/article?id=${articleId}`)
    const article = res.data.data
    return { article }
  }
}