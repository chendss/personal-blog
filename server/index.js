const Koa = require('koa')
const axios = require('axios')
const consola = require('consola')
const router = require('./app')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('koa-bodyparser')
const config = require('../nuxt.config.js')

const app = new Koa()
config.dev = process.env.NODE_ENV !== 'production'
app.use(bodyParser())

const registerApi = function () {
  app.use(router.routes())
  app.use(router.allowedMethods())
}

const nuxtRender = async function () {
  const nuxt = new Nuxt(config)
  await nuxt.ready()
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  return nuxt
}

const listen = function () {
  const { port, host } = config
  app.listen(port)
  axios.default.baseURL = `http://${host}:${port}`
  consola.ready({
    message: `服务启动 on http://${host}:${port}`,
    badge: true
  })
}

async function start () {
  registerApi()
  const nuxt = await nuxtRender()
  app.use(ctx => {
    ctx.status = 200
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        promise.then(resolve).catch(reject)
      })
    })
  })
  listen()
}
start()
