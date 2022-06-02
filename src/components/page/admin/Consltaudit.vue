<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 咨询师信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <el-input v-model="query.key" placeholder="" class="handle-input mr10"></el-input>
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
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="咨询师姓名"></el-table-column>

                <el-table-column label="图片" align="center">
                    <template slot-scope="scope">
                        <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="咨询师描述"></el-table-column>
                <el-table-column label="咨询师状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''">{{
                            scope.row.state
                        }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="创建时间"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-lx-roundcheck" type="success" @click="PassAudit(scope.$index, scope.row)">编辑 </el-button>
                        <el-button type="danger" icon="el-icon-lx-roundclose" @click="ReMoveAudit(scope.$index, scope.row)"
                            >下架
                        </el-button>
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
    name: 'userselect',
    data() {
        return {
            pageTotal: 0, //总数据量
            query: {
                key: '', //查询条件
                pageIndex: 1, //现在的页码
                offset: 0, //查询首条位置
                limit: 10 //查询数据量
            },
            tableData: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.query.offset = (this.query.pageIndex - 1) * this.query.limit;
            axios
                .post('/api/userInfo/selectKeyByLimit', this.query)
                .then((res) => {
                    console.log(res);
                    this.tableData = res.data.data;
                    this.pageTotal = res.data.pageTotal;
                    this.changeData();
                })
                .catch((error) => {
                    console.log('接口请求异常');
                });
        },
        // 触发搜索按钮
        handleSearch() {
            this.query.pageIndex = 1;
            this.getData();
        },
        // 触发搜索按钮
        changeData() {
            const length = this.tableData.length;
            for (let i = 0; i < length; i++) {
                //时间格式转化
                var createtime = new Date(this.tableData[i].createtime);
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
                var logintime = new Date(this.tableData[i].logintime);
                month = logintime.getMonth() + 1;
                this.tableData[i].logintimeString =
                    logintime.getFullYear() +
                    '-' +
                    month +
                    '-' +
                    logintime.getDate() +
                    ' ' +
                    logintime.getHours() +
                    ':' +
                    logintime.getMinutes();
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
        isCert(stid) {
            if (stid == '0') return 'danger';
            else if (stid == '1') return 'info';
            else if (stid == '2') return 'success';
            else if (stid == '3') return 'warning';
        },
        isCertString(stid) {
            if (stid == '0') return '未认证';
            else if (stid == '1') return '待审核';
            else if (stid == '2') return '已认证';
            else if (stid == '3') return '审核未通过';
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
