<template>
    <div class="header" id="top">
        <div>
            <!-- left: auto; -->
            <el-menu
                mode="horizontal"
                style="background-color: #f6f6f6; margin-top: 10px; width: 100%"
                active-text-color="#409eff"
                router
            >
                <!-- 前往主页按钮 -->
                <!-- <el-menu-item> style="color: #f2f8fe" -->

                <div class="logo">
                    <router-link to="/user/helloHome" style="display: block; width: 100%; height: 61px; text-align: center;">
                        <!-- <div class="collapse-btn">
                                <i class="el-icon-s-home"></i>
                                style="position: absolute;left: 12%;"
                            </div> -->
                        <img style="height: 50px; margin: 5px auto" src="../../../assets/img/logo.png" />
                    </router-link>
                </div>
                <el-menu-item class="el-menu-demo-item" index="/user/helloHome" style="font-size: 18px">首页 </el-menu-item>
                <el-menu-item class="el-menu-demo-item" style="font-size: 18px" index="/user/SelectResult">
                    <div>心理咨询</div>
                </el-menu-item>
                <el-menu-item class="el-menu-demo-item" style="font-size: 18px" index="/user/SelectZiYingResult">
                    <div @mouseenter="mouseenter2" @mouseleave="mouseleave2">心理问答</div>
                </el-menu-item>
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
                        <router-link to="/user/consltInfo" v-if="userform && userform.roleType == 1">
                            <i class="el-icon-monitor" style="color: #2c1d0f; font-size: 16px">咨询师服务中心</i>
                            <span style="color: #2c1d0f">&nbsp;|&nbsp;</span>
                        </router-link>
                        <router-link to="/chatroom">
                            <i class="el-icon-message-solid" style="color: #2c1d0f; font-size: 16px">消息</i>
                        </router-link>
                        <router-link to="/user/collection" v-if="userform && userform.roleType == 0">
                            <span style="color: #2c1d0f">&nbsp;|&nbsp;</span>
                            <i class="el-icon-star-on" style="color: #2c1d0f; font-size: 16px">我的收藏</i>
                        </router-link>
                        <!-- 用户头像 -->
                        <div class="user-avator">
                            <img :src="usericon2" />
                        </div>

                        <!-- 用户名下拉菜单 -->
                        <el-dropdown class="user-name" @command="handleCommand" v-if="userform && userform.roleType == 0">
                            <span class="el-dropdown-link">
                                {{ userform.nickname || "" }}
                                <i class="el-icon-caret-bottom"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <router-link to="/user/myOrders">
                                    <el-dropdown-item>我的订单</el-dropdown-item>
                                </router-link>
                                <router-link to="/user/userInfo">
                                    <el-dropdown-item>个人中心</el-dropdown-item>
                                </router-link>
                                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!-- 咨询师名下拉菜单 -->
                        <el-dropdown class="user-name" @command="handleCommand" v-if="userform && userform.roleType == 1">
                            <span class="el-dropdown-link">
                                {{ userform.nickname || "" }}
                                <i class="el-icon-caret-bottom"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <router-link to="/user/consltUserInfo">
                                    <el-dropdown-item>个人中心</el-dropdown-item>
                                </router-link>
                                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-menu>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            // ishow: false,
            topmsg: false,
            topmsg2: false,
            collapse: false,
            fullscreen: false,
            name: '_nouser',
            usericon: 'default_head.jpg',
            searchkey: '',
            // drawer: false,
            typelist: [],
            // uid: '',
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
            let username;
            if (this.$store.state.currentUser) {
                username = this.$store.state.currentUser.nickname;
            }
            return username ? username : this.name;
        },
        usericon2() {
            let usericon;
            if (this.$store.state.currentUser) {
                usericon = this.$store.state.currentUser.avatar;
            }
            return usericon ? usericon : this.usericon;
        }
    },
    methods: {
        getUserData() {
            // user:JSON.parse(window.sessionStorage.getItem('user'))
            this.userform = this.$store.state.currentUser;
            // this.uid = localStorage.getItem('user_id');
            // if (this.uid != null) {
            //     this.$axios.get('/api/userInfo/selectOne?id=' + this.uid).then((res) => {
            //         this.userform = res.data;
            //     });
            // }
        },
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

                this.$router.go(0);
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
        ToLogin() {
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
    width: 120px;
    height: 61px;
    margin: 0px 20px;
}

.header-right {
    float: right;
    padding-right: 40px;
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
    width: 240px;
    /* background-color: #3d3d3d; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.topbar button {
    margin: 0px;
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
    line-height: 60px;
    /* margin-left: 20px; */
}

.topbar .sep {
    color: #b0b0b0;
    font-size: 18px;
    margin: 0 5px;
}

.topbar li .el-button {
    color: #0f0f0f;
    font-size: 17px;
}

.topbar .el-button:hover {
    color: rgb(183, 180, 180);
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
