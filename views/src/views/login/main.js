import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './routers';
import App from './App';
import Axios from 'axios';
import adjust from 'publicSource/adjust'; // 移动端适应
import Message from 'publicComponents/message/message.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'


Vue.use(VueRouter);
Vue.use(ElementUI);


Axios.interceptors.response.use((response) => {
    console.log(response);
    if (response.data.code !== '00000') {
        alert(response.data.message);
    }
    return response;
});
Vue.prototype.$http = Axios;
Vue.prototype.$message = Message;

Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = binding.value;
    }
});


const route = new VueRouter({
    routes: router,
    base: __dirname,
    mode: 'hash'
});

new Vue({
    router: route,
    render: h => h(App)
}).$mount('#app');

adjust(720);
window.onresize = () => { //当网页宽度发生变化时触发函数
    adjust(720);
}

