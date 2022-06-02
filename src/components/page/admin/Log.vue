<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 系统日志 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.key" placeholder="输入-日志ID/用户ID/用户IP/操作详情-查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column label="日志ID" prop="logid" align="center"></el-table-column>
                <el-table-column label="用户" prop="operator" align="center"></el-table-column>
                <el-table-column label="日志时间" prop="createtimeString" align="center"></el-table-column>
                <el-table-column label="用户IP" prop="createip" align="center"></el-table-column>
                <el-table-column label="操作详情" prop="details" align="center"></el-table-column>
                <el-table-column label="备注" prop="note" align="center"></el-table-column>
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
                .get('/api/logsInfo/deleteByFlag?id=' + row.logid)
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
                    .get('/api/logsInfo/deleteByFlag?id=' + this.multipleSelection[i].logid)
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
                .post('/api/logsInfo/selectKeyByLimit', this.query)
                .then((res) => {
                    this.tableData = res.records;
                    this.pageTotal =  this.tableData.length;
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
                    '年' +
                    month +
                    '月' +
                    createtime.getDate() +
                    '日 ' +
                    createtime.getHours() +
                    '时' +
                    createtime.getMinutes() +
                    '分';
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

