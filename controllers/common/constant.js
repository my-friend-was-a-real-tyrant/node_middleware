const env = process.env.NODE_ENV;

module.exports = {
    serverHostname: env === 'development' ? 'http://192.168.100.49:16130' : 
        env === 'test' ? 'http://system-test.zhongdapuhui.com' : 'http://system.zhongdapuhui.com'
};