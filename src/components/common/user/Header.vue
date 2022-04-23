<template>
    <div class="header" id="top">
        <div style="float: left">
            <!-- left: auto; -->
            <el-menu
                mode="horizontal"
                style="background-color: #f6f6f6; left: 15%; margin-top: 10px; width: 1340px"
                active-text-color="#409eff"
                router
            >
                <!-- 前往主页按钮 -->
                <!-- <el-menu-item> style="color: #f2f8fe" -->

                <div class="logo">
                    <router-link to="/user/helloHome">
                        <!-- <div class="collapse-btn">
                                <i class="el-icon-s-home"></i>
                                style="position: absolute;left: 12%;"
                            </div> -->
                        <img style="height: 50px; margin-top: 5px; left: 8%" src="../../../assets/img/logo.png" />
                    </router-link>
                </div>

                <!-- </el-menu-item> -->
                <el-menu-item class="el-menu-demo-item" index="/user/helloHome" style="font-size: 18px">首页 </el-menu-item>
                <el-menu-item class="el-menu-demo-item" style="font-size: 18px" index="/user/SelectResult">
                    <!-- @click="tocounsell()"  -->
                    <div style="height: 70px; width: 60px">心理咨询</div>
                </el-menu-item>
                <el-menu-item class="el-menu-demo-item" style="font-size: 18px" index="/user/SelectZiYingResult">
                    <div style="height: 70px; width: 60px" @mouseenter="mouseenter2" @mouseleave="mouseleave2">心理问答</div>
                </el-menu-item>
                <!--                <el-menu-item class="el-menu-demo-item" style="font-size: 16px" index="/user/selectResult?kind=1002">-->
                <!--                    <div @mouseenter="mouseenter1" @mouseleave="mouseleave1">知识变现</div>-->
                <!--                </el-menu-item>-->
                <el-menu-item class="el-menu-demo-item" style="font-size: 18px" index="/user/about">关于我们</el-menu-item>

                <!-- <div class="so" style="display: inline-block; margin-top: 1%; margin-left: 120px">
                    <el-input
                        placeholder="请输入搜索内容"
                        v-model="searchkey"
                        style="font-size: 18px"
                        size="large"
                        @keyup.enter.native="searchClick"
                    >
                        <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
                    </el-input>
                </div> -->

                <div class="header-right">
                    <div class="header-user-con" v-if="username === '_nouser'">
                        <div class="topbar">
                            <el-button type="primary" size="medium" @click="ToLogin">登录 / 注册</el-button>
                            <!-- <div class="nav"> -->
                            <ul>
                                <li>
                                    <!-- <a href="/#/userlogin">
                                        <el-button type="text">登录</el-button>
                                    </a>
                                    <span class="sep">|</span>
                                    <a href="/#/userregister">
                                        <el-button type="text">注册</el-button>
                                    </a> 
                                    <span class="sep">|</span>-->
                                    <a href="#/adminlogin">
                                        <el-button type="text">管理员后台</el-button>
                                    </a>
                                </li>
                            </ul>
                            <!-- </div> -->
                        </div>
                    </div>
                    <div class="header-user-con" v-else>
                        <!--                <div class="btn-bell">-->
                        <!--                    <el-tooltip effect="dark" content="我的购物车" placement="bottom">-->
                        <!--                        <router-link to="/user/carts">-->
                        <!--                            <i class="el-icon-shopping-cart-2" style="color: #F2F8FE;"></i>-->
                        <!--                        </router-link>-->
                        <!--                    </el-tooltip>-->
                        <!--                </div>-->
                        <!-- 我的收藏 -->

                        <router-link to="/user/consltInfo" v-if="userform.roleType == '1'">
                            <i class="el-icon-monitor" style="color: #2c1d0f; font-size: 16px">商家服务</i>
                            <span style="color: #2c1d0f"> | </span>
                        </router-link>
                        <router-link to="/user/collection">
                            <i class="el-icon-star-on" style="color: #2c1d0f; font-size: 16px">我的收藏</i>
                        </router-link>
                        <!-- 用户头像 -->
                        <div class="user-avator">
                            <img :src="usericon2" />
                        </div>

                        <!-- 用户名下拉菜单 -->
                        <el-dropdown class="user-name" @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{ userform.username }}
                                <i class="el-icon-caret-bottom"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <router-link to="/user/myOrders">
                                    <el-dropdown-item>我的订单</el-dropdown-item>
                                </router-link>
                                <router-link to="/user/userInfo">
                                    <el-dropdown-item>个人中心</el-dropdown-item>
                                </router-link>
                                <!--                        <router-link to="/user/addressMag">-->
                                <!--                            <el-dropdown-item>地址管理</el-dropdown-item>-->
                                <!--                        </router-link>-->
                                <!-- <a href="https://github.com/zengxiaochao/hello-mall">
                            <el-dropdown-item>Git仓库</el-dropdown-item>
                        </a> -->
                                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <!-- 上方导航弹窗 -->
            </el-menu>
            <!--            商品种类弹窗-->
            <!-- <div style="height: 200px;width: 100%;background-color: #d0e5e8;position: absolute;z-index: 9999;"
                 @mouseenter="mouseenter1" @mouseleave="mouseleave1" v-show="this.topmsg">
                <div style="float:left;width: 15%;margin-top: 30px;"></div>
                <div style="float:left;width: 10%;margin-top: 30px;text-align: center;"
                     v-for="(item, index) in typelist" :key="item.id" v-if="index<=5">
                    <a @click="kindClick(item.kid)" target="_blank">
                        <div class="figure figure-thumb">
                            <img :src="item.kimg" style="border-radius: 20px;"
                                 alt="" width="160px" height="110px">
                        </div>
                        <div class="title" style="margin-top: 15px;font-size: 12px;color: #666666;">{{item.kname}}</div>-->
            <!--                        <p class="price" style="margin-top:5px;font-size: 12px;color: #fc0d5a">1999元起</p>-->
            <!-- </a>
                </div>
                <div style="float:left;width: 10%;margin-top: 30px;text-align: center;">
                    <a href="/#/user/selectResult?kind=" target="_blank">
                        <div class="title" style="margin-top: 65px;font-size: 20px;color: #666666;">查看全部 <i
                                class="el-icon-lx-right"></i>
                        </div>
                    </a>
                </div>
            </div>   -->
            <!--平台自营-->
            <!-- <div style="height: 200px;width: 100%;background-color: #d0e5e8;position: absolute;z-index: 9999;"
                 @mouseenter="mouseenter2" @mouseleave="mouseleave2" v-show="this.topmsg2">
                <div style="float:left;width: 15%;margin-top: 30px;"></div>
                <div style="float:left;width: 10%;margin-top: 30px;text-align: center;"
                     v-for="(item, index) in ziyinglist" :key="item.goodsid" v-if="index <= 5">
                    <a @click="goGoodsDesc(item.goodsid)" target="_blank">
                        <div class="figure figure-thumb">
                            <img :src="item.iconurl" style="border-radius: 20px;"
                                 alt="" width="160px" height="110px">
                        </div>
                        <div class="title" style="margin-top: 15px;font-size: 12px;color: #666666;">{{item.goodsname}}
                        </div> -->
            <!-- <p class="price" style="margin-top:5px;font-size: 12px;color: #fc0d5a">1999元起</p>
                    </a>
                </div>
                <div style="float:left;width: 10%;margin-top: 30px;text-align: center;">
                    <a href="/#/user/selectResult?kind=1001" target="_blank">
                        <div class="title" style="margin-top: 65px;font-size: 20px;color: #666666;">查看全部 <i
                                class="el-icon-lx-right"></i>
                        </div>
                    </a>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            ishow: false,
            topmsg: false,
            topmsg2: false,
            collapse: false,
            fullscreen: false,
            name: '_nouser',
            usericon: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2057588226,2402156864&fm=11&gp=0.jpg',
            searchkey: '',
            drawer: false,
            typelist: [],
            uid: '',
            userform: {},
            ziyinglist: []
        };
    },
    created() {
        // this.getTypeList();
        // this.getziyinglist();
        this.getUserData();
    },
    computed: {
        username() {
            let username = localStorage.getItem('user_name');
            return username ? username : this.name;
        },
        usericon2() {
            let usericon = localStorage.getItem('user_icon');
            return usericon ? usericon : this.usericon;
        }
    },
    methods: {
        getUserData() {
            this.uid = localStorage.getItem('user_id');
            if (this.uid != null) {
                this.$axios.get('/api/userInfo/selectOne?id=' + this.uid).then((res) => {
                    this.userform = res.data;
                });
            }
        },
        // getziyinglist() {
        //     axios.get('/api/goods/selectShowZiYing').then(res => {
        //         this.ziyinglist = res.data;
        //     }).catch(error => {
        //         console.log("自营商品接口请求异常");
        //     });
        // },
        getTypeList() {
            axios
                .get('/api/consultantType/selectAll')
                .then((res) => {
                    this.typelist = res.data;
                })
                .catch((error) => {
                    console.log('商品种类接口请求异常');
                });
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                // localStorage.removeItem('user_id');
                // localStorage.removeItem('user_name');
                // localStorage.removeItem('user');

                localStorage.clear();
                window.sessionStorage.clear();

                this.$router.push('/user/helloHome').catch((err) => {});
            }
        },
        mouseenter1() {
            this.topmsg = true;
        },
        mouseleave1() {
            this.topmsg = false;
        },
        mouseenter2() {
            this.topmsg2 = true;
        },
        mouseleave2() {
            this.topmsg2 = false;
        },
        tocounsell() {
            this.$router.push({
                path: '/user/SelectResult'
            });
        },
        searchClick() {
            this.$router.push({
                path: '/user/selectTemp',
                query: {
                    searchkey: this.searchkey
                }
            });
        }, //前往商品详情页
        goConsultantDesc(goods) {
            this.$router.push({
                path: '/user/selectGoodsTemp',
                query: {
                    goods: goods
                }
            });
        },
        goKindDesc(kind) {
            this.$router.push({
                path: '/user/selectResult',
                query: {
                    kind: kind
                }
            });
        },
        ToLogin(){
            this.$router.push('/userlogin');
        }
    },
    mounted() {}
};
</script>
<style scoped>
.header {
    /* margin-bottom: 20px; */
    /*position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;*/
    background-color: #fff;
    height: 80px;
}

