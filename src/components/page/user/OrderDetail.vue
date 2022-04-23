<template>
    <div style="width: 100%; float: left">
        <div style="width: 40%; margin-left: 30%; padding-bottom: 10%; padding-top: 5%">
            <!-- 订单确认窗口 -->
            <p style="width: 100%; background: #2db7f5; line-height: 50px; font-size: 18px; text-align: center; color: #fff">
                <b>您的预约咨询详情</b>
            </p>

            <div id="box1" style="text-align: center">
                <!-- <p>咨询师姓名：{{ tableData.cname }}</p> -->

                <div style="display: flex; align-items: center; margin-bottom: 25px; height: 68px" @click="goConsultantDesc(tableData.cid)">
                    <li class="teacher-item">
                        <span style="padding-right:20px">咨询师姓名：</span>
                        <a>
                            <img :src="tableData.photourl" class="avatar" />
                        </a>
                        <!-- <ul class="teacher-info">
                            <li class="basic-info">
                                <a @click="goConsultantDesc(tableData.id)" class="name"> {{ tableData.cname }}&nbsp;&nbsp;&nbsp;&nbsp;</a>
                               
                            </li>
                        </ul> -->
                    </li>
                    <span>{{ tableData.cname }}</span>
                </div>

                <p>咨询类型：{{ tableData.tname }}</p>
                <p>咨询方式：{{ ways[tableData.way] }}</p>
                <p>订单编号：{{ tableData.oid }}</p>
                <p>状态：{{ ordStatusOutput(tableData.status) }}</p>
                <h3>请联系咨询师，确认交易完成后点击确认按钮</h3>
                <p>用户信息：{{ tableData.username }}</p>
                <p>用户联系电话：{{ tableData.utel }}</p>
                <p>创建时间：{{ tableData.createtime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') }}</p>
                <p v-if="tableData.submittime">确认时间：{{ tableData.submittime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') }}</p>
                <p v-if="tableData.finishtime">完毕时间：{{ tableData.finishtime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') }}</p>
                <div class="paybtn" id="d1">
                    <button
                        class="btn1"
                        name="submit"
                        type="submit"
                        @click="confirmTofinish"
                        v-if="tableData.status == 2"
                    >
                        确认收货
                    </button>
                    <button class="btn1" name="submit" type="submit" @click="cancelOrder" v-if="tableData.status == 1">终止订单</button>
                    <button class="btn1" name="submit" type="submit" @click="openComment" v-if="tableData.status == 3">评论咨询师</button>
                    <!-- <button class="btn1" name="submit" type="submit" disabled v-if="tableData.status == 2">请等待咨询师</button> -->
                </div>
                <div style="clear: both"></div>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="评论商家" :visible.sync="commentVisible" width="30%">
            <el-input type="text" v-model="param.details" placeholder="输入评价内容"></el-input>
            <el-select v-model="param.anonymousflag" placeholder="是否匿名评论">
                <el-option label="不匿名" value="0"></el-option>
                <el-option label="匿名" value="1"></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="commentVisible = false">取 消</el-button>
                <el-button type="primary" @click="toComment">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'orderDetail',
    data() {
        return {
            orderid: '',
            payWay: '1',
            tableData: [],
            commentVisible: false,
            ways: { 0: '即时聊天咨询', 1: '语音咨询', 2: '视频咨询', 3: '面对面咨询' },
            param: {
                details: '',
                uid: '',
                orderid: '',
                anonymousflag: '0'
            }
            // consultantMap: []
        };
    },
    created() {
        if (localStorage.getItem('user_id') == null) {
            this.$router.push('/user/helloHome');
            this.$message.error('用户未登录');
        }
        if (this.$route.query.orderid == null) {
            this.$message.error('订单不存在');
            this.$router.push('/user/helloHome');
        }
        this.orderid = this.$route.query.orderid;
        this.param.uid = localStorage.getItem('user_id');
        // this.tableData = this.$route.query.OrderMap;
        this.getOrder();
    },
    methods: {
        ordStatusOutput(status) {
            // if (this.tableData.submit == 0) return '未确认';
            // else{
            // let status = this.tableData.status;
            if (status == 0) return '未确认';
            else if (status == 1) return '待咨询';
            else if (status == 2) return '正咨询';
            else if (status == 3) return '咨询结束';
            else return '订单终止';
            // }
        },
        getOrder() {
            this.$axios.get('/api/ordersInfo/getOrdersByid?id=' + this.orderid).then((res) => {
                if (res.data.data == null) {
                    this.$message.error('订单不存在');
                    this.$router.push('/user/helloHome');
                }
                if (res.data.data.uid != localStorage.getItem('user_id')) {
                    this.$message.error('无权限');
                    this.$router.push('/user/helloHome');
                }
                this.tableData = res.data.data;
                console.log(this.tableData);
            });
        },
        //前往商品详情页
        goConsultantDesc(consultant_id) {
            this.$router.push({
                path: '/consultant/consultantDesc',
                query: {
                    consultant: consultant_id
                }
            });
        },
        //数据更新
        // getConsultant() {
        //     axios
        //         .get('/api/consultant/selectOne?id=' + tableData.cid)
        //         .then((res) => {
        //             this.ConsultantMap = res.data;
        //         })
        //         .catch((error) => {
        //             console.log('查找商品接口请求异常');
        //         });
        // },
        //确认收货
        confirmTofinish() {
            this.$axios.get('/api/ordersInfo/getGoods?id=' + this.orderid).then((res) => {
                this.$message.success('确认收货');
                location.reload();confirm
            });
        },
        cancelOrder() {
            this.$axios.get('/api/ordersInfo/closeOrder?id=' + this.orderid).then((res) => {
                this.$message.success('取消订单');
                this.$router.push('/user/helloHome');
            });
        },
        toComment() {
            if (this.param.details == '') {
                this.$message.error('请输入评价内容');
                return false;
            }
            this.commentVisible = false;
            this.$axios.post('/api/comments/addpinglun', this.param).then((res) => {
                this.param.details = '';
                this.param.anonymousflag = '0';
                if (res.data.code == 200) this.$message.success(res.data.msg);
                else this.$message.error(res.data.msg);
            });
        },
        openComment() {
            this.param.orderid = this.orderid;
            this.commentVisible = true;
        }
    }
};
</script>

<style scoped>
#box1 {
    background: #fff;
    padding: 20px;
}

#box1 p {
    font-size: 16px;
    font-family: 'Microsoft YaHei';
    text-align: left;
}

.btn1 {
    float: left;
    height: 40px;
    width: 230px;
    background: #ff771a;
    text-align: center !important;
    line-height: 40px;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    margin-right: auto;
    margin-top: 20px;
    margin-left: 25px;
    color: #fff;
    border: none;
    cursor: pointer;
}

.avatar {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
    box-sizing: border-box;
}
</style>
