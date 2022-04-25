import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/user/helloHome'
        },
        {
            path: '/admin/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/admin/Home.vue'),
            meta: {title: '管理员首页'},
            children: [
                {
                    path: '/admin/dashboard',
                    component: () => import( '../components/page/admin/Dashboard.vue'),
                    meta: {title: '系统首页'}
                },  {
                    path: '/admin/Scrolltofigure',
                    component: () => import( '../components/page/admin/Scrolltofigure.vue'),
                    meta: {title: '轮播图管理'}
                }, {
                    path: '/admin/userselect',
                    component: () => import( '../components/page/admin/Userselect.vue'),
                    meta: {title: '用户信息'}
                }, {
                    path: '/admin/adminselect',
                    component: () => import( '../components/page/admin/Adminselect.vue'),
                    meta: {title: '管理员信息'}
                }, 
                // {
                //     path: '/admin/useraudit',
                //     component: () => import( '../components/page/admin/Useraudit.vue'),
                //     meta: {title: '身份审核'}
                // }, 
                {
                    path: '/admin/consultant_type',
                    component: () => import( '../components/page/admin/Conslttype.vue'),
                    meta: {title: '咨询方向'}
                }, {
                    path: '/admin/consultant_details',
                    component: () => import( '../components/page/admin/Consltdetails.vue'),
                    meta: {title: '商品信息'}
                }, {
                    path: '/admin/useraudit',
                    component: () => import( '../components/page/admin/Useraudit.vue'),
                    meta: {title: '咨询师审核'}
                }, {
                    path: '/admin/ordersdetails',
                    component: () => import( '../components/page/admin/Ordersinfo.vue'),
                    meta: {title: '订单信息'}
                }, {
                    path: '/admin/commentsdetails',
                    component: () => import( '../components/page/admin/Comments.vue'),
                    meta: {title: '评论管理'}
                }, {
                    path: '/admin/pushcomplaints',
                    component: () => import( '../components/page/admin/Complaint.vue'),
                    meta: {title: '投诉管理'}
                }, {
                    path: '/admin/pullcomplaints',
                    component: () => import( '../components/page/admin/Appeal.vue'),
                    meta: {title: '申诉管理'}
                }, {
                    path: '/admin/log',
                    component: () => import( '../components/page/admin/Log.vue'),
                    meta: {title: '系统日志'}
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/admin/Icon.vue'),
                    meta: {title: '自定义图标'}
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/admin/BaseTable.vue'),
                    meta: {title: '基础表格'}
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/admin/Tabs.vue'),
                    meta: {title: 'tab选项卡'}
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/admin/BaseForm.vue'),
                    meta: {title: '基本表单'}
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/admin/VueEditor.vue'),
                    meta: {title: '富文本编辑器'}
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/admin/Markdown.vue'),
                    meta: {title: 'markdown编辑器'}
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/admin/Upload.vue'),
                    meta: {title: '文件上传'}
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/admin/BaseCharts.vue'),
                    meta: {title: 'schart图表'}
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/admin/DragList.vue'),
                    meta: {title: '拖拽列表'}
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/admin/DragDialog.vue'),
                    meta: {title: '拖拽弹框'}
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/admin/I18n.vue'),
                    meta: {title: '国际化'}
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/admin/Permission.vue'),
                    meta: {title: '权限测试', permission: true}
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/admin/404.vue'),
                    meta: {title: '404'}
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/admin/403.vue'),
                    meta: {title: '403'}
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/admin/Donate.vue'),
                    meta: {title: '支持作者'}
                },
                {
                    path: '/admin/login',
                    component: () => import(/* webpackChunkName: "login" */ '../components/page/admin/Login.vue'),
                    meta: {title: '登录'}
                },
                {
                    path: '/admin/*',
                    redirect: '/404'
                }
            ]
        }, 
        {
            path: '/user/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/user/Home.vue'),
            meta: {title: '用户首页'},
            children: [
                {
                    path: '/user/helloHome',
                    component: () => import( '../components/page/user/Index.vue'),
                    meta: {title: '首页'}
                },
                {
                    path: '/consultant/consultantDesc',
                    component: () => import( '../components/page/user/ConsultantDesc.vue'),
                    meta: {title: '咨询师详情'}
                },
                // {
                //     path: '/user/collection',
                //     component: () => import( '../components/page/user/Collection.vue'),
                //     meta: {title: '购物车'}
                // },
                {
                    path: '/user/collection',
                    component: () => import( '../components/page/user/Collection.vue'),
                    meta: {title: '我的收藏'}
                },
                {
                    path: '/user/bookInfo',
                    component: () => import( '../components/page/user/BookInfo.vue'),
                    meta: {title: '我的订单'}
                },
                {
                    path: '/user/myOrders',
                    component: () => import( '../components/page/user/MyOrders.vue'),
                    meta: {title: '我的订单'}
                },
                {
                    path: '/user/makeSureOrder',
                    component: () => import( '../components/page/user/MakeSureOrder.vue'),
                    meta: {title: '确认订单'}
                },
                {
                    path: '/user/orderDetail',
                    component: () => import( '../components/page/user/OrderDetail.vue'),
                    meta: {title: '提交订单'}
                },
                {
                    path: '/user/userInfo',
                    component: () => import( '../components/page/user/UserInfo.vue'),
                    meta: {title: '个人信息'}
                },
                {
                    path: '/user/consltUserInfo',
                    component: () => import( '../components/page/user/ConsltUserInfo.vue'),
                    meta: {title: '个人信息'}
                },
                {
                    path: '/user/addressMag',
                    component: () => import( '../components/page/user/AddressMag.vue'),
                    meta: {title: '地址管理'}
                },
                {
                    path: '/user/selectResult',
                    component: () => import( '../components/page/user/SelectResult.vue'),
                    meta: {title: '全部商品'}
                },
                {
                    path: '/user/SelectZiYingResult',
                    component: () => import( '../components/page/user/SelectZiYingResult.vue'),
                    meta: {title: '网站自营商品'}
                },
                {
                    path: '/user/consltInfo',
                    component: () => import( '../components/page/user/ConsltInfo.vue'),
                    meta: {title: '商家中心'}
                },
                {
                    path: '/user/selectkindTemp',
                    component: () => import( '../components/page/user/SelectKindTemp.vue'),
                    meta: {title: '连接中转'}
                },
                {
                    path: '/user/selectGoodsTemp',
                    component: () => import( '../components/page/user/SelectGoodsTemp.vue'),
                    meta: {title: '商品中转'}
                },
                {
                    path: '/user/selectTemp',
                    component: () => import( '../components/page/user/SelectTemp.vue'),
                    meta: {title: '查询中转'}
                },
                {
                    path: '/user/UserShow',
                    component: () => import( '../components/page/user/UserShow.vue'),
                    meta: {title: '商家主页'}
                },
                {
                    path: '/user/about',
                    component: () => import( '../components/page/user/About.vue'),
                    meta: {title: '关于我们'}
                },
                {
                    path: '/user/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/user/404.vue'),
                    meta: {title: '404'}
                },
                {
                    path: '/user/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/user/403.vue'),
                    meta: {title: '403'}
                },
                {
                    path: '/user/*',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/user/403.vue'),
                    meta: {title: '404'}
                }
            ]
        },
        {
            path: '/chatlogin',
            name: 'ChatLogin',
            component: () => import('../components/page/chat/Login.vue'),
            meta: {title: '聊天室登录'},
            hidden:true
        },
        {
            path:'/chatroom',
            name:'ChatRoom',
            component: () => import('../components/page/chat/ChatRoom.vue'),
            meta: {title: '咨询聊天室'},
            hidden:true
        },
        {
            path: '/adminlogin',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/admin/Login.vue'),
            meta: {title: '登录'}
        },
        {
            path: '/userlogin',
            // component: () => import(/* webpackChunkName: "login" */ '../components/page/user/Login.vue'),
            component: () => import('../components/page/chat/Login.vue'),
            meta: {title: '用户登录'}
        },
        {
            path: '/userregister',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/user/Register.vue'),
            meta: {title: '用户注册'}
        },
        {
            path: '/repwd',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/user/Repwd.vue'),
            meta: {title: '找回密码'}
        },
        {
            path: '*',
            redirect: '/user/404'
        }
    ]
});
