<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 用户信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.key" placeholder="输入用户ID进行查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="ID：" prop="id">
                                <span>{{ scope.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="真实姓名：" prop="nickName">
                                <span>{{ scope.row.userName }}</span>
                            </el-form-item>
                            <el-form-item label="性别：">
                                <span>{{ scope.row.gender == '0' ? '女' : '男' }}</span>
                            </el-form-item>
                            <el-form-item label="邮箱：">
                                <span>{{ scope.row.mail }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>

                <el-table-column prop="id" label="ID" width="100" align="center" sortable></el-table-column>
                <el-table-column prop="nickName" label="用户名"></el-table-column>
                <el-table-column label="头像" align="center">
                    <template slot-scope="scope">
                        <el-image class="table-td-thumb" :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="isAuth" label="实名认证" align="center" sortable>
                    <template slot-scope="scope">
                        <el-tag :type="isCert(scope.row.isAuth)">{{ isCertString(scope.row.isAuth) }} </el-tag>
                    </template>
                </el-table-column>

                <!-- <el-table-column label="认证图片" align="center">
                    <template slot-scope="scope">
                        <el-image
                                v-if="scope.row.stucardurl"
                                class="table-td-thumb"
                                :src="scope.row.stucardurl"
                                :preview-src-list="[scope.row.stucardurl]"
                        ></el-image>
                        <span v-else>no photo</span>
                    </template>
                </el-table-column> -->

                <el-table-column prop="createTime" label="注册时间" sortable>
                    <template slot-scope="scope">
                        <span>{{
                            scope.row.createTime
                                .toLocaleString()
                                .replace(/T/g, ' ')
                                .replace(/\.[\d]{3}Z/, '')
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="loginIp" label="最后登录IP" sortable></el-table-column>
                <el-table-column prop="loginTime" label="最后登录时间" sortable>
                    <!-- <template slot-scope="scope">
                        <span>{{
                            scope.row.loginTime
                            .toLocaleString()
                            .replace(/T/g, ' ')
                            .replace(/\.[\d]{3}Z/, '')
                        }}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="userState" label="账号状态" align="center" sortable>
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.userState == '0' ? 'success' : 'danger'"
                            >{{ scope.row.userState == '0' ? '正常' : '封禁' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-dropdown trigger="click">
                            <el-button type="text" size="mini"
                                >操作
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <el-button
                                        @click="scope.row.show = true"
                                        class="btn-text-red"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-edit"
                                        >编辑</el-button
                                    >
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button
                                        @click="scope.row.show = true"
                                        class="btn-text-red"
                                        type="text"
                                        size="mini"
                                        icon="el-icon-s-custom"
                                        >禁用</el-button
                                    >
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button
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
                    this.tableData = res.data.records;
                    this.pageTotal = this.tableData.length;
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
            if (stid == '0') return 'warning';
            else if (stid == '1') return 'success';
        },
        isCertString(stid) {
            if (stid == '0') return '未认证';
            else if (stid == '1') return '已认证';
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
