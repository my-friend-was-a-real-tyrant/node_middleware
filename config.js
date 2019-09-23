const env = process.env.NODE_ENV;
const appid = env === 'test' ? 'wxfab3d76f5f01d9a9' : 'wxfdaec4cc6abbf72b'; // 测试号1
const appSecret = env === 'test' ? '36c850e4a79fd8cbed0045f90c0850e9' : '32861e7874eca2b1ce47c8029fdccb4f';
// const appid = 'wxfdaec4cc6abbf72b';
// const appSecret = '32861e7874eca2b1ce47c8029fdccb4f';
// const redirectUri = 'https%3A%2F%2Fnode.zhongdapuhui.com%2Flogin%2F';
const redirectUri = `http%3A%2F%2F${env === 'test' ? 'test' : 'node'}.zhongdapuhui.com%2Flogin%2F`;
const redirect = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
// const hostname = 'https://node.zhongdapuhui.com';
const hostname = env=== 'development' ? 'http://localhost:18801' : `http://${env === 'test' ? 'test' : 'node'}.zhongdapuhui.com`;
const manageSystemHostname = env=== 'development' ? 'http://localhost:18801' : `http://${env === 'test' ? 'test' : 'node'}.zhongdapuhui.com`;
// const manageSystemHostname = 'https://node.zhongdapuhui.com';

module.exports = {
    appid,
    appSecret,
    redirectUri,
    redirect,
    hostname,
    manageSystemHostname
}