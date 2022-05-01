<template>
    <div style="">
        <div class="goodsBox">
            <div class="goodsBox-img">
                <el-image
                    style="position: absolute; width: 340px; height: 400px; left: 0px; border-radius: 14px; margin-top: 50px"
                    :src="this.ConsultantList.photourl"
                >
                </el-image>
                <div class="goodsBox-btn">
                    <br /><br />
                    <h1>{{ this.ConsultantList.nickname }}</h1>
                    <br />
                    <div style="text-align: left">
                        <p>
                            <span style="font-size: 20px">咨询经验：</span>
                            {{ this.ConsultantList.workyear }}年
                        </p>
                        <br />
                        <p>
                            <span style="font-size: 20px">服务案例：</span>
                            <span>{{ this.ConsultantList.cases }}个</span>
                        </p>
                        <br />
                        <p>
                            <span style="font-size: 20px">所在地：</span>
                            <span>{{ this.ConsultantList.details }}</span>
                        </p>
                        <br />
                        <div>
                            <p>
                                <span style="font-size: 20px">咨询方式：</span>

                                <span v-for="item in wayList" :key="item">
                                    <span style="font-size: 20px">
                                        {{ way[item] }}
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <br /><br />
                    <!-- <h2>
                        <span style="color: #777777">售价&ensp;</span>
                        <span style="color: #e4393c; font-family: simsun">&yen;<span></span>{{ this.ConsultantList.price }}</span>
                    </h2> -->
                    <br /><br />
                    <el-button size="medium" type="danger" @click="TobookConslt">立即预约</el-button>
                    <el-button size="medium" type="warning" @click="addcollection" v-if="!haveCollection"
                        ><i class="el-icon-star-off"></i>关注
                    </el-button>
                    <el-button size="medium" type="warning" @click="removecollection" v-if="haveCollection"
                        ><i class="el-icon-star-on"></i>取消关注
                    </el-button>
                    <br />
                    <p style="color: #777777">温馨提示·下单后请及时联系咨询师</p>
                    <!-- <p style="text-align: right; margin-left: 0%; margin-top: 100px; cursor: pointer" @click="goUserShow()">
                        <span style="color: #777777"> 卖家:<i class="el-icon-s-shop"></i> </span><strong>{{ userList.username }}</strong>
                    </p> -->
                </div>
            </div>
            <br /><br />
        </div>
        <div class="detail-box">
            <span class="detial-bigtitle">基本信息</span>
            <br />
            <el-divider></el-divider>
            <div class="detial-title">
                <span style="font-weight: bold; font-size: 20px">认证资质 · 从业{{ this.ConsultantList.workyear }}年</span>
                <div v-for="(item, index) in ConsltCertifList" :key="index">
                    <!-- <p class="txt" >{{ item.certfname }}</p> -->
                    <h4 style="font-weight: normal">{{ item.certifName }}</h4>
                </div>
                <br /><br />
            </div>
            <br /><br />
            <div class="detial-title">
                <span style="font-weight: bold; font-size: 20px">擅长方向</span>
                <br /><br />
                <div v-for="(item, index) in ConsltSkillList" :key="index">
                    <span class="tag">{{ item.tname }}</span>
                    <span class="sub-tag">{{ item.detail }}</span>
                    <br /><br />
                </div>
                <br /><br />
            </div>

            <span class="detial-bigtitle">推荐语</span>
            <br />
            <el-divider></el-divider>
            <span style="font-size: 20px">{{ this.ConsultantList.sendword }}</span>

            <br /><br /><br /><br />
            <span class="detial-bigtitle">个人简介</span>
            <br />
            <el-divider></el-divider>
            <div>
                <p class="detail-brief">{{ this.ConsultantList.brief }}</p>
            </div>
            <br /><br /><br /><br />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import wayMap from '../../common/user/global';

