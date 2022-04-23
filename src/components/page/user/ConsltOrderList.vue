<template>
    <div class="addPrestudyRecord">
        <div>
            <el-radio-group v-model="setStatus.code" @change="queryOrder">
                <el-radio-button v-for="s in setStatus" :label="s.code" :key="s.code">
                    {{ s.detail }}
                </el-radio-button>
            </el-radio-group>
        </div>
        <br /><br />
        <el-table
            v-if="ordertableData.length != 0"
            :data="ordertableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
        >
            <el-table-column prop="oid" label="ID" width="100" align="center"></el-table-column>
            <el-table-column prop="nickName" label="咨询者"> </el-table-column>
            <el-table-column prop="utel" label="咨询者联系方式"></el-table-column>
            <el-table-column prop="tname" label="咨询方向"></el-table-column>
            <el-table-column label="咨询详情" align="center" width="100">
                <template slot-scope="scope">
                    <el-tooltip placement="top">
                        <div slot="content">{{ scope.row.detail }}</div>
                        <el-button>详情</el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="咨询方式">
                <template slot-scope="scope">{{ ways[scope.row.way] }}</template>
            </el-table-column>

            <el-table-column prop="createtimeString" label="下单时间">
                <template slot-scope="scope">
                    <span>{{
                        scope.row.createtime
                            .toLocaleString()
                            .replace(/T/g, ' ')
                            .replace(/\.[\d]{3}Z/, '')
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="订单状态" align="center">
                <template slot-scope="scope">
                    <el-tag :type="orderStatus(scope.row.status)">{{ orderStatus2(scope.row.status) }} </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="240">
                <template slot-scope="scope">
                    <el-dropdown trigger="click">
                        <el-button type="text" size="mini"
                            >操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button
                                    v-if="scope.row.status == 0 || scope.row.status == 1"
                                    @click="scope.row.show = true"
                                    type="text"
                                    size="mini"
                                    icon="el-icon-edit"
                                    >修改</el-button
                                >
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                    v-if="scope.row.status == 0"
                                    @click="submitOrder(scope.$index, scope.row)"
                                    type="text"
                                    size="mini"
                                    icon="el-icon-success"
                                    >确认</el-button
                                >
                            </el-dropdown-item>
                            <!-- <el-dropdown-item>
                                <el-button
                                    v-if="scope.row.status == 1"
                                    type="success"
                                    icon="el-icon-edit"
                                    @click="seccessorder(scope.$index, scope.row)"
                                    >交易完成
                                </el-button>
                            </el-dropdown-item> -->
                            <el-dropdown-item>
                                <el-button
                                    v-if="scope.row.status == 0 || scope.row.status == 1"
                                    type="text"
                                    style="color: red"
                                    icon="el-icon-lx-roundclose"
                                    @click="closeorder(scope.$index, scope.row)"
                                    >取消预约
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                    v-if="scope.row.status == 3 || scope.row.status == 4"
                                    @click="handleDelete(scope.$index)"
                                    class="btn-text-red"
                                    type="text"
                                    size="mini"
                                    icon="el-icon-delete"
                                    >删除
                                </el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center">
            <img
                v-if="ordertableData.length == 0"
                src="http://127.0.0.1:8000/images/title/msg/noSellerOrder.png"
                style="height: 90px"
                alt=""
            />
        </div>
    </div>
</template>
<script>
export default {
    name: 'consltOrderList',
    data() {
        return {
            consltId: '',
            setStatus: [
                { code: 9, detail: '全部' },
                { code: 0, detail: '未确认' },
                { code: 1, detail: '未服务' },
                { code: 3, detail: '已结束' },
                { code: 4, detail: '已取消' }
            ],
            ordertableData: [],
            orderList: {
                code: '',
                cid: ''
            },
            ways: { 0: '即时聊天咨询', 1: '语音咨询', 2: '视频咨询', 3: '面对面咨询' }
        };
    },
    created() {
        this.consltId = localStorage.getItem('user_id');
        this.getConsltOrdersByUId();
    },
    methods: {
        getConsltOrdersByUId() {
            this.orderList.cid = this.consltId;
            this.$axios.post('/api/ordersInfo/selectSellerOrdersByUId', this.orderList).then((res) => {
                this.ordertableData = res.data;
                // this.changeData2()
            });
        },
        queryOrder(code) {
            if (code < 9) {
                this.orderList.code = code;
                this.getConsltOrdersByUId();
            }
        },
        orderStatus(status) {
            if (status == '0') return 'warning';
            else if (status == '1') return 'warning';
            else if (status == '2') return 'warning';
            else if (status == '3') return 'warning';
            else if (status == '4') return 'success';
            else return 'danger';
        },
        orderStatus2(status) {
            if (status == '0') return '未确认';
            else if (status == '1') return '准备咨询';
            else if (status == '2') return '买家确认收货';
            else if (status == '3') return '咨询结束';
            else if (status == '4') return '取消咨询';
            else return '订单终止';
        },
        submitOrder(index, row) {
            this.$axios.get('/api/ordersInfo/submitOrder?id=' + row.oid).then((res) => {
                if (res && res.data.code == 200) {
                    this.$message.success('确认成功');
                    location.reload();
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        seccessorder(index, row) {
            this.$axios.get('/api/ordersInfo/seccessorder?id=' + row.oid).then((res) => {
                this.$message.success('交易成功');
                location.reload();
            });
        },
        closeorder(index, row) {
            this.$axios.get('/api/ordersInfo/closeOrder?id=' + row.oid).then((res) => {
                this.$message.success('终止订单');
                location.reload();
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.addPrestudyRecord::v-deep {
    .el-form-item {
        > label::after {
            content: '*';
            color: #f56c6c;
            margin-left: 4px;
        }
    }

    .addPrestudyRecord-nmust {
        .el-form-item {
            > label::after {
                content: '';
            }
        }
    }

    .el-form-item__label {
        color: #5a6066;
        font-size: 14px;
        font-weight: normal;
    }
}

.addPrestudyRecord {
    &-input {
        width: 100%;
    }
}
</style>
