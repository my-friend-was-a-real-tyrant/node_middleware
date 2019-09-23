const Redis = require("ioredis");
const { Store } = require("koa-session2");
const env = process.env.NODE_ENV;

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis({
            porrt: 6379,
            host: env === 'development' ? '116.62.168.88' : '127.0.0.1',
            db: 3
        });
    }

    async get(sid) {
        let data = await this.redis.get(`SESSION:${sid}`);
        if (data == null) {
            const keysArr = await this.redis.keys(`*${sid}`);
            data = await this.redis.get(keysArr[0]);
        }
        return JSON.parse(data);
    }

    async set(session, { sid =  this.getID(24), maxAge = 604800000 } = {}) {
        try {
            if (session == null) {
                const sessionArr = await this.redis.keys(`*${sid}`);
                if (sessionArr.length > 0) {
                    await this.redis.set(sessionArr[0], JSON.stringify(session), 'EX', maxAge / 1000);
                }
            } else {
                if (Object.prototype.hasOwnProperty.call(session, 'user') === true) {
                    if (Object.prototype.hasOwnProperty.call(session.user, 'clear') === true) {
                        // 如果有clear属性，则删除所有该userid的session
                        const appUserSessionArr = await this.redis.keys(`SESSION-${session.user.userId}-APP:*`);
                        for (let i = 0; i < appUserSessionArr.length; i ++) {
                            // 循环删除所有key
                            await this.redis.del(appUserSessionArr[i]);
                        }
                        const wechatUserSessionArr = await this.redis.keys(`SESSION-${session.user.userId}-WECHAT:*`);
                        for (let i = 0; i < wechatUserSessionArr.length; i ++) {
                            // 循环删除所有key
                            await this.redis.del(wechatUserSessionArr[i]);
                        }
                    } else {
                        // 并非清除该用户所有session功能
                        // 通过client判断是app还是微信
                        // 如果是app，先清除所有SESSION-userId-APP开头的session，再将该session储存下来
                        // 监测是否有SESSION-userId:sid开头的key
                        if (session.user.client === 'app') {
                            const userSessionArr = await this.redis.keys(`SESSION-${session.user.userId}-APP:${sid}`);
                            // 如果有  设置这个key
                            if (userSessionArr.length > 0) {
                                await this.redis.set(userSessionArr[0], JSON.stringify(session), 'EX', maxAge / 1000);
                            } else {
                                // 将其他用户踢下线
                                const currentAppUserSession = await this.redis.keys(`SESSION-${session.user.userId}-APP:*`);
                                for (let i = 0; i < currentAppUserSession.length; i ++) {
                                    // 循环删除所有key
                                    await this.redis.del(currentAppUserSession[i]);
                                }
                                await this.redis.set(`SESSION-${session.user.userId}-APP:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
                            }
                        } else {
                            const userSessionArr = await this.redis.keys(`SESSION-${session.user.userId}-WECHAT:${sid}`);
                            // 如果有  设置这个key
                            if (userSessionArr.length > 0) {
                                await this.redis.set(userSessionArr[0], JSON.stringify(session), 'EX', maxAge / 1000);
                            } else {
                                // 没有的话  再监测有没有SESSION:sid的key
                                const currentUserSessionArr = await this.redis.keys(`SESSION:${sid}`);
                                if (currentUserSessionArr.length > 0) {
                                    // 如果有  设置这个key  并重命名
                                    await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
                                    await this.redis.rename(`SESSION:${sid}`, `SESSION-${session.user.userId}-WECHAT:${sid}`);
                                } else {
                                    // 没有的话  新建key
                                    await this.redis.set(`SESSION-${session.user.userId}-WECHAT:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
                                }
                            }
                        }
                    }
                } else if (Object.prototype.hasOwnProperty.call(session, 'manager') === true) {
                    // 判断是app还是web登录
                    if (session.manager.client === 'app') {
                        const managerSessionArr = await this.redis.keys(`SESSION-${session.manager.accountId}-APP-M:${sid}`);
                        // 如果有  设置这个key
                        if (managerSessionArr.length > 0) {
                            await this.redis.set(managerSessionArr[0], JSON.stringify(session), 'EX', maxAge / 1000);
                        } else {
                            // 将其他用户踢下线
                            const currentAppManagerSession = await this.redis.keys(`SESSION-${session.manager.accountId}-APP-M:*`);
                            for (let i = 0; i < currentAppManagerSession.length; i ++) {
                                // 循环删除所有key
                                await this.redis.del(currentAppManagerSession[i]);
                            }
                            await this.redis.set(`SESSION-${session.manager.accountId}-APP-M:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
                        }
                    } else {
                        const managerSessionArr = await this.redis.keys(`SESSION-${session.manager.accountId}-WEB-M:${sid}`);
                        // 如果有  设置这个key
                        if (managerSessionArr.length > 0) {
                            await this.redis.set(managerSessionArr[0], JSON.stringify(session), 'EX', maxAge / 1000);
                        } else {
                            await this.redis.set(`SESSION-${session.manager.accountId}-WEB-M:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
                        }
                    }
                } else {
                    await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
                }
            }
            // Use redis set EX to automatically drop expired sessions
        } catch (e) {
            console.log(e);
        }
        return sid;
    }

    async destroy(sid) {
        let data = await this.redis.get(`SESSION:${sid}`);
        if (data == null) {
            const keysArr = await this.redis.keys(`*${sid}`);
            return await this.redis.del(keysArr[0]);
        } else {
            return await this.redis.del(`SESSION:${sid}`);
        }
    }
}

module.exports = RedisStore;