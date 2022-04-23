<template>
    <div>
        <!--表头-->
        <div class="title" style="width: 80%; margin-left: 10%">
            <!--            <h3>我的订单</h3>-->
            <el-radio-group style="margin-bottom: 20px; margin-top: 15px; text-align: left; width: 100%">
                <img src="http://127.0.0.1:8000/images/title/wodedingdan.png" style="height: 80px" alt="" />
            </el-radio-group>
            <el-table
                ref="multipleTable"
                @row-click="goOrder"
                :span-method="objectSpanMethod"
                :data="tableData.filter((data) => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
            >
                <el-table-column label="订单号" prop="oid" align="center" width="100"></el-table-column>

                <!--        商品名字-->
                <el-table-column label="咨询师" prop="cname" align="center"></el-table-column>
                <!--        商品图片-->
                <!-- <el-table-column label="时间" prop="img" width="110px" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 100px; height: 100px;" :src="scope.row.iconurl"/>
                       </template>
                </el-table-column> -->

                <!--        预约时间-->
                <el-table-column label="预约时间" prop="conselltime" align="center">
                    <template slot-scope="scope">
                        <span>{{
                            scope.row.conselltime
                                .toLocaleString()
                                .replace(/T/g, ' ')
                                .replace(/\.[\d]{3}Z/, '')
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="咨询方式" prop="way" align="center">
                    <template slot-scope="scope">
                        {{ways[scope.row.way]}}
                    </template>
                </el-table-column>
                <el-table-column label="下单时间" prop="createtimeString" align="center">
                    <template slot-scope="scope">
                        <span>{{
                            scope.row.createtime
                                .toLocaleString()
                                .replace(/T/g, ' ')
                                .replace(/\.[\d]{3}Z/, '')
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" prop="status" width="110px" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="orderStatus(scope.row.status)">{{ ordStatusOutput(scope.row.status) }}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <br /><br /><br /><br /><br />
        </div>
        <div style="width: 80%; margin-left: 10%"></div>
    </div>
</template>

<script>
import { weekdaysShort } from 'moment';
export default {
    name: 'myOrders',
    data() {
        return {
            uid: '',
            tableData: [],
            ways: { 0: '即时聊天咨询', 1: '语音咨询', 2: '视频咨询', 3: '面对面咨询' },
            search: ''
        };
    },
    created() {
        if (localStorage.getItem('user_id') == null) {
            this.$router.push('/user/helloHome');
            this.$message.error('用户未登录');
        }
        this.uid = localStorage.getItem('user_id');
        this.getData();
    },
    methods: {
        getData() {
            this.$axios.get('/api/ordersInfo/getOrdersByUid?id=' + this.uid).then((res) => {
                this.tableData = res.data;
                for (let i = 0; i < this.tableData.length; i++) {
                    // let w = this.tableData.data.way;
                    // this.tableData.data.way = this.ways[w];
                }
                console.log(this.tableData.way);

                // this.changeData();
            });
        },
        changeData() {
            const length = this.tableData.length;
            for (let i = 0; i < length; i++) {
                this.tableData[i].createtime.replice;
                //时间格式转化
                var createtime = new Date(this.tableData[i].createtime);
                // var month = createtime.getMonth() + 1;
                this.tableData[i].createtimeString =
                    createtime.getFullYear() +
                    '-' +
                    createtime.getMonth() +
                    '-' +
                    createtime.getDate() +
                    ' ' +
                    createtime.getHours() +
                    ':' +
                    createtime.getMinutes();
            }
        },
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
        orderStatus(status) {
            if (status == '0') return 'warning';
            else if (status == '1') return 'warning';
            else if (status == '2') return 'warning';
            else if (status == '3') return 'success';
            else return 'danger';
        },
        orderStatus2(status) {
            if (status == '1') return '交易进行中';
            else if (status == '2') return '买家确认收货';
            else if (status == '3') return '卖家确认收款';
            else if (status == '4') return '交易成功';
            else return '订单终止';
        },
        goOrder(row, column, event) {
            // if (row.goodssum == 4) {
            //     this.param.orderid = row.orderid
            //     this.pinglunVisible = true
            // } else if (row.goodssum == 1 || row.goodssum == 2 || row.goodssum == 3) {
            //
            // }
            this.$router.push({
                path: '/user/orderDetail',
                query: {
                    orderid: row.oid,
                    OrderMap: row
                }
            });
        },

        objectSpanMethod({ row, column, rowIndex, columnIndex }) {}
    }
};
</script>

<style scoped>
.title {
    margin-top: 50px;
}

.title h3 {
    /*float: left;*/
    font-size: 23px;
    color: #c91623;
}
</style>
