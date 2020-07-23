import EasyTyper_ from 'easy-typer-js'
import { merge } from '.'

class EasyTyper {
  constructor(text, o = {}) {
    const obj = {
      sleep: 0,
      speed: 100,
      isEnd: false,
      backSpeed: 60,
      type: 'normal',
      singleBack: false,
      sentencePause: false,
    }
    this.typed = new EasyTyper_(merge(o, obj), text)
  }
  value () {
    return this.typed.obj.output
  }
}

export default EasyTyper