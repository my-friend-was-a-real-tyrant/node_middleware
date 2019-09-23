const env = process.env.NODE_ENV;

export default {
    hostname: env === 'development' ? 'http://localhost:8000' : 
        env === 'test' ? 'http://test.zhongdapuhui.com' : 'https://node.zhongdapuhui.com'
};