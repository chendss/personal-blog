import axios from "axios"
import { throttle } from 'lodash'
import Particles from '@/components/Particles'
import { markDownToc, timestapToDate, scrolMove, docTop, scrollPoint, getEleSize } from '../../static/utils'

export default {
  data () {
    return {
      toc: [],
      showToc: []
    }
  },
  components: { Particles },
  watch: {
    scroll () {

    }
  },
  mounted () {
    const html = this.article.html
    this.toc = markDownToc(html)
    this.showToc = this.toc.filter(t => t.level < 4)
    window.addEventListener('scroll', throttle(this.scroll, 150))
    console.log('object', this.article)
  },
  methods: {
    timestapToDate,
    tocItemClick (item) {
      const { level, code } = item
      const index = this.toc.filter(t => t.level === level).findIndex(t => t.code === code)
      const list = [...document.querySelectorAll(`#id-markdown-content h${level}`)]
      const dom = list[index]
      scrolMove(dom)
    },
    scroll () {
      const dom = document.querySelector('#id-toc')
      if (dom != null) {
        const [width, height] = getEleSize('#id-cover-article')
        const dx = Math.max(0, scrollPoint() - height)
        dom.setAttribute('style', `margin-top:${dx}px`)
      }
    }
  },
  async asyncData ({ query }) {
    const { articleId } = query
    const res = await axios.get(`/blog/article?id=${articleId}`)
    const article = res.data.data
    return { article }
  },
}