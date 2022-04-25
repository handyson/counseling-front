import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {messages} from './components/common/admin/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/admin/directives';
import 'babel-polyfill';

import axios from 'axios';

/* 
聊天室
*/
import store from './store/index';
import 'font-awesome/css/font-awesome.min.css'
// 封装请求方法,供全局调用
import {postKeyValueRequest} from "./utils/api";
import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";

Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.prototype.postRequest=postRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;
// 音视频
import {createTrtcCalling} from "./utils/trtc";
import TRTCCalling from 'trtc-calling-js';
Vue.prototype.$trtcCalling = createTrtcCalling();
Vue.prototype.TrtcCalling = TRTCCalling;



Vue.prototype.$axios = axios

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});


/**
 * 获取当前时间
 * 格式YYYY-MM-DD
 */
Vue.prototype.getNowFormatDate = function () {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate+ " " + date.getHours() + ":" + date.getMinutes()+":"+date.getSeconds();
};


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    //适用后台
    if (from.fullPath.indexOf('/admin/') >= 0) {
        document.title = `${to.meta.title} | 大白心理咨询后台管理`;
        const role = localStorage.getItem('manage_name');
        if (!role && to.path !== '/adminlogin') {
            next('/adminlogin');
        } else if (to.meta.permission) {
            // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
            role === 'admin' ? next() : next('/403');
        }
    }
    //适用前台
    else {
        document.title = `${to.meta.title} | 大白心理咨询`;
    }
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
        Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
            confirmButtonText: '确定'
        });
    } else {
        next();
    }
});


new Vue({
    router,
    i18n,
    store,  //这里需要注意
    render: h => h(App)
}).$mount('#app');
