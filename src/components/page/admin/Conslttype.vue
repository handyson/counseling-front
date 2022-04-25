<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i>咨询师服务领域</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane label="咨询方向类别总览" name="first">
                    <el-table :data="read" :show-header="false" style="width: 100%">
                        <el-table-column prop="id"> </el-table-column>
                        <!-- <el-table-column label="图片" align="center">
                            <template slot-scope="scope">
                                <el-image
                                        class="table-td-thumb"
                                        :src="scope.row.kimg"
                                        style="height: 50px;width: 50px;"
                                        :preview-src-list="[scope.row.kimg]"
                                ></el-image>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="typeName"> </el-table-column>
                        <el-table-column prop="createTime"> </el-table-column>

                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="添加类别" name="second">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="类别名称">
                            <el-input v-model="form.kname" style="width: 500px"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="类别图片">
                            <el-upload
                                    class="avatar-uploader"
                                    name="kimg"
                                    action="/api/UpData/upkindimg/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="form.kimg" :src="form.kimg" class="avatar" style="height: 180px;">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item> -->
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">添加</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: 'conslttype',
    data() {
        return {
            message: 'first',
            read: [],
            form: {
                kname: ''
                // kimg: 'http://127.0.0.1:8000/images/kinds/default.jpg'
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            this.$axios.get('/api/consultantType/selectAll').then((res) => {
                this.read = res.data;
                this.changeData();
            });
        },
        handleDel(index, row) {
            this.$axios.post('/api/consultantType/deleteByFlag/' + row.id).then((res) => {
                this.getData();
                this.$message.success('删除成功');
            });
        },
        onSubmit() {
            if (this.form.kname == '') {
                this.$message.error('请输入类别名称');
            } else {
                this.$axios.post('/api/consultantType/add', this.form).then((res) => {
                    this.form.kname = '';
                    // this.form.kimg = 'http://127.0.0.1:8000/images/kinds/default.jpg';
                    this.$message.success('添加成功');
                    this.getData();
                });
            }
        },
        changeData() {
            const len = this.read.length;
            for (let i = 0; i < len; i++) {
                //时间格式转化
                var createtime = new Date(this.read[i].createtime);
                var month = createtime.getMonth() + 1;
                this.read[i].createtimeString =
                    createtime.getFullYear() +
                    '-' +
                    month +
                    '-' +
                    createtime.getDate() +
                    ' ' +
                    createtime.getHours() +
                    ':' +
                    createtime.getMinutes();
                var logintime = new Date(this.read[i].logintime);
                month = logintime.getMonth() + 1;
                this.read[i].logintimeString =
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
        }

        // handleAvatarSuccess(res, file) {
        //     if (res.code == 200) {
        //         this.$message.success('上传成功');
        //         this.form.kimg = "http://127.0.0.1:8000/images/kinds/" + res.msg;
        //     } else
        //         this.$message.error('上传失败');
        // },
        // beforeAvatarUpload(file) {
        //     const isJPG = file.type === 'image/jpeg';
        //     const isPng = file.type === 'image/png';
        //     const isLt2M = file.size / 1024 / 1024 < 2;

        //     if (!isJPG) {
        //         this.$message.error('上传头像图片只能是 JPG 格式!');
        //     }
        //     if (!isLt2M) {
        //         this.$message.error('上传头像图片大小不能超过 2MB!');
        //     }
        //     return isJPG && isLt2M;
        // }
    },
    computed: {
        unreadNum() {
            return this.unread.length;
        }
    }
};
</script>

<style>
.message-title {
    cursor: pointer;
}

.handle-row {
    margin-top: 30px;
}
</style>

