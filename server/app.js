const oneDay = require('./oneDay')
const { sample } = require('lodash')
const router = require('koa-router')()

router.get('/oneDay', async ctx => {
  const data = sample(oneDay)
  ctx.body = data
})

router.get('/oneDay', async ctx => {
  const data = sample(oneDay)
  ctx.body = data
})

router.get('/homeData', async ctx => {
  const data = {
    list: [
      {
        browse: 57,
        comments: 1,
        author: '大少',
        id: '1234456',
        time: '2020-4-22',
        title: 'JS call、apply、bind、递归、闭包',
        abstract: 'call、apply、bind方法及函数的递归及闭包',
        cover: 'https://pic.downk.cc/item/5ea05009c2a9a83be5c7e4ce.jpg',
      },
      {
        browse: 57,
        comments: 1,
        author: '大少',
        id: '123445226',
        time: '2020-4-22',
        title: 'JS call、apply、bind、递归、闭包',
        abstract: 'call、apply、bind方法及函数的递归及闭包',
        cover: 'https://pic.downk.cc/item/5ea05009c2a9a83be5c7e4ce.jpg',
      },
      {
        browse: 57,
        comments: 1,
        author: '大少',
        id: '123444556',
        time: '2020-4-22',
        title: 'JS call、apply、bind、递归、闭包',
        abstract: 'call、apply、bind方法及函数的递归及闭包',
        cover: 'https://pic.downk.cc/item/5ea05009c2a9a83be5c7e4ce.jpg',
      },
    ]
  }
  ctx.body = data
})

module.exports = router