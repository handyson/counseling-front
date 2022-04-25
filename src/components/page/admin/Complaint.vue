<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 投诉管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.key" placeholder="输入-投诉ID/用户ID-进行查询" class="handle-input mr10"></el-input>
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
                <el-table-column label="投诉ID" prop="complaint_id" align="center" sortable></el-table-column>
                <el-table-column label="详情" prop="details" align="center"></el-table-column>
                <el-table-column label="投诉人" prop="uid" align="center" sortable></el-table-column>
                <el-table-column label="被投诉人" prop="eduid" align="center" sortable></el-table-column>
                <el-table-column label="投诉状态" prop="state" align="center" sortable></el-table-column>
                <el-table-column label="投诉时间" prop="createtimeString" align="center" sortable></el-table-column>

                <!--                <el-table-column prop="createtimeString" width="100" label="时间"></el-table-column>-->
                <!--                <el-table-column label="图片" align="center">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-image-->
                <!--                                class="table-td-thumb"-->
                <!--                                :src="scope.row.iconurl"-->
                <!--                                :preview-src-list="[scope.row.iconurl]"-->
                <!--                        ></el-image>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <!--                <el-table-column label="商品价格">-->
                <!--                    <template slot-scope="scope">￥{{scope.row.price}}</template>-->
                <!--                </el-table-column>-->
                <!--                <el-table-column label="审核状态" align="center">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-tag :type="isCert(scope.row.isreview)">-->
                <!--                            {{scope.row.isreview===1?'已通过审核':(scope.row.isreview===0?'未通过审核':'审核异常')}}-->
                <!--                        </el-tag>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->

                <el-table-column label="操作" align="center" width="250">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-lx-roundclose" @click="fenghao(scope.$index, scope.row)"
                            >封禁被投诉者
                        </el-button>
                        <el-button type="danger" icon="el-icon-lx-roundclose" @click="bohuitousu(scope.$index, scope.row)"
                            >驳回投诉
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
        fenghao(index, row) {
            axios
                .get('/api/complaint/blockUser?id=' + row.complaint_id)
                .then((res) => {
                    if (res.data.code == 200) this.$message.success(res.data.msg);
                    else this.$message.error(res.data.msg);
                    this.getData();
                })
                .catch((error) => {
                    console.log('接口请求异常');
                });
        },
        bohuitousu(index, row) {
            axios
                .get('/api/complaint/reject?id=' + row.complaint_id)
                .then((res) => {
                    if (res.data.code == 200) this.$message.success(res.data.msg);
                    else this.$message.error(res.data.msg);
                    this.getData();
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
                    .get('/api/complaint/deleteByFlag?id=' + this.multipleSelection[i].complaint_id)
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
                .post('/api/complaint/selectKeyByLimit', this.query)
                .then((res) => {
                    this.tableData = res.data.data;
                    this.pageTotal = res.data.pageTotal;
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

