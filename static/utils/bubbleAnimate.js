import { merge, q, random, rang } from "."

class Circle {
  constructor(settings, ctx) {
    this.pos = {}
    this.settings = settings
    this.ctx = ctx
    this.init()
  }

  randomColor () {
    var r = Math.floor(Math.random() * 255)
    var g = Math.floor(Math.random() * 255)
    var b = Math.floor(Math.random() * 255)
    var alpha = Math.random().toPrecision(2)
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
  }

  init () {
    this.pos.x = Math.random() * width
    this.pos.y = height + Math.random() * 100
    this.alpha = 0.1 + Math.random() * settings.clearOffset
    this.scale = 0.1 + Math.random() * 0.3
    this.speed = Math.random()
    if (this.settings.color === 'random') {
      this.color = randomColor()
    }
    else {
      this.color = settings.color
    }
  }

  draw () {
    if (this.alpha <= 0) {
      init()
    }
    this.pos.y -= this.speed
    this.alpha -= 0.0005
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.scale * settings.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

export default class {
  constructor(seletor, options = {}) {
    this.width = null
    this.height = null
    this.canvas = null
    this.ctx = null
    this.animateHeader = true
    this.circles = []
    this.settings = merge({
      color: 'rgba(255,255,255,.5)',
      radius: 10,
      density: 0.3,
      clearOffset: 0.2
    }, options)
    this.container = q(seletor)
    this.id = random()
  }

  /**
   * 创建canvas
   *
   */
  initCanvas () {
    var canvasElement = document.createElement('canvas')
    canvasElement.id = this.id
    container.appendChild(canvasElement)
    canvasElement.parentElement.style.overflow = 'hidden'
  }

  animate () {
    if (this.animateHeader) {
      this.ctx.clearRect(0, 0, width, height)
      for (var i in circles) {
        circles[i].draw()
      }
    }
    requestAnimationFrame(animate)
  }

  /**
   * 容器初始化
   *
   */
  initContainer () {
    const width = this.container.offsetWidth
    const settings = this.settings
    this.width = width
    this.height = this.container.offsetHeight
    this.initCanvas()
    this.canvas = document.getElementById('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = canvas.getContext('2d')
    const circlesLength = width * settings.density
    this.circles = rang(circlesLength).map(_ => new Circle())
    this.animate()
  }

  scrollCheck () {
    if (document.body.scrollTop > height) {
      this.animateHeader = false
    }
    else {
      this.animateHeader = true
    }
  }

  resize () {
    this.width = this.container.clientWidth
    this.height = this.container.clientHeight
    this.container.height = this.height + 'px'
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  addListeners () {
    window.addEventListener('scroll', scrollCheck, false)
    window.addEventListener('resize', resize, false)
  }

  main () {
    this.initContainer()
    this.addListeners()
  }
}