import axios from 'axios'
import { groupBy, sort } from 'lodash'

export default {
  data () {
    return {
      group: [],
    }
  },
  mounted () {
    this.group = groupBy(this.list, l => (new Date(l.time).getFullYear()))
    this.group = Object.keys(this.group).reduce((pre, key) => {
      pre[key] = this.groupMonth(this.group[key])
      return pre
    }, {})
  },
  methods: {
    groupMonth (yearData) {
      const result = groupBy(yearData, y => (new Date(y.time).getMonth()))
      return result
    },
    goUrl (id) {
      this.$router.push(`/article?articleId=${id}`)
    }
  },
  async asyncData ({ query }) {
    const listData = async function () {
      const r = await axios.get('/blog/articleList?pageSize=1000')
      const data = r.data.data
      return data
    }
    const list = await listData()
    return { list }
  },
}