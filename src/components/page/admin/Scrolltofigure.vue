<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 轮播图
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除
                </el-button>
                <el-input v-model="query.key" placeholder="输入ID进行查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
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
                <el-table-column label="轮播图ID" prop="scrolltofigureid" align="center"></el-table-column>
                <el-table-column label="商品ID" prop="goodsid" align="center"></el-table-column>
                <el-table-column label="图片" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.ssrc"
                                :preview-src-list="[scope.row.ssrc]"
                        ></el-image>
                    </template>
                </el-table-column>
                <!--                <el-table-column label="轮播图地址" prop="ssrc" align="center"></el-table-column>-->
                <!--                <el-table-column label="权重" prop="local" align="center"></el-table-column>-->

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

                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                type="danger"
                                icon="el-icon-lx-roundclose"
                                @click="deleterow(scope.$index, scope.row)"
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
                <el-form-item label="关联商品">
                    <el-select v-model="form.goodsid" placeholder="请选择关联商品">
                        <el-option
                                v-for="item in consultantList"
                                :key="item.goodsid"
                                :label="item.goodsname"
                                :value="item.goodsid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                            class="avatar-uploader"
                            name="img"
                            action="/api/UpData/upimg/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="form.ssrc" :src="form.ssrc" class="avatar"
                             style="height: 180px;">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="aform" :model="aform" label-width="90px">
                <el-form-item label="关联商品">
                    <el-select v-model="aform.goodsid" placeholder="请选择关联商品">
                        <el-option
                                v-for="item in consultantList"
                                :key="item.goodsid"
                                :label="item.goodsname"
                                :value="item.goodsid">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="图片">
                    <el-upload
                            class="avatar-uploader"
                            name="img"
                            action="/api/UpData/upimg/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="aform.ssrc" :src="aform.ssrc" class="avatar"
                             style="height: 180px;">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
    import axios from "axios";
    import {getConsultantList} from "../../../api/data.js";

    export default {
        name: '',
        data() {
            return {
                pageTotal: 0,//总数据量
                query: {
                    key: '',//查询条件
                    pageIndex: 1,//现在的页码
                    offset: 0,//查询首条位置
                    limit: 10,//查询数据量
                },
                form: {},
                editVisible: false,
                addVisible: false,
                aform: {
                    ssrc: 'http://127.0.0.1:8000/images/default2.jpg'
                },
                tableData: [],
                consultantList: [],
                delList: [],
                multipleSelection: [],
            };
        },
        created() {
            this.getData();
            getConsultantList().then(
                data => {
                    this.consultantList = data
                    console.log(data)
                }
            )
        },
        methods: {
            deleterow(index, row) {
                axios.get('/api/scrolltofigure/deleteById?id=' + row.scrolltofigureid).then(res => {
                    this.$message.success("删除成功")
                    this.tableData.splice(index, 1);
                }).catch(error => {
                    console.log("接口请求异常");
                });
            }, handleSelectionChange(val) {
                this.multipleSelection = val;
            }, delAllSelection() {
                const length = this.multipleSelection.length;
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    axios.get('/api/scrolltofigure/deleteById?id=' + this.multipleSelection[i].scrolltofigureid).then(res => {
                    }).catch(error => {
                        console.log("接口请求异常");
                    });
                }
                this.getData();
                this.multipleSelection = [];
            }, getData() {
                this.query.offset = (this.query.pageIndex - 1) * this.query.limit;
                axios.post('/api/scrolltofigure/selectKeyByLimit', this.query).then(res => {
                    this.tableData = res.data.data;
                    this.pageTotal = res.data.pageTotal;
                    this.changeData();
                }).catch(error => {
                    console.log("接口请求异常");
                });
            }, handleSearch() {
                this.query.pageIndex = 1;
                this.getData();
            }, changeData() {
                const length = this.tableData.length;
                for (let i = 0; i < length; i++) {
                    var createtime = new Date(this.tableData[i].createtime);
                    var month = createtime.getMonth() + 1;
                    this.tableData[i].createtimeString = createtime.getFullYear() + "-" + month + "-" + createtime.getDate() + " " + createtime.getHours() + ":" + createtime.getMinutes();
                }
            }, handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }, handleSizeChange(val) {
                this.query.limit = val;
                this.getData();
            }, handleAdd() {
                this.addVisible = true;
            }, saveAdd() {
                this.addVisible = false;
                console.log(this.aform)
                this.$axios.post('/api/scrolltofigure/add', this.aform).then(res => {
                    this.$message.success(`添加成功`);
                    this.getData();
                })
            }, handleAvatarSuccess(res, file) {
                if (res.code == 200) {
                    this.$message.success('上传成功');
                    this.aform.ssrc = "http://127.0.0.1:8000/images/others/" + res.msg;
                    this.form.ssrc = "http://127.0.0.1:8000/images/others/" + res.msg;
                } else
                    this.$message.error('上传失败');
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPng = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPng) {
                    this.$message.error('上传头像图片只能是 JPG或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },// 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },// 保存编辑
            saveEdit() {
                axios.post('/api/scrolltofigure/edit', this.form).then(res => {
                })
                this.editVisible = false;
            },
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

