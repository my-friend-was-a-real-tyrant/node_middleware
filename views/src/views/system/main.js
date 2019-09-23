import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import router from './routers';
import App from './App';
import Axios from 'axios';
import adjust from 'publicSource/adjust'; // 移动端适应
import Message from 'publicComponents/message/message.js';
import hostnameObj from 'publicSource/hostname';
import Calendar from 'vue2-datepick';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
const hostname = hostnameObj.hostname;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(Calendar);
Axios.interceptors.response.use((res) => {
    if (res.data.code !== '00000') {
        // if (Object.prototype.hasOwnProperty.call(res.config, 'baseURL') === true) {
        if (res.config.url.indexOf('/v1/file') !== -1) {
            if (res.data.code !== 10000) {
                alert(res.data.message);
            } else if (res.data.returnData.subCode !== 10000) {
                alert(res.data.returnData.subMessage);
            }
        } else {
            if (res.config.url.indexOf("getMerchandisePeice") === -1) {
                alert(res.data.message);
            }
        }
    }
    if (res.data.code === 'E0004') {
        window.location.href = hostname + '/login/';
    }
    return res;
});
Vue.prototype.$http = Axios;
Vue.prototype.$message = Message;

Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = binding.value;
    }
});


const route = new VueRouter({
    routes: router,
    base: __dirname,
    mode: 'hash'
});

// ....
// ..发送请求，获取身份、默认园区id/name、姓名、是否代理人以及微信部分的头像与昵称
// ....
Axios({
    url: '/api/system/getInitInfo'
}).then((response) => {
    if (response.data.code === '00000') {
        // this.$store.commit('stateChange', response.data);
        const store = new Vuex.Store({
            state: {
                isVisitor: response.data.isVisitor,
                info: {
                    identity: response.data.isVisitor ? '' : response
                        .data.info.identity,
                    defaultAddressId: response.data.isVisitor ?
                        '' : response.data.info.defaultAddressId,
                    defaultAddressName: response.data.isVisitor ?
                        '' : response.data.info.defaultAddressName,
                    defaultParkId: response.data.isVisitor ? '' : response
                        .data.info.defaultParkId,
                    userName: response.data.isVisitor ? '' : response
                        .data.info.userName,
                    cellphone: response.data.isVisitor ? '' : response
                        .data.info.cellphone,
                    isAgent: response.data.isVisitor ? '' : response
                        .data.info.isAgent,
                    avatar: response.data.isVisitor ? '' : response
                        .data.info.avatar,
                    realAvatar: response.data.isVisitor ? '' : response
                        .data.info.realAvatar,
                    sex: response.data.isVisitor ? '' : response
                        .data.info.sex,
                    birthday: response.data.isVisitor ? '' : response
                        .data.info.birthday,
                }
            },
            mutations: {
                defaultAddressChange(state, object) {
                    state.info.identity = object.identity;
                    state.info.defaultAddressId = object.defaultAddressId;
                    state.info.defaultAddressName = object.defaultAddressName;
                    state.info.isAgent = object.isAgent;
                },
                editPersonalInfo(state, object) {
                    state.info.avatar = object.avatar;
                    state.info.realAvatar = object.realAvatar;
                    state.info.sex = object.sex;
                    state.info.birthday = object.birthday;
                }
            }
        });
        new Vue({
            store,
            router: route,
            render: h => h(App)
        }).$mount('#app');
    }
}).catch((response) => {});

adjust(720);
window.onresize = () => { //当网页宽度发生变化时触发函数
    adjust(720);
}
