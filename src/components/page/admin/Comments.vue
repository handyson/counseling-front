<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 用户评论 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">删除 </el-button>
                <el-input v-model="query.key" placeholder="请输入-评论ID/用户ID-进行查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                <!-- <el-button type="primary" @click="handleAdd">添加</el-button> -->
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

                <el-table-column label="评论ID" prop="cid" align="center"></el-table-column>
                <el-table-column label="用户ID" prop="uid" align="center"></el-table-column>
                <el-table-column label="订单ID" prop="orderid" align="center"></el-table-column>
                <el-table-column label="评论内容" prop="details" align="center"></el-table-column>
                <el-table-column label="创建时间" prop="createtime" align="center"></el-table-column>
                <el-table-column label="是否匿名" prop="anonymousflag" align="center"></el-table-column>

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

                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-lx-roundclose" @click="deleterow(scope.$index, scope.row)">删除 </el-button>
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
        <!-- </el-dialog> -->
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
                .get('/api/comments/deleteByFlag?id=' + row.cid)
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
            if (length) {
                for (let i = 0; i < length; i++) {
                    axios
                        .get('/api/comments/deleteByFlag?id=' + this.multipleSelection[i].cid)
                        .then((res) => {})
                        .catch((error) => {
                            console.log('接口请求异常');
                        });
                }
            } else console.log('请选择需要删除的评论');

            this.getData();
            this.multipleSelection = [];
        },
        getData() {
            this.query.offset = (this.query.pageIndex - 1) * this.query.limit;
            axios
                .post('/api/comments/selectKeyByLimit', this.query)
                .then((res) => {
                    this.tableData = res.data.data;
                    this.pageTotal = res.data.pageTotal;
                    console.log(this.tableData);
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
            axios.post('/api/comments/edit', this.form).then((res) => {});
            this.editVisible = false;
        },
        //保存添加
        saveAdd() {
            axios.post('/api/comments/add', this.aform).then((res) => {});
            this.addVisible = false;
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

