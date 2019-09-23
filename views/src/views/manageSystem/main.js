import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import router from './routers';
import App from './App';
import Axios from 'axios';
import Echarts from 'echarts';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);

Vue.config.silent = false;
Vue.config.devtools = true;

Vue.prototype.$http = Axios;
Vue.prototype.$echarts = Echarts;


let loading = 0;
Axios.interceptors.request.use((request) => {
    loading ++;
    let loadingInstance = Vue.prototype.$loading({
        fullscreen: true,
        body: true,
        lock: true
    }); // 请求之前loading显示
    return request;
});

Axios.interceptors.response.use((response) => {
    loading --;
    if (loading === 0) {
        let loadingInstance = Vue.prototype.$loading({
            fullscreen: true,
            body: true,
            lock: true
        }); // 为了获取loading实例
        loadingInstance.close();
    }
    if (response.data.code !== '00000') {
        if (response.config.url === '/v1/file') {
            if (response.data.code !== 10000) {
                alert(response.data.message);
            } else if (response.data.returnData.subCode !== 10000) {
                alert(response.data.returnData.subMessage);
            }
        } else if (response.data.code === 'E0004') {
            route.push('/manageSystem/login');
        } else {
            if (Object.prototype.hasOwnProperty.call(response.config, 'baseURL') === true) {
                if (response.data.code !== 10000) {
                    Vue.prototype.$alert(response.data.message, '提示', {
                        confirmButtonText: '确定'
                    });
                } else if (response.data.returnData.subCode !== 10000) {
                    Vue.prototype.$alert(response.data.returnData.subMessage, '提示', {
                        confirmButtonText: '确定'
                    });
                }
            } else {
                Vue.prototype.$alert(response.data.message, '提示', {
                    confirmButtonText: '确定'
                });
            }
        }
    }
    return response;
});

// vuex 存储权限，姓名，园区id，园区名
const store = new Vuex.Store({
    state: {
        isSuper: false,
        isParkManager: false,
        isSecondary:false,
        info: {
            userName: '',
            userCellphone: '',
            parkName: ''
        },
        permissions: []
    },
    mutations: {
        userInfoInit(state, object) {
            state.info.userName = object.userName;
            state.info.userCellphone = object.userCellphone;
            state.info.parkName = object.defaultParkName;
            state.isParkManager = object.isParkManager;
            state.isSuper = object.isSuper;
            state.isSecondary = object.isSecondary;
            state.permissions = object.permissions;
        },
        choosePark(state, object) {
            state.info.parkName = object.parkName;
            state.permissions = object.permissions;
        }
    },
    actions: {
        checkSession({ commit }) {
            return (Axios({
                url: '/api/manageSystem/system/checkSession'
            }));
        }
    }
});

router[0].beforeEnter = (to, from, next) => {
    store.dispatch('checkSession').then((response) => {
        store.commit('userInfoInit', response.data);
        // 通用页面直接允许通过
        if (to.meta.permission === 0) {
            next();
            return;
        }
        // 判断是否超级管理员
        if (store.state.isSuper === true) {
            next();
            return;
        }
        // 判断是否是次级管理员
        if (store.state.isSecondary === true) {
            next()
            return;
        }
        // 判断是否项目经理
        if (store.state.isParkManager === true) {
            if (to.meta.permission !== -1) {
                next();
            } else {
                next('/manageSystem/index');
            }
            return;
        }
        // 遍历vuex中权限列表，判断是否与meta中的权限编号一致
        for (let i = 0; i < store.state.permissions.length; i ++) {
            if (to.meta.permission === 0) {
                next();
                return;
            }
            if (store.state.permissions[i] === to.meta.permission) {
                next();
                return;
            }
        }
        // 不一致则跳转首页
        next('/manageSystem/index');
        return;
    }).catch((response) => {
        console.log(response);
    })
}

// 自定义指令，按钮权限
Vue.directive('permit', {
    // 参数为按钮所需的权限编码code
    inserted(el, binding, vnode) {
        if (typeof binding.value !== 'number') {
            if (!store.state.isSuper && !store.state.isParkManager&&!store.state.isSecondary) {
                for (let i = 0; i < binding.value.length; i ++) {
                    for (let j = 0; j < store.state.permissions.length; i ++) {
                        if (store.state.permissions[j] === binding.value[i]) {
                            return;
                        }
                    }
                }
                el.parentNode.removeChild(el);
            }
        } else {
            if (binding.value === -1) {
                // 超级管理员专属功能
                if (!store.state.isSuper||!store.state.isSecondary) {
                    el.parentNode.removeChild(el);
                }
            } else {
                if (!store.state.isSuper && !store.state.isParkManager&&!store.state.isSecondary) {
                    // 遍历vuex中权限列表，判断是否存在与value一致的权限编号
                    for (let i = 0; i < store.state.permissions.length; i ++) {
                        if (store.state.permissions[i] === binding.value) {
                            return;
                        }
                    }
                    el.parentNode.removeChild(el);
                }
            }
        }
    }
});

const route = new VueRouter({
    routes: router,
    base: __dirname,
    mode: 'history'
});

new Vue({
    store,
    router: route,
    render: h => h(App)
}).$mount('#app');

