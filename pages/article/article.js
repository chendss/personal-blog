import axios from "axios"
export default {
  data() {
    return {}
  },
  methods: {
    save(html) {
      console.log('sssss', html)
    }
  },
  async asyncData({ query }) {
    const { articleId } = query
    const res = await axios.get('/articleData')
    const article = res.data.html
    const cover = res.data.cover
    return { article, cover }
  }
}