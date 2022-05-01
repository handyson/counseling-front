<template>
    <div>
        <!--轮播图-->
        <el-carousel :interval="4000" height="450px" style="width: 100%">
            <!-- <el-carousel-item v-for="item in scrolltofigurelist" :key="item.scrolltofigureid">
                <img :src="item.ssrc" @click="goConsultantDesc(item.id)" style="width: 100%; height: 100%" />
            </el-carousel-item> -->
            <el-carousel-item>
                <img src="/swiper1.jpg" @click="goConsultantDesc(item.id)" style="height: 100%" />
            </el-carousel-item>
            <el-carousel-item>
                <img src="/swiper2.jpg" @click="goConsultantDesc(item.id)" style="height: 100%" />
            </el-carousel-item>
        </el-carousel>
        <br />
        <el-container>
            <div style="width: 10%">
                <!--左边栏空白占位  -->
            </div>
            <div style="width: 80%;margin-left: 40px; font-size: 22px; color: #333; font-weight: 200; line-height: 58px; margin-bottom: -20px">
                专业服务
                <a
                    href="/#/user/selectResult?searchkey="
                    style="float: right; margin-bottom: -20px; margin-right: 40px; color: #333"
                    >查看全部<i class="el-icon-lx-right"></i
                ></a>
            </div>
        </el-container>
        <div class="serv-cent">
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv1.jpg" />
                <p class="serv-title">亲子关系及家庭教育</p>
                <p class="serv-detail">增进与子女的双向沟通方式，降低原生与再生家庭的矛盾、解决两代之间的代沟问题</p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv2.jpg" />
                <p class="serv-title">两性问题</p>
                <p class="serv-detail">辅导因社会快速发展，及长期工作压力因素所造成的婚姻冲突，增强两性沟通能力，提升婚姻的和谐及幸福。</p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv3.jpg" />
                <p class="serv-title">综合服务</p>
                <p class="serv-detail">针对夫妻关系、亲子关系、家庭教育、专业督导、个人成长等等不同领域的思考，并提供专业的心理服务。</p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv4.jpg" />
                <p class="serv-title">人际关系</p>
                <p class="serv-detail">增强人际关系处理技巧，提升个人的沟通能力，有助于人脉拓展，帮助自身成长。</p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv5.jpg" />
                <p class="serv-title">心理压力与情绪疏导</p>
                <p class="serv-detail">
                    从生理、心理、等角度系统还原个体健康， 缓解工作压力，学习如何情绪宣泄的方式， 保持健康与激情，提高工作效率。
                </p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv6.jpg" />
                <p class="serv-title">个体心理咨询与辅导</p>
                <p class="serv-detail">
                    职场压力、人际关系或其它各项心理障碍咨询， 从个人问题中细化诊断，专业化辅导及追踪跟进，
                    改善心理障碍进而协助个人能力成长。
                </p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv7.jpg" />
                <p class="serv-title">企业团体心理咨询</p>
                <p class="serv-detail">
                    缓解员工压力，解决职场疑惑，提升各级员工对岗位突发的危机事件处理方式及应对机制，以及提升工作效率和效益。
                </p>
            </div>
        </div>
        <el-divider class="index-el-divider"></el-divider>
        <div>
            <el-container>
                <div style="float: left; width: 10%">
                    <!--左边栏空白占位  -->
                </div>
                <div style="float: left; width: 80%">
                    <div style="margin-left: 40px; font-size: 22px; color: #333; font-weight: 200; line-height: 58px; margin-bottom: -20px">
                        首页推荐
                        <a
                            href="/#/user/selectResult?searchkey="
                            style="float: right; margin-bottom: -20px; margin-right: 40px; color: #333"
                            >查看全部<i class="el-icon-lx-right"></i
                        ></a>
                    </div>
                    <div
                        class="card"
                        v-for="(item, index) in consultantList"
                        :key="item.user_id"
                        v-on:mouseenter="showDialog(index)"
                        v-on:mouseleave="hideDialog(index)"
                    >
                        <div class="ribbon">
                            <!--鼠标移入移出事件-->
                            <div class="handleDialog" v-if="ishow && index == current">
                                <el-button
                                    type="success"
                                    style="margin-left: 30%; margin-top: 70%"
                                    size="medium"
                                    @click="goConsultantDesc(item.user_id)"
                                    >查看详情
                                </el-button>
                            </div>
                            <img :src="item.photourl" style="height: 100%; width: 100%" />
                        </div>
                        <div style="text-align: center">
                            <span>{{ item.realName }}</span>
                            <span style="color: red">从业{{ item.workyear }}年</span>
                            <span>/{{ item.title }}</span>
                        </div>
                    </div>
                </div>
                <div style="float: left; width: 10%">
                    <!--右边栏空白占位  -->
                </div>
            </el-container>
            <br />
        </div>
        <br />
        <br />
        <br />
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'index',
    data() {
        return {
            ishow: false,
            current: 0,
            selectd: '',
            scrolltofigurelist: [],
            consultantList: []
        };
    },
    created() {
        this.getscrolltofigure();
        this.getconsultantList();
    },
    methods: {
        getconsultantList() {
            axios
                .get('/api/consultant/selectShowIndex')
                .then((res) => {
                    this.consultantList = res;
                })
                .catch((error) => {
                    console.log('主页商品接口请求异常');
                });
        },
        getscrolltofigure() {
            axios
                .get('/api/scrolltofigure/selectAll')
                .then((res) => {
                    this.scrolltofigurelist = res;
                    console.log(this.scrolltofigurelist);
                })
                .catch((error) => {
                    console.log('轮播图接口请求异常');
                });
        },
        //前往商品详情页
        goConsultantDesc(consultant_id) {
            console.log(consultant_id);
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
        },
        mouseenter1() {
            this.topmsg = true;
        },
        mouseleave1() {
            this.topmsg = false;
        }
    }
};
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
    color: #bfbfbf;
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
    content: '';
    display: block;
    border-radius: 8px 8px 0px 0px;
    width: 40px;
    height: 8px;
    position: absolute;
    right: 100px;
    background: #4d6530;
}

.wrap:after {
    content: '';
    display: block;
    border-radius: 0px 8px 8px 0px;
    width: 8px;
    height: 40px;
    position: absolute;
    right: 0px;
    top: 100px;
    background: #4d6530;
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
    box-shadow: 0 0 0 3px #57dd43, 0px 21px 5px -18px rgba(0, 0, 0, 0.6);
    background: #57dd43;
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
    background-color: #f7f7f7 !important;
}

/* 顶栏容器CSS END */

.serv-cent {
    width: 80%;
    margin: 40px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
}

.serv-card {
    width: 20%;
    height: 260px;
    padding: 20px 20px;
    flex-grow: 1;
    margin: 5px 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* flex-basis: 100%; */
    flex-shrink: 0;
}
.serv-card img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
}
.serv-card p {
    text-align: center;
    font-size: 14px;
    font-family: Microsoft YaHei;
    line-height: 1.75;
}
.serv-title {
    color: #555555;
    font-weight: bold;
}
.serv-detail {
    color: #888888;
}
.index-el-divider{
    width: 80%;
    margin-left: 10%;
}
</style>
