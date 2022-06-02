<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 咨询师审核 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.key" placeholder="输入-审核ID/用户ID-进行查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="用户ID：">
                                <span>{{ props.row.userId }}</span>
                            </el-form-item>
                            <el-form-item label="真实姓名：">
                                <span>{{ props.row.userName }}</span>
                            </el-form-item>
                            <el-form-item label="性别：">
                                <span>{{ props.row.gender }}</span>
                            </el-form-item>
                            <el-form-item label="邮箱：">
                                <span>{{ props.row.mail }}</span>
                            </el-form-item>
                            <!-- <el-form-item label="提交申请详情：">
                                <span>{{ props.row.details }}</span>
                            </el-form-item> -->
                        </el-form>
                    </template>
                </el-table-column>

                <el-table-column prop="id" label="ID" width="100" align="center" sortable></el-table-column>
                <el-table-column prop="userName" label="用户名" sortable></el-table-column>
            
                <el-table-column label="详情" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="ApplyDetail(scope.row.userId)" size="mini">详情 </el-button>
                        <!-- <el-image
                            v-if="scope.row.auditimg"
                            class="table-td-thumb"
                            :src="scope.row.auditimg"
                            :preview-src-list="[scope.row.auditimg]"
                        ></el-image> -->
                    </template>
                </el-table-column>

                <el-table-column label="提交申请时间" sortable>
                    <template slot-scope="scope">
                        <span>{{scope.row.createtimeString}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="审核状态" align="center" sortable>
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status === 2 ? 'success' : scope.row.status === 1 ? 'danger' : ''"
                            >{{ scope.row.status === 2 ? '审核通过' : scope.row.status === 3 ? '审核未通过' : '待审核' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-lx-roundcheck" type="success" @click="PassAudit(scope.$index, scope.row)"
                            >通过
                        </el-button>
                        <el-button type="danger" icon="el-icon-lx-roundclose" @click="ReMoveAudit(scope.$index, scope.row)"
                            >驳回
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
        <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" @close="propClose('取消')" width="50%">
            <conslt-resume :uid="uid"/>
            <!-- :date-show="dateShow" :single-data="singleData"  -->
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import consltResume from './ConsltResume.vue';

export default {
    name: 'useraudit',
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
            dialogVisible: false,
            uid: 0,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.query.offset = (this.query.pageIndex - 1) * this.query.limit;
            axios
                .post('/api/audit/selectKeyByLimit', this.query)
                .then((res) => {
                    console.log(res);
                    this.tableData = res.records;
                    this.pageTotal = this.tableData.length;
                    this.changeData();
                })
                .catch((error) => {
                    console.log('接口请求异常');
                });
        },
        //
        PassAudit(index, row) {
            if (row.status == '2') {
                this.$notify({
                    title: '审核',
                    message: '该用户已通过审核',
                    type: 'warning'
                });
            } else {
                this.$notify({
                    title: '审核',
                    message: '通过成功',
                    type: 'success'
                });
                axios
                    .get('/api/audit/PassAudit?id=' + row.id)
                    .then((res) => {
                        this.getData();
                    })
                    .catch((error) => {
                        console.log('接口请求异常');
                    });
            }
        },
        ReMoveAudit(index, row) {
            if (row.status == '3') {
                this.$notify({
                    title: '审核',
                    message: '该用户已被驳回',
                    type: 'warning'
                });
            } else {
                this.$notify({
                    title: '审核',
                    message: '驳回成功',
                    type: 'success'
                });
                axios
                    .get('/api/audit/ReMoveAudit?id=' + row.id)
                    .then((res) => {
                        this.getData();
                    })
                    .catch((error) => {
                        console.log('接口请求异常');
                    });
            }
        },
        // 弹框关闭
        propClose(content) {
            this.dialogVisible = false;
            if (content != '取消') {
                this.calendarData.push(content);
            }
        },
        ApplyDetail(uid) {
            this.uid = uid;
            this.dialogVisible = true;
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
    },
    components: {
        consltResume
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
