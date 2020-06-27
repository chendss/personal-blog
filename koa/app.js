const Koa = require('koa')
const router = require('koa-router')()
const oneDay = require('./oneDay')
const { sample } = require('lodash')
const app = new Koa()

router.get('/oneDay', async ctx => {
  const data = sample(oneDay)
  ctx.body = data
})


const main = function () {
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.listen(3001)
}
main()
