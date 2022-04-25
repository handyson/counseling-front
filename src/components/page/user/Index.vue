<template>
    <div>
        <br><br>
        <br><br>
        <!--轮播图-->
        <el-carousel :interval="4000" type="card" height="400px" style="width: 100%;">
            <el-carousel-item v-for="item in scrolltofigurelist" :key="item.scrolltofigureid">
                <img :src="item.ssrc" @click="goConsultantDesc(item.id)" style="width: 100%;height: 100%;">
            </el-carousel-item>
        </el-carousel>
        <hr style="width: 80%;margin-left: 10%;"/>
        <div>
            <el-container>
                <div style="float: left;width: 10%;">
                    <!--左边栏空白占位  -->
                </div>
                <div style="float: left;width: 80%;">
                    <div style="margin-left: 40px;font-size: 22px;color:#333;font-weight: 200;line-height: 58px;margin-bottom: -20px;">
                        首页推荐
                        <a href="/#/user/selectResult?searchkey="
                           style="float: right;margin-bottom: -20px;margin-right: 40px;">查看全部<i
                                class="el-icon-lx-right"></i></a>
                    </div>
                    <div class="card" v-for="(item, index) in consultantList" :key="item.user_id"
                         v-on:mouseenter="showDialog(index)" v-on:mouseleave="hideDialog(index)">
                        <div class="ribbon">
                            <!--鼠标移入移出事件-->
                            <div class="handleDialog" v-if="ishow && index==current">
                                <el-button type="success" style="margin-left:30%;margin-top: 70%;" size="medium"
                                           @click="goConsultantDesc(item.user_id)">查看详情
                                </el-button>
                            </div>
                            <img :src="item.photourl" style="height: 100%;width: 100%">
                        </div>
                        <div style="text-align:center">
                            <span>{{item.realName}}</span>
                            <span style="color: red;">从业{{item.workyear}}年</span>
                            <span>/{{item.title}}</span>
                        </div>
                    </div>
                </div>
                <div style="float: left;width: 10%;">
                    <!--右边栏空白占位  -->
                </div>

            </el-container>
            <br>
        </div>
        <br>
        <br>
        <br>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "index",
        data() {
            return {
                ishow: false,
                current: 0,
                selectd: '',
                scrolltofigurelist: [],
                consultantList: [],
            };
        }, 
        created() {
            this.getscrolltofigure();
            this.getconsultantList();
        },
        methods: {
            getconsultantList() {
                axios.get('/api/consultant/selectShowIndex').then(res => {
                    this.consultantList = res;
                }).catch(error => {
                    console.log("主页商品接口请求异常");
                });
            }, 
            getscrolltofigure() {
                axios.get('/api/scrolltofigure/selectAll').then(res => {
                    this.scrolltofigurelist = res;
                    console.log(this.scrolltofigurelist);
                }).catch(error => {
                    console.log("轮播图接口请求异常");
                });
            },
            //前往商品详情页
            goConsultantDesc(consultant_id) {
                console.log(consultant_id)
                this.$router.push({
                    path: '/consultant/consultantDesc',
                    query: {
                        consultant: consultant_id
                    }
                });
            },
            //显示操作项
            showDialog(index, item) {
                this.ishow = true;
                this.current = index;
            },
            //隐藏蒙层
            hideDialog(index, item) {
                this.ishow = false;
                this.current = null;
            }, mouseenter1() {
                this.topmsg = true;
            }, mouseleave1() {
                this.topmsg = false;
            }
        }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    /**
    隐藏页
    */
    .handleDialog {
        position: absolute;
        background: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
    }


    /**
    卡片
     */

    .card {
        height: 350px;
        width: 266px;
        margin-left: 30px;
        margin-top: 30px;
        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 4px;
        float: left;
    }

    .card img {
        width: 100%;
        height: 70%;
    }

    .card span {
        font-size: 15px;
        color: #BFBFBF;
        display: block;
        letter-spacing: 2px;
        /*padding: 0px 20px;*/
    }

    /**
    丝带
     */

    .ribbon {
        display: inline-block;
        width: 100%;
        height: 70%;
        position: relative;
        float: left;
        margin-bottom: 30px;
        background-size: cover;
        text-transform: uppercase;
        color: white;
    }

    .wrap {
        width: 100%;
        height: 188px;
        position: absolute;
        top: -8px;
        left: 8px;
        overflow: hidden;
    }

    .wrap:before {
        content: "";
        display: block;
        border-radius: 8px 8px 0px 0px;
        width: 40px;
        height: 8px;
        position: absolute;
        right: 100px;
        background: #4D6530;
    }

    .wrap:after {
        content: "";
        display: block;
        border-radius: 0px 8px 8px 0px;
        width: 8px;
        height: 40px;
        position: absolute;
        right: 0px;
        top: 100px;
        background: #4D6530;
    }

    .ribbon6 {
        display: inline-block;
        text-align: center;
        width: 200px;
        height: 40px;

        line-height: 40px;
        position: absolute;
        top: 30px;
        right: -50px;
        z-index: 2;
        overflow: hidden;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        border: 1px dashed;
        box-shadow: 0 0 0 3px #57DD43, 0px 21px 5px -18px rgba(0, 0, 0, 0.6);
        background: #57DD43;
    }

    /* 顶栏容器CSS */
    .el-header .el-menu {
        max-width: 1225px;
        margin: 0 auto;
    }

    .el-header .logo {
        height: 60px;
        width: 189px;
        float: left;
        margin-right: 100px;
    }

    .el-header .so {
        margin-top: 10px;
        width: 300px;
        float: right;
    }

    /*.el-menu-demo:hover{*/
    /*    background-color: #00a854 !important;*/
    /*}*/

    .el-menu-demo-item:hover {
        background-color: #F7F7F7 !important;
    }

    /* 顶栏容器CSS END */
</style>
