const router = require('koa-router')();

const otherControll= require('./controllers/other/otherComtroll')

const koaBody = require('koa-body')({
  multipart: true,
  jsonLimit: '5mb',
  formLimit: '5mb',
  textLimit: '5mb'
});




router.get('/test', async (ctx, next) => {
  const result = await otherControll.CarInfo.getCarInfo('18257346778')
  ctx.body = result
})

router.get('/ttt', async (ctx, next) => {
  // const result = await otherControll.CarInfo.getCarInfo('18257346778')
  ctx.body = 1
})
module.exports = router;