.el-button--medium {
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 4px;
    margin-top: 6px;
}

.el-button--primary {
    color: #fff;
    background-color: #419ce5;
    border-color: #419ce5;
}

.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 40px;
}

.header .logo {
    float: left;
    width: 150px;
    /* line-height: 40px; */
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 60px;
    align-items: center;
}

.user-name {
    margin-left: 10px;
}

.user-avator {
    margin-left: 20px;
}

.user-avator img {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.el-dropdown-link {
    color: rgb(50, 44, 44);
    cursor: pointer;
}

/* 顶部导航栏CSS */
.topbar {
    height: 60px;
    margin-left: 50px;
    /* background-color: #3d3d3d; */
}

.topbar ul {
    float: right;
    list-style-type: none;
}

.topbar li {
    float: left;
    height: 60px;
    color: #b0b0b0;
    font-size: 19px;
    text-align: center;
    line-height: 50px;
    margin-left: 20px;
}

.topbar .sep {
    color: #b0b0b0;
    font-size: 18px;
    margin: 0 5px;
}

.topbar li .el-button {
    color: #0f0f0f;
    font-size: 18px;
}

.topbar .el-button:hover {
    color: rgb(119, 115, 115);
}

.topbar li a {
    color: #b0b0b0;
}

.topbar a:hover {
    color: rgb(50, 44, 44);
}

/* 
.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 40px;
    align-items: center;
}

.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}

.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}

.btn-bell .el-icon-bell {
    color: #fff;
}

.user-name {
    margin-left: 10px;
}

.user-avator {
    margin-left: 20px;
}

.user-avator img {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}*/

/* 顶部导航栏CSS */
/*.topbar {
    height: 40px;
    background-color: #3d3d3d;
}

.topbar .nav {
    width: 1225px;
    margin: 0 auto;
}

.topbar .nav ul {
    float: right;
    list-style-type: none;
}

.topbar .nav li {
    float: left;
    height: 40px;
    color: #b0b0b0;
    font-size: 19px;
    text-align: center;
    line-height: 40px;
    margin-left: 20px;
}

.topbar .nav .sep {
    color: #b0b0b0;
    font-size: 16px;
    margin: 0 5px;
}

.topbar .nav li .el-button {
    color: #b0b0b0;
    font-size: 16px;
}

.topbar .nav .el-button:hover {
    color: #fff;
}

.topbar .nav li a {
    color: #b0b0b0;
}

.topbar .nav a:hover {
    color: #fff;
}

.topbar .nav .shopCart {
    width: 120px;
    background: #424242;
}

.topbar .nav .shopCart:hover {
    background: #fff;
}

.topbar .nav .shopCart:hover a {
    color: #ff6700;
}

.topbar .nav .shopCart-full {
    width: 120px;
    background: #ff6700;
}

.topbar .nav .shopCart-full a {
    color: white;
} */

/* 顶部导航栏CSS END */
</style>
