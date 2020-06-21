import { merge, q, random, rang, manyFunction } from "."

class Circle {
  constructor(settings, ctx, config) {
    this.pos = {}
    this.settings = settings
    this.ctx = ctx
    this.width = config.width
    this.height = config.height
    this.init()
  }


  randomColor () {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    const alpha = Math.random().toPrecision(2)
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
  }

  init () {
    this.pos.x = Math.random() * this.width
    this.pos.y = this.height + Math.random() * 100
    this.alpha = 0.1 + Math.random() * this.settings.clearOffset
    this.scale = 0.1 + Math.random() * 0.3
    this.speed = Math.random()
    if (this.settings.color === 'random') {
      this.color = randomColor()
    }
    else {
      this.color = this.settings.color
    }
  }

  draw () {
    if (this.alpha <= 0) {
      this.init()
    }
    this.pos.y -= this.speed
    this.alpha -= 0.0005
    this.ctx.beginPath()
    this.ctx.arc(this.pos.x, this.pos.y, this.scale * this.settings.radius, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.closePath()
  }
}

export default class {
  constructor(seletor, options = {}) {
    this.canvas = null
    this.ctx = null
    this.animateHeader = true
    this.circles = []
    this.settings = merge({
      color: 'rgba(255,255,255,.5)',
      radius: 16,
      density: 0.1,
      clearOffset: 0.2
    }, options)
    this.container = q(seletor)
    this.id = random()
  }


  static new () {
    const c = new this(...arguments)
    c.main()
    return c
  }

  get width () {
    return this.container.offsetWidth
  }

  get height () {
    return this.container.offsetHeight
  }

  /**
   * 创建canvas
   *
   */
  initCanvas () {
    const canvasElement = document.createElement('canvas')
    canvasElement.id = this.id
    this.container.appendChild(canvasElement)
    canvasElement.parentElement.style.overflow = 'hidden'
  }

  animate () {
    if (this.animateHeader) {
      this.ctx.clearRect(0, 0, this.width, this.height)
      for (let i in this.circles) {
        this.circles[i].draw()
      }
    }
    requestAnimationFrame(() => this.animate())
  }

  /**
   * 容器初始化
   *
   */
  initContainer () {
    const width = this.width
    const height = this.height
    const settings = this.settings
    this.initCanvas()
    this.canvas = q(`#${this.id}`)
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d')
    const circlesLength = width * settings.density
    this.circles = manyFunction(circlesLength, () => new Circle(this.settings, this.ctx, { width, height }))
    this.animate()
  }

  scrollCheck = () => {
    if (document.body.scrollTop > height) {
      this.animateHeader = false
    }
    else {
      this.animateHeader = true
    }
  }

  resize = () => {
    this.container.height = this.height + 'px'
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  addListeners () {
    window.addEventListener('scroll', this.scrollCheck, false)
    window.addEventListener('resize', this.resize, false)
  }

  main () {
    this.initContainer()
    this.addListeners()
  }
}