export default {
    name: 'consultantDesc',
    data() {
        return {
            consultantId: 0,
            //按钮点击限制
            add1_can_press: true,
            add2_can_press: true,
            err_can_press: true,
            ConsultantList: [],
            ConsltSkillList: [],
            ConsltCertifList: [],
            wayList: [],
            way: { 0: '即时聊天咨询', 1: '语音咨询', 2: '视频咨询', 3: '面对面咨询' },
            userList: [],
            loginuserList: [],
            uid: '',
            collectparams: {
                id: '',
                consltid: ''
            },
            // orderparams: {
            //     uid: '',
            //     consltid: ''
            // },
            haveCollection: false,
            user: {}
        };
    },
    created() {
        this.user = this.$store.state.currentUser;
        if (this.$route.query.consultant == null) {
            this.$router.push('/user/helloHome');
        }
        this.consultantId = this.$route.query.consultant;
        console.log(this.consultantId )
        this.collectparams.consltid = this.consultantId;
        // this.collectparams.id = localStorage.getItem('user_id');
        // this.collectparams.id = this.user.id;
        // this.orderparams.consltid = this.consultantId;
        // this.orderparams.uid = localStorage.getItem('user_id');
        // this.orderparams.uid = this.user.id;
        this.getdata();
        // this.getConsltSkillList();
        // this.getConsltCertifList();

        if (this.user && this.user.id != null) {
            this.collectparams.id = this.user.id;
            this.getcollectiondate();
        }

        // this.getWayList();
        // if (this.collectparams.id != null) {
        //     this.getloginuserdate();
        // }
    },
    methods: {
        //前往用户主页
        goUserShow() {
            this.$router.push({
                path: '/user/UserShow',
                query: {
                    uid: this.userList.uid
                }
            });
        },
        //数据更新
        getdata() {
            axios
                .get('/api/consultant/selectOne?id=' + this.consultantId)
                .then((res) => {
                    this.ConsultantList = res;
                    this.wayList = this.ConsultantList.way.split(';');
                    console.log(res);
                    this.ConsltSkillList = res.ConsltSkill;
                    this.ConsltCertifList = res.ConsltCertif;

                    // if (this.ConsultantList.isreview != 1) {
                    //     this.$message.error("该商品不符合审核规范")
                    //     this.$router.push('/user/helloHome');
                    // }
                    // this.getuserdate();
                })
                .catch((error) => {
                    console.log(error);
                    console.log('查找咨询师详情接口请求异常');
                });
        },
        getuserdate() {
            axios
                .get('/api/userInfo/selectOne?id=' + this.ConsultantList.id)
                .then((res) => {
                    this.userList = res.data;
                    if (this.userList.userState != 0) {
                        this.$message.error('该商家已被封禁、商品暂停访问');
                        this.$router.push('/user/helloHome');
                    }
                })
                .catch((error) => {
                    console.log('查找用户接口请求异常');
                });
        },
        getConsltSkillList() {
            axios
                .get('/api/consltSkill/getConsltSkill?id=' + this.consultantId)
                .then((res) => {
                    this.ConsltSkillList = res.data;
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log('查找商品接口请求异常');
                });
        },
        getConsltCertifList() {
            axios
                .get('/api/consltCertification/getConsltCertf?id=' + this.consultantId)
                .then((res) => {
                    this.ConsltCertifList = res.data;
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log('查找商品接口请求异常');
                });
        },
        getWayList() {
            axios
                .get('/api/consultant/getCsellWay?id=' + this.consultantId)
                .then((res) => {
                    this.wayList = res.data;
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log('查找商品接口请求异常');
                });
        },
        // getloginuserdate() {
        //     axios
        //         .get('/api/userInfo/selectOne?id=' + this.collectparams.id)
        //         .then((res) => {
        //             this.loginuserList = res.data;
        //             console.log(this.loginuserList);
        //         })
        //         .catch((error) => {
        //             console.log('查找用户接口请求异常');
        //         });
        // },
        //创建订单
        TobookConslt() {
            if (this.user.id == null) {
                this.$message.error('请先登录账号');
            } else if (this.user.isAuth == 0) {
                this.$message.error('若要预约，请先实名认证');
                this.$router.push('/user/userInfo');
            } else {
                this.$router.push({
                    path: '/user/bookInfo',
                    query: {
                        consltId: this.consultantId,
                        consltName: this.ConsultantList.username,
                        consltPhoto: this.ConsultantList.photourl,
                        consltArea: this.ConsltSkillList,
                        consltWay: this.wayList
                    }
                });
                // this.$router.push('/user/bookInfo');
                // axios
                //     .post('/api/ordersInfo/addOrders', this.orderparams)
                //     .then((res) => {
                //         if (res.data.code == 200) {
                //             this.$message.success('创建订单成功');
                //             this.$router.push('/user/myOrders');
                //         }
                //     })
                //     .catch((error) => {
                //         console.log('收藏接口请求异常');
                //     });
            }
        },
        getcollectiondate() {
            console.log(this.collectparams.consltid);
            if (this.collectparams.id != null) {
                axios
                    .post('/api/userCollection/haveCollection', this.collectparams)
                    .then((res) => {
                        if (res && res.data.code == 200) this.haveCollection = true;
                    })
                    .catch((error) => {
                        console.log('查找收藏接口返回异常');
                    });
            }
        },
        //添加收藏
        addcollection() {
            if (this.collectparams.id == null) {
                this.$message.error('请先登录账号');
            } else {
                axios
                    .post('/api/userCollection/addCollection', this.collectparams)
                    .then((res) => {
                        if (res.data.code == 200) this.haveCollection = true;
                    })
                    .catch((error) => {
                        console.error(error);
                        console.log('收藏接口请求异常');
                    });
            }
        },
        removecollection() {
            axios
                .post('/api/userCollection/removeCollection', this.collectparams)
                .then((res) => {
                    if (res.data.code == 200) this.haveCollection = false;
                })
                .catch((error) => {
                    console.log('取消收藏接口请求异常');
                });
        }
    }
};
</script>

