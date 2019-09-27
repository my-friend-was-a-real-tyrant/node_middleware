const router = require('koa-router')();

const otherControll= require('./controllers/other/index')
const successFormat = require('./controllers/common/successReturn')
const apiUrl = require('./controllers/other/config/config')

const send = require('koa-send');
const fs = require('fs')
const request = require('request')
const path = require('path')
const urllib = require('urllib')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const koaBody = require('koa-body')({
  multipart: true,
  jsonLimit: '5mb',
  formLimit: '5mb',
  textLimit: '5mb'
});


router.get('/cardinfo/selCardInfo', async (ctx, next) => {
  let phone = ctx.request.query.phone
  const result = await otherControll.CarInfo.getCarInfo(phone)
  ctx.body = successFormat.successFormat(result)
})

router.post('/Openinfo/ImplCardinfo',koaBody, async (ctx, next) => {
  var file = ctx.request.body.files.file
  var tmpath= file['path'];
  var tmparr =file['name'].split('.');
  var ext ='.'+tmparr[tmparr.length-1];
  var newpath =path.join(__dirname, './file', parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext);

  var stream = fs.createWriteStream(newpath);//创建一个可写流
  fs.createReadStream(tmpath).pipe(stream);
  const result = await otherControll.Template.saveTemplate(newpath)
  // ctx.body = {
  //   code: '00000',
  //   message: 'success'
  // }
  ctx.body =  successFormat.successFormat(result)
})

router.get('/Openinfo/getTemplate', async (ctx, next) => {
  ctx.response.redirect(`${apiUrl}/Openinfo/getTemplate`);
})

router.post('/Openinfo/ApplyCardinfo', async (ctx, next) => {
  let {openPhone, openName, openAddress, openOper} = ctx.request.query
  const result = await otherControll.ApplyCard.ApplyCardinfo(
    {openPhone, openName, openAddress, openOper}
  )
  // ctx.body =  ctx.request.query.openName
  ctx.body =  successFormat.successFormat(result)
})

router.get('/Openinfo/PageOpenInfo', async (ctx, next) => {
  const result = await otherControll.PageOpenInfo.getOpenInfo(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})

router.post('/Openinfo/checkInfo', async (ctx, next) => {
  const result = await otherControll.CheckInfo.getCheckInfo(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})


router.post('/cardinfo/UpNickName', async (ctx, next) => {
  const result = await otherControll.upNickName.UpNickName(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})

// cardinfo/getCardTemp


router.get('/cardinfo/getCardTemp', async (ctx, next) => {
  ctx.response.redirect(`${apiUrl}/cardinfo/getCardTemp`);
})



router.post('/cardinfo/PayCard', async (ctx, next) => {
  const result = await otherControll.PayCard.getPayCard(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})

router.post('/cardinfo/checkPay', async (ctx, next) => {
  const result = await otherControll.CheckPay.checkPay(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})

router.get('/cardinfo/selPayCheckInfo', async (ctx, next) => {
  const result = await otherControll.SelPayCheckInfo.checkPayInfo(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})
const commonController = require('./controllers/CommonController');


router.post('/cardinfo/paylist',koaBody, async (ctx, next) => {

  // const res = await ctx.req.pipe(request.post(`${apiUrl}/cardinfo/paylist`))
  // ctx.body = JSON.stringify(res)

  var file = ctx.request.body.files.file
  var tmpath= file['path'];
  var tmparr =file['name'].split('.');
  var ext ='.'+tmparr[tmparr.length-1];
  var newpath =path.join(__dirname, './file', parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext);

  var stream = fs.createWriteStream(newpath);//创建一个可写流
  fs.createReadStream(tmpath).pipe(stream);

  const result = await otherControll.Template.savePaylist(newpath)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body =  JSON.stringify(file)
})

router.get('/cardinfo/selCardList', async (ctx, next) => {
  const result = await otherControll.SelCardList.getList(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})

router.post('/cardinfo/refund', async (ctx, next) => {
  const result = await otherControll.Refund.refund(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})

router.get('/cardinfo/pageRefund', async (ctx, next) => {
  const result = await otherControll.PageRefund.getPageRefund(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})

router.post('/shop/addShopType', async (ctx, next) => {
  const result = await otherControll.ShopType.addShopType(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})
router.get('/shop/selShopType', async (ctx, next) => {
  const result = await otherControll.ShopType.getShopType()
  ctx.body =  successFormat.successFormat(result)
})
router.get('/shop/selShopTypeOne', async (ctx, next) => {
  const result = await otherControll.ShopType.selShopTypeOne()
  ctx.body =  successFormat.successFormat(result)
})

router.post('/shop/UpShopType', async (ctx, next) => {
  const result = await otherControll.Shop.upShopType(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})

router.post('/shop/addShopCheck', async (ctx, next) => {
  const result = await otherControll.Shop.addShopCheck(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})
router.get('/shop/PageSelShopCheck', async (ctx, next) => {
  const result = await otherControll.Shop.pageSelShopCheck(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})
router.post('/shop/addShop', async (ctx, next) => {
  const result = await otherControll.Shop.addShop(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})
router.get('/shop/pageMerchant', async (ctx, next) => {
  const result = await otherControll.Shop.pageMerchant(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})
router.get('/cardinfo/pageCardRecurd', async (ctx, next) => {
  const result = await otherControll.CardInfo.pageCardRecurd(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
})

//ctx.session.user.userId
router.get('/shop/pageShopRecordDay', async (ctx, next) => {
  // if (ctx.session.user) {
  //   ctx.request.query.userId = ctx.request.query.userId
  // }
  const result = await otherControll.Shop.pageShopRecordDay(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})

router.get('/shop/pageShopRecordMonth', async (ctx, next) => {
  // if (ctx.session.user) {
  //   ctx.request.query.userId = ctx.request.query.userId
  // }
  const result = await otherControll.Shop.pageShopRecordMonth(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})

router.get('/shop/pageShopRecordYear', async (ctx, next) => {
  // if (ctx.session.user) {
  //   ctx.request.query.userId = ctx.request.query.userId
  // }
  const result = await otherControll.Shop.pageShopRecordYear(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})
router.get('/shop/selPayCount', async (ctx, next) => {
  const result = await otherControll.Shop.selPayCount(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})

router.get('/shop/selRefund', async (ctx, next) => {
  const result = await otherControll.Shop.selRefund(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})

router.get('/shop/exprRecord', async (ctx, next) => {
  const result = await otherControll.Shop.exprRecord(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})

router.get('/cardinfo/selOrderPar', async (ctx, next) => {
  const result = await otherControll.CardInfo.selOrderPar(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})

router.post('/cardinfo/CreQr', async (ctx, next) => {
  const result = await otherControll.CardInfo.CreQr(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})

router.get('/cardinfo/selShopTemp', async (ctx, next) => {
  const result = await otherControll.CardInfo.selShopTemp(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})


router.get('/cardinfo/selIsPay', async (ctx, next) => {
  const result = await otherControll.CardInfo.selIsPay(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})
router.post('/cardinfo/Charge', async (ctx, next) => {
  if (ctx.session.user) {
    ctx.body = 444
    ctx.request.query.userId = ctx.request.query.userId
  }
  const result = await otherControll.CardInfo.Charge(ctx.request.query)
  ctx.body =  successFormat.successFormat(result)
  // ctx.body = ctx.session.user
})
module.exports = router;
