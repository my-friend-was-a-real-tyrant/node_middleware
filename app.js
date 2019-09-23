const Koa = require('koa');
// 路由
const router = require('./router');
// 静态文件
const serve = require('koa-static');
// session
const session = require('koa-session2');
const Store = require('./Store');

// 路径解析
const url = require('url');

const app = new Koa();

const commonModel = require('./models/CommonModel');
// 微信开发调试转发请求
const NewRequestParams = require('./models/common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

const { appid, appSecret, redirectUri, redirect, hostname, manageSystemHostname } = require('./config');


// 添加String的格式化
String.prototype.format = function(args) {
    let result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (let key in args) {
                if(args[key]!=undefined){
                    const reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    const reg= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}


// session
// app.keys = ['some secret hurr'];
// const CONFIG = {
//     key: 'koa:sess',
//     maxAge: 604800000,
//     // maxAge: 10000,
//     overwrite: true,
//     httpOnly: true,
//     signed: true,
//     rolling: true // session刷新过期时间
// };
// app.use(convert(session(CONFIG, app)));
app.use(session({
    key: 'koa:sess',
    store: new Store(),
    maxAge: 604800000,
    overwrite: true,
}));

console.log(process.env.NODE_ENV);
const env = process.env.NODE_ENV;

// interceptor
app.use(async (ctx, next) => {
    // ctx.session = null;
    const requestUrl = url.parse(ctx.request.url, true);
    // 微信端链接
    if (requestUrl.pathname === '/login/' || requestUrl.pathname === '/system/' || requestUrl.pathname === '/mall/') {
        // 判断session是否存在，若不在则去获取session
        if (Object.prototype.hasOwnProperty.call(ctx.session, 'wechat') === false) {
            if (env === 'development') {
                // 开发环境openid写死
                ctx.session.wechat = {
                    openid: 'or_oJj2TDfMAQC675joZYmk476Q0'
                };
            } else {
                const params = requestUrl.query;
                // 判断url中是否带code参数，若未带参数则跳转微信授权链接获取
                if (Object.prototype.hasOwnProperty.call(params, 'code') === false) {
                    // url中不带code，无法获取openid
                    // 跳转获取code
                    ctx.redirect(redirect);
                    return;
                } else {
                    const { code } = params;
                    try {
                        const wechatData = await commonModel.requestOpenid({ code, appid, appSecret });
                        if (Object.prototype.hasOwnProperty.call(wechatData, 'openid') === true) {
                            const { access_token, openid } = wechatData;
                            const userInfo = await commonModel.requestUserInfo({ access_token, openid });
                            // 给予imgUrl
                            if (Object.prototype.hasOwnProperty.call(userInfo, 'openid')) {
                                ctx.session.wechat = wechatData;
                                ctx.session.wechat.nickname = userInfo.nickname;
                                ctx.session.wechat.headimgurl = userInfo.headimgurl;
                            } else {
                                ctx.redirect(redirect);
                                return;
                            }
                        } else {
                            ctx.redirect(redirect);
                            return;
                        }
                    } catch(error) {
                        console.log(error);
                        return;
                    }
                }
            }
        }
        // 给予openid换取userid
        const { openid } = ctx.session.wechat;
        try {
            // 检测是否有账户存在
            const responseData = await commonModel.openidCheck(openid);
            if (responseData.code === 10000) {
                if (responseData.returnData.subCode === 10000) {
                    ctx.session.user = {
                        userId: responseData.returnData.data.id,
                        cellphone: responseData.returnData.data.cellphone,
                        client: 'wechat'
                    };
                    // ctx.session.user.userId = responseData.returnData.data.id;
                    // 关闭商城入口
                    // 2018.01.29  又开启了商城入口
                    // if (requestUrl.pathname === '/login/' || requestUrl.pathname === '/mall/') {
                    //     ctx.redirect(hostname + '/system/');
                    //     return;
                    // }
                    if (requestUrl.pathname === '/login/') {
                        ctx.redirect(hostname + '/system/');
                        return;
                    }
                } else {
                    if (responseData.returnData.subCode === 20005) {
                    // 账户不存在的错误码
                        if (requestUrl.pathname === '/system/' || requestUrl.pathname === '/mall/') {
                            ctx.redirect(hostname + '/login/');
                            return;
                        }
                    } else {
                        ctx.body = responseData.returnData.subMessage;
                        return;
                    }
                }
            }
        } catch(error) {
            console.log(error);
            return;
        }
    }

    await next();
});

// 微信开发调试
// if (process.env.NODE_ENV === 'development') {
//     console.log('wechat dev');
//     app.use(async (ctx, next) => {
//         const requestUrl = url.parse(ctx.request.url, true);
//         const wechatReg = /^\/((system|mall|login)\/|vendors|chunks)/;
//         const typeReg = /\.(\w*)$/;
//         if (wechatReg.test(requestUrl.pathname) === true) {
//             const params = qs.stringify(requestUrl.query);
//             const httpRequestParams = new NewRequestParams({
//                 json: false
//             });
//             httpRequestParams.headers = {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             };
//             httpRequestParams.baseUrl = 'http://localhost:8000';
//             httpRequestParams.uri = requestUrl.pathname + '?' + params;

//             if (typeReg.test(requestUrl.pathname) === true) {
//                 ctx.type = RegExp.$1;
//             }

//             ctx.body = await request(httpRequestParams);
//         } else {
//             await next();
//         }
//     });
// }

// views
// 取消默认index
app.use(serve('./views', {
    index: 'NoIndex'
}));

app.use(async (ctx, next) => {
    // 请求，拦截检测session，过期直接返回session过期码，让页面跳转
    const requestUrl = url.parse(ctx.request.url, true);
    const systemReg = /^\/system\//;
    const mallReg = /^\/mall\//;
    const loginReg = /^\/login\//;
    const manageSystemReg = /^\/manageSystem/;
    const manageSystemIndexReg = /^\/manageSystem(\/)?$/;
    const manageSystemLoginReg = /^\/manageSystem\/login/;
    const manageSystemBlankReg = /^\/manageSystem\/blank/;
    const manageSystemApiReg = /^\/api\/manageSystem/;
    const manageSystemLoginApiReg = /^\/api\/manageSystem\/login/;
    const apiReg = /^\/api/;
    const loginApiReg = /^\/api\/login/;
    const systemApiReg = /^\/api\/system/;
    const mallApiReg = /^\/api\/mall/;
    const commonReg = /^\/api\/common/;
    const testApiReg = /^\/api\/test/;
    console.log(ctx.request.headers);
    if (manageSystemApiReg.test(requestUrl.pathname) === true) {
        // 检测session，若session不存在或过期则返回过期码
        if (manageSystemLoginApiReg.test(requestUrl.pathname) === false) {
            if (Object.prototype.hasOwnProperty.call(ctx.session, 'manager') === false) {
                const returnData = {
                    code: 'E0004',
                    message: '登录已超时，请重新登录！'
                };
                ctx.body = returnData;
                return;
            }
        }
    } else if (systemApiReg.test(requestUrl.pathname) === true || mallApiReg.test(requestUrl.pathname) === true) {
        if (Object.prototype.hasOwnProperty.call(ctx.session, 'user') === false) {
            const returnData = {
                code: 'E0004',
                message: '登录已超时，请重新登录！'
            };
            ctx.body = returnData;
            return;
        } else {
            commonModel.userLoginLog(ctx.session.user.userId);
        }
    } else if (manageSystemReg.test(requestUrl.pathname) === true) {
        if (ctx.status === 404) {
            // 前端url route history模式
            ctx.type = 'html';
            ctx.body = require('fs').createReadStream(__dirname + '/views/manageSystem/index.html');
            // 通过url进入，进行拦截
            if (Object.prototype.hasOwnProperty.call(ctx.session, 'manager') === false) {
                // 如果不在login，跳转login
                if (manageSystemLoginReg.test(requestUrl.pathname) === false) {
                    // 跳转login
                    ctx.redirect(manageSystemHostname + '/manageSystem/login');
                    return;
                }
            } else {
                // 检测parkId
                if (Object.prototype.hasOwnProperty.call(ctx.session.manager, 'defaultParkId') === false) {
                    // 如果不在空白页，则跳转空白页
                    if (manageSystemBlankReg.test(requestUrl.pathname) === false) {
                        // 跳转空白页
                        ctx.redirect(manageSystemHostname + '/manageSystem/blank');
                        return;
                    }
                } else {
                    // 如果在空白页，则跳转首页
                    if (manageSystemBlankReg.test(requestUrl.pathname) === true || manageSystemIndexReg.test(requestUrl.pathname) === true) {
                        // 跳转首页
                        ctx.redirect(manageSystemHostname + '/manageSystem/index');
                        return;
                    }
                }
            }
            return;
        }
    } else if (systemReg.test(requestUrl.pathname) === true) {
        if (ctx.status === 404) {
            // 前端url route history模式
            ctx.type = 'html';
            ctx.body = require('fs').createReadStream(__dirname + '/views/system/index.html');
            return;
        }
    } else if (mallReg.test(requestUrl.pathname) === true) {
        // 关闭商城入口
        // 2018.01.29  又开启了商城入口
        if (ctx.status === 404) {
            // 前端url route history模式
            ctx.type = 'html';
            ctx.body = require('fs').createReadStream(__dirname + '/views/mall/index.html');
            return;
        }
        // ctx.redirect(hostname + '/system/');
    } else if (loginReg.test(requestUrl.pathname) === true) {
        if (ctx.status === 404) {
            // 前端url route history模式
            ctx.type = 'html';
            ctx.body = require('fs').createReadStream(__dirname + '/views/login/index.html');
            return;
        }
    }

    await next();
});
  
app
    .use(router.routes())
    .use(router.allowedMethods());

// 错误处理
app.on('error', (err,ctx) => {
    const requestUrl = url.parse(ctx.request.url, true);
    const apiReg = /^\/api/;
    if (apiReg.test(requestUrl.pathname) === true) {
        ctx.body = `{
            code: 'E0005',
            message: 'Something Wrong'
        }`;
    }
    console.log(err);
});

app.listen(env === 'production' ? 18800 : 18801);
console.log('zdWechat start');