<style scoped>
.goodsBox {
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    /*background: #F2F8FE;*/
    position: relative;
    width: 1400px;
    height: 600px;
    margin: 0 auto;
    text-align: center;
}

.goodsBox-img {
    position: absolute;
    top: 8%;
    left: 15%;
    width: 75%;
    height: 75%;
    /*background-color: #409EFF;*/
    /*text-align: center; */
    /* vertical-align: middle; */
}

.goodsBox-btn {
    position: absolute;
    top: 8%;
    left: 45%;
    width: 30%;
    height: 20%;
    /*background-color: #409E1F;*/
    text-align: center;
    vertical-align: middle;
}

.goodsBox-store {
    position: absolute;
    top: 5%;
    left: 45%;
    width: 30%;
    height: 20%;
    /*background-color: #409E1F;*/
    text-align: center;
    vertical-align: middle;
}

/**
    卡片
     */

.card {
    height: 170px;
    width: 170px;
    margin-left: 30px;
    margin-top: 30px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 4px;
    float: left;
}

.card img {
    width: 100%;
    height: 100%;
}

.card span {
    font-size: 15px;
    color: #bfbfbf;
    display: block;
    letter-spacing: 2px;
    /*padding: 0px 20px;*/
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
  丝带
   */

.ribbon {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: relative;
    float: left;
    margin-bottom: 30px;
    background-size: cover;
    text-transform: uppercase;
    color: white;
}

.detail-box {
    margin-left: 300px;
    margin-right: 300px;
}

.detail-box .detial-bigtitle {
    font-weight: bold;
    font-size: 25px;
}

.detail-box .detial-title {
    margin-left: 100px;
}

.detial-title .tag {
    border-style: solid;
    border-width: 1px;
    padding: 10px 10px 10px 10px;
    font-size: 15px;
    /* margin-top: 100px;
  margin-bottom: 100px; */
}

.sub-tag {
    border-style: solid;
    border-left-style: none;
    border-width: 1px;
    padding: 10px 10px 10px 10px;
    font-size: 15px;
}

.detail-brief {
    /* width: 400px; color:#336699;*/
    font-family: 楷体;
    font-size: 20px;
    text-align: left;
    text-indent: 28px;
    line-height: 200%;
}

.el-button--medium {
    padding: 10px 20px;
    font-size: 20px;
    border-radius: 20px;
}
</style>
