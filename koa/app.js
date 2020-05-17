const Koa = require('koa')
const Router = require('koa')
const app = new Koa()

app.use(ctx => {
  ctx.body = 'hello'
})

app.listen(3001)