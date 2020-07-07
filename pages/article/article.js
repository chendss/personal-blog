import axios from "axios"
import Markdown from 'vue-markdown'
export default {
  data () {
    return {}
  },
  components: { Markdown },
  async asyncData ({ query }) {
    const { articleId } = query
    const res = await axios.get('/articleData')
    const article = res.data.data
    return { article }
  }
}