<template>
    <div style="width: 100%;float: left;">
        <div style="float: left;width: 22%;text-align: center;margin-left: 5%;margin-top: 20px;">
            <img v-if="userList.photourl" :src="userList.photourl" class="avatar">
            <p>{{userList.username}}
                <el-button style="display: inline-block;" type="text" icon="el-icon-warning-outline"
                           @click="tousuVisible=true">投诉
                </el-button>
            </p>
            <div style="width: 100%;text-align: left;">
                <div v-for="(item) in commentlist">
                    <el-divider content-position="left">
                        <i class="el-icon-user-solid"></i>
                        <span v-if="item.anonymousflag==0">{{item.username}}</span>
                        <span v-else>匿名评论</span>
                        <i class="el-icon-time"></i>
                        {{item.createtimeString}}
                        <i class="el-icon-takeaway-box"></i>
                        {{item.goodsname}}
                    </el-divider>
                    <el-button type="success" plain><span>{{item.details}}</span></el-button>
                </div>
            </div>
        </div>
        <div style="float: left;width: 70%;text-align: center;">
            <div class="card" v-for="(item, index) in goodsList" :key="item.goodsid" @click="goConsultantDesc(item.goodsid)">
                <div class="ribbon">
                    <img :src="item.iconurl" style="height: 100%;width: 100%">
                </div>
                <div style="text-align:center">
                    <span>{{item.goodsname}}</span>
                    <span style="color: red;">&yen;{{item.price}}</span>
                    <span>/{{item.spec}}</span>
                </div>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="用户投诉" :visible.sync="tousuVisible" width="30%">
            <p>投诉描述：</p>
            <el-input type="text" v-model="param.details"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="tousuVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "userShow",
        data() {
            return {
                uid: '',
                userList: [],
                goodsList: [],
                commentlist: [],
                tousuVisible: false,
                param: {
                    uid: '',
                    eduid: '',
                    details: '',
                },
            }
        }, created() {
            if (this.$route.query.uid == null) {
                this.$router.push('/user/helloHome');
            }
            this.uid = this.$route.query.uid;
            this.getData();
            this.getGoodsData();
            this.getcommentlistData();
        },
        methods: {
            // 提交投诉
            saveEdit() {
                if (localStorage.getItem('user_id') == null) {
                    this.$message.error("请先登录您的信息");
                } else {
                    this.param.uid = localStorage.getItem('user_id');
                    this.param.eduid = this.uid;
                    this.$axios.post('/api/userInfo/tousu', this.param).then(res => {
                        if (res.data.code == 200)
                            this.$message.success(res.data.msg);
                        else
                            this.$message.error(res.data.msg);
                    })
                }
                this.tousuVisible = false;
            },
            getData() {
                this.$axios.get('/api/userInfo/selectOne?id=' + this.uid).then(res => {
                    this.userList = res.data
                })
            }, getcommentlistData() {
                this.$axios.get('/api/comments/selectSellerCommentByUId?id=' + this.uid).then(res => {
                    this.commentlist = res.data;
                    this.changeData();
                })
            },
            changeData() {
                const length = this.commentlist.length;
                for (let i = 0; i < length; i++) {
                    //时间格式转化
                    var createtime = new Date(this.commentlist[i].createtime);
                    var month = createtime.getMonth() + 1;
                    this.commentlist[i].createtimeString = createtime.getFullYear() + "-" + month + "-" + createtime.getDate() + " " + createtime.getHours() + ":" + createtime.getMinutes();
                }
            },
            getGoodsData() {
                this.$axios.get('/api/consultant/selectByUid?id=' + this.uid).then(res => {
                    this.goodsList = res.data
                })
            }, goConsultantDesc(goods) {
                this.$router.push({
                    path: '/consultant/consultantDesc',
                    query: {
                        goods: goods
                    }
                });
            },
        }
    }
</script>
<style scoped>

    /**
    卡片
     */

    .card {
        height: 350px;
        width: 266px;
        margin-left: 45px;
        margin-top: 30px;
        margin-bottom: 50px;
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


    .avatar {
        width: 100px;
        height: 100px;
    }

    /deep/ .el-upload {
        width: 260px;
        height: 150px;
        line-height: 100px;
        margin-left: 60px;
    }

</style>