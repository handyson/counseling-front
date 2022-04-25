<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 咨询师信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">删除 </el-button>
                <el-input v-model="query.key" placeholder="输入-商品ID/商品名-进行查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                <el-button type="primary" @click="handleAdd">添加</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                :key="key"
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="c_user_id" label="ID" width="100" align="center"></el-table-column>
                <el-table-column prop="goodsname" label="商品名"></el-table-column>
                <!--                <el-table-column prop="uid" label="商家ID"></el-table-column>-->
                <!-- <el-table-column prop="userinfo.name" label="商家名"></el-table-column>
                <el-table-column prop="userinfo.tel" label="商家电话"></el-table-column>
                <el-table-column prop="userinfo.mail" label="商家邮箱"></el-table-column> -->
                <el-table-column prop="kid" label="商品种类" align="center"></el-table-column>
                <el-table-column label="图片" align="center">
                    <template slot-scope="scope">
                        <el-image class="table-td-thumb" :src="scope.row.iconurl" :preview-src-list="[scope.row.iconurl]"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="商品价格">
                    <template slot-scope="scope">￥{{ scope.row.price }}</template>
                </el-table-column>
                <el-table-column prop="spec" label="商品规格"></el-table-column>
                <el-table-column prop="details" label="商品描述"></el-table-column>
                <el-table-column label="审核状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="isCert(scope.row.isreview)">
                            {{ scope.row.isreview === 0 ? '等待审核' : scope.row.isreview === 1 ? '已通过审核' : '审核异常，请修改' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createtimeString" label="创建时间"></el-table-column>
                <el-table-column label="商品审核" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-lx-roundcheck" type="success" @click="PassAudit(scope.$index, scope.row)">通过 </el-button>
                        <el-button type="danger" icon="el-icon-lx-roundclose" @click="ReMoveAudit(scope.$index, scope.row)"
                            >驳回
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
                        <el-button type="danger" icon="el-icon-lx-roundclose" @click="deletegoods(scope.$index, scope.row)"
                            >删除
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
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="商品种类">
                    <el-select v-model="form.kid" placeholder="请选择商品种类">
                        <el-option v-for="item in kindsList" :key="item.kid" :label="item.kname" :value="item.kid"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="商品名字">
                    <el-input v-model="form.goodsname"></el-input>
                </el-form-item>
                <el-form-item label="商品规格">
                    <el-input v-model="form.spec"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                        class="avatar-uploader"
                        name="kimg"
                        action="/api/UpData/upkindimg/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="form.iconurl" :src="form.iconurl" class="avatar" style="height: 180px" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情">
                    <el-input v-model="form.details"></el-input>
                </el-form-item>
                <el-form-item label="商品关键字">
                    <el-input v-model="form.goodstitle"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加弹出框 -->
        <el-dialog title="编辑" :visible.sync="addVisible" width="30%">
            <el-form ref="aform" :model="aform" label-width="90px">
                <el-form-item label="商品种类">
                    <el-select v-model="aform.kid" placeholder="请选择商品种类">
                        <el-option v-for="item in kindsList" :key="item.kid" :label="item.kname" :value="item.kid"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="aform.price"></el-input>
                </el-form-item>
                <el-form-item label="商品名字">
                    <el-input v-model="aform.goodsname"></el-input>
                </el-form-item>
                <el-form-item label="商品规格">
                    <el-input v-model="aform.spec"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                        class="avatar-uploader"
                        name="kimg"
                        action="/api/UpData/upkindimg/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="aform.iconurl" :src="aform.iconurl" class="avatar" style="height: 180px" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情">
                    <el-input v-model="aform.details"></el-input>
                </el-form-item>
                <el-form-item label="商品关键字">
                    <el-input v-model="aform.goodstitle"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import { getKindsList } from '../../../api/data';

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
            tableData: [],
            kindsList: [],
            delList: [],
            multipleSelection: [],
            form: {},
            aform: {
                uid: 1001
            },
            editVisible: false,
            addVisible: false,
            key: 0
        };
    },
    created() {
        this.getData();
        getKindsList().then((data) => {
            this.kindsList = data;
        });
    },
    methods: {
        deletegoods(index, row) {
            axios
                .get('/api/goods/deleteByFlag?id=' + row.c_user_id)
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
                    .get('/api/goods/deleteByFlag?id=' + this.multipleSelection[i].c_user_id)
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
                .post('/api/goods/selectKeyByLimit', this.query)
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
        handleSearch() {
            this.query.pageIndex = 1;
            this.getData();
        },
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
                //根据商家ID查询联系方式
                this.$axios.get('/api/userinfo/selectOne?id=' + this.tableData[i].uid).then((res) => {
                    // console.log(res.data)
                    this.tableData[i].userinfo = res.data;
                    this.handleUpdateClick();
                });
            }
        },
        handleUpdateClick() {
            this.key += 1;
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
            if (stid == '0') return 'info';
            else if (stid == '1') return 'success';
            else if (stid == '2') return 'danger';
            else if (stid == '3') return 'warning';
        },
        isCertString(stid) {
            if (stid == '0') return '未认证';
            else if (stid == '1') return '待审核';
            else if (stid == '2') return '已认证';
            else if (stid == '3') return '审核未通过';
        }, // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        //通过审核
        PassAudit(index, row) {
            axios.get('/api/goods/PassAudit?id=' + row.c_user_id).then((res) => {
                this.getData();
                this.$message.success('通过审核');
            });
        },
        //驳回审核
        ReMoveAudit(index, row) {
            axios.get('/api/goods/ReMoveAudit?id=' + row.c_user_id).then((res) => {
                this.getData();
                this.$message.success('通过审核');
            });
        },
        //添加操作
        handleAdd() {
            this.addVisible = true;
        },
        // 保存编辑
        saveEdit() {
            axios.post('/api/goods/edit', this.form).then((res) => {
                this.$message.success('修改成功');
            });
            this.editVisible = false;
        },
        //保存添加
        saveAdd() {
            axios.post('/api/goods/add', this.aform).then((res) => {
                this.$message.success('添加成功');
            });
            this.addVisible = false;
        },
        //文件上传
        handleAvatarSuccess(res, file) {
            if (res.code == 200) {
                this.$message.success('上传成功');
                this.form.iconurl = 'http://127.0.0.1:8000/images/kinds/' + res.msg;
                this.aform.iconurl = 'http://127.0.0.1:8000/images/kinds/' + res.msg;
            } else this.$message.error('上传失败');
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPng = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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
