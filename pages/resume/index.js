import axios from "axios"
import Effects from '@/components/Effects'

export default {
  data () {
    return {
    }
  },
  components: { Effects },
  mounted () {
    console.log('object', this.resume)
  },
  methods: {
    scroll () {
      const dom = document.querySelector('#id-toc')
      if (dom != null) {
        const domCopy = document.querySelector('#id-toc-copy')
        const [width, height] = getEleSize('#id-cover-article')
        this.topLeft = domCopy.getBoundingClientRect().left || this.topLeft
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
  async asyncData () {
    const res = await axios.get(`/blog/site`)
    const resume = res.data.data
    return { resume }
  }
}