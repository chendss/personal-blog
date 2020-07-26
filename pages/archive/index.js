import axios from 'axios'
import { groupBy, sortBy } from 'lodash'

export default {
  data () {
    return {
      group: [],
    }
  },
  mounted () {
    this.group = groupBy(this.list, l => (new Date(l.time).getFullYear()))
    const sortList = Object.keys(this.group)
    sortList.sort((o1, o2) => {
      if (Number(o1) < Number(o2)) {
        return 1
      } else if (Number(o1) > Number(o2)) {
        return -1
      }
      return 0
    })
    this.group = sortList.reduce((pre, key) => {
      pre.push({ key, value: this.groupMonth(this.group[key]) })
      return pre
    }, [])
    console.log('fuck', this.group)
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