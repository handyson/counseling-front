<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 用户预约信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除 </el-button>
                <el-input v-model="query.key" placeholder="输入-预约ID-进行查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                <el-button type="primary" @click="handleAdd">添加</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>

                <el-table-column label="ID" prop="id" align="center"></el-table-column>
                <el-table-column label="用户ID" prop="uid" align="center"></el-table-column>
                <el-table-column label="咨询师ID" prop="consultant" align="center"></el-table-column>
                <el-table-column label="咨询方式" align="center">
                    <template slot-scope="scope"> 
                        <span>{{ways[scope.row.consultWay]}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="咨询时间" prop="consult_start_time" align="center">
                    <template slot-scope="scope"> 
                        <span>{{transformTime(scope.row.startTime)}}-{{transformTime(scope.row.endTime)}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="咨询结束时间" prop="consult_end_time" align="center"></el-table-column> -->
                <el-table-column label="下单时间" prop="createtimeString" align="center"></el-table-column>
                <el-table-column label="预约状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="orderStatus(scope.row.orderStatus)">{{ orderStatus2(scope.row.orderStatus) }}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :current-page="query.pageIndex"
                    :total="pageTotal"
                    :page-sizes="[5, 10, 20, 50, 100, 300]"
                    :page-size="10"
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: '',
    data() {
        return {
            pageTotal: 0, //总数据量
            query: {
                key: '', //查询条件
                pageIndex: 1, //现在的页码
                offset: 0, //查询首条位置
                limit: 10 //查询数据量
            },
            form: {},
            aform: {},
            ways: { 0: '即时聊天咨询', 1: '语音咨询', 2: '视频咨询', 3: '面对面咨询' },
            editVisible: false,
            addVisible: false,
            tableData: [],
            delList: [],
            multipleSelection: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        deleterow(index, row) {
            axios
                .get('/api/ordersInfo/deleteByFlag?id=' + row.orderid)
                .then((res) => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch((error) => {
                    console.log('接口请求异常');
                });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                axios
                    .get('/api/ordersInfo/deleteByFlag?id=' + this.multipleSelection[i].orderid)
                    .then((res) => {})
                    .catch((error) => {
                        console.log('接口请求异常');
                    });
            }
            this.getData();
            this.multipleSelection = [];
        },
        getData() {
            this.query.offset = (this.query.pageIndex - 1) * this.query.limit;
            axios
                .post('/api/ordersInfo/selectKeyByLimit', this.query)
                .then((res) => {
                    this.tableData = res.records;
                    this.pageTotal = res.records.length;
                    this.changeData();
                })
                .catch((error) => {
                    console.log('接口请求异常');
                });
        },
        handleSearch() {
            this.query.pageIndex = 1;
            this.getData();
        },
        changeData() {
            const length = this.tableData.length;
            for (let i = 0; i < length; i++) {
                var createtime = new Date(this.tableData[i].gmtCreate);
                var month = createtime.getMonth() + 1;
                this.tableData[i].createtimeString =
                    createtime.getFullYear() +
                    '-' +
                    month +
                    '-' +
                    createtime.getDate() +
                    ' ' +
                    createtime.getHours() +
                    ':' +
                    createtime.getMinutes();
            }
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        handleSizeChange(val) {
            this.query.limit = val;
            this.getData();
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        //添加操作
        handleAdd() {
            this.addVisible = true;
        },
        // 保存编辑
        saveEdit() {
            axios.post('/api/ordersInfo/edit', this.form).then((res) => {});
            this.editVisible = false;
        },
        //保存添加
        saveAdd() {
            axios.post('/api/ordersInfo/add', this.aform).then((res) => {});
            this.addVisible = false;
        },
        orderStatus(status) {
            if (status == '1') return 'warning';
            else if (status == '2') return 'warning';
            else if (status == '3') return 'success';
            else if (status == '4') return 'danger';
            else return 'danger';
        },
        orderStatus2(status) {
            if (status == '0') return '未确认';
            else if (status == '1') return '未咨询';
            else if (status == '3') return '咨询完成';
            else if (status == '4') return '预约取消';
            else return '预约终止';
        },
         transformTime(timestamp = +new Date()) {
            var date = new Date(timestamp * 1000 + 8 * 3600 * 1000); // 增加8小时
            return date.toJSON().substr(0, 19).replace('T', ' ');
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.green {
    color: #00a854;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>

