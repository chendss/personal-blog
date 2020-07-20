import axios from "axios"
import { throttle } from 'lodash'
import Particles from '@/components/Particles'
import { markDownToc, timestapToDate, scrolMove, docTop, scrollPoint, getEleSize, scrolMovePoint } from '../../static/utils'

export default {
  data () {
    return {
      toc: [],
      showToc: [],
      topLeft: 0,
    }
  },
  components: { Particles },
  mounted () {
    const html = this.article.html
    this.toc = markDownToc(html)
    this.showToc = this.toc.filter(t => t.level < 4)
    window.addEventListener('scroll', throttle(this.scroll, 30))
  },
  methods: {
    timestapToDate,
    tocItemClick (item) {
      const { level, code } = item
      const index = this.toc.filter(t => t.level === level).findIndex(t => t.code === code)
      const list = [...document.querySelectorAll(`#id-markdown-content h${level}`)]
      const dom = list[index]
      const top = docTop(dom)
      scrolMovePoint(top, 0.15)
    },
    scroll () {
      const dom = document.querySelector('#id-toc')
      if (dom != null) {
        const domCopy = document.querySelector('#id-toc-copy')
        const [width, height] = getEleSize('#id-cover-article')
        this.topLeft = domCopy.getBoundingClientRect().left
        if (scrollPoint() > height + 16) {
          dom.setAttribute('style', `left:${this.topLeft}px;top:8px;position: fixed;`)
          domCopy.setAttribute('fixed', 'true')
        } else {
          domCopy.removeAttribute('fixed')
          dom.removeAttribute('style')
        }
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