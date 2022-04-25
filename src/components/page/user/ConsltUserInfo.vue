<template>
    <div style="text-align: center">
        <el-radio-group style="margin-bottom: 20px; margin-top: 15px; text-align: left; width: 60%">
            <img src="http://127.0.0.1:8000/images/title/gerenzhongxin.png" style="height: 80px" alt="" />
        </el-radio-group>
        <el-tabs :tab-position="tabPosition" style="height: 100%; margin-top: 20px; margin-left: 20%; width: 50%">
            <el-tab-pane label="我的信息">
                <el-form ref="form" :model="user" label-width="80px">
                    <h3>我的信息</h3>
                    <br /><br />
                    <el-upload
                        class="avatar-uploader"
                        name="kimg"
                        action="/api/UpData/upkindimg/"
                        :show-file-list="false"
                        :disabled="editable"
                        :on-success="handleAvatarSuccess1"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="user.avatar" :src="user.avatar" style="width: 100px" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-form-item label="用户名">
                        <el-input v-model="user.nickname" size="medium" :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" v-show="!editable">提交修改</el-button>
                        <el-button type="primary" @click="editabled" v-show="editable">修改个人信息</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="实名认证">
                <el-form ref="form" :model="form" label-width="150px">
                    <h3>实名认证</h3>
                    <br /><br />
                    <!-- <el-form-item style="margin-left: -200px">
                        <el-upload
                            class="avatar-uploader"
                            name="kimg"
                            action="/api/UpData/upkindimg/"
                            :show-file-list="false"
                            :disabled="editable"
                            :on-success="handleAvatarSuccess2"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="form.stucardurl" :src="form.stucardurl" style="width: 100%" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item> -->
                    <el-form-item label="真实姓名">
                        <el-input v-model="form.realName" size="medium" :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.gender" :disabled="editable" size="medium">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="form.idCard" size="medium" :disabled="editable"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="电子邮件">
                        <el-input v-model="form.mail" size="medium" disabled=disabled></el-input>
                    </el-form-item> -->
                    <el-form-item label="电子邮件">
                        <el-input v-model="form.mail" size="medium" :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱验证码" v-if="this.user.isAuth == 0">
                        <el-col :span="16">
                            <el-input v-model="form.iscode" size="medium" :disabled="editable"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button class="btn-orange" v-bind:disabled="getcodedisabled" @click="getcode">{{ content }}</el-button>
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="authSubmit" v-show="!editable">提交</el-button>
                        <el-button type="primary" @click="editabled" v-show="editable">实名认证 </el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码">
                <el-form ref="form" :model="pwdform" label-width="70px">
                    <h3>修改密码</h3>
                    <br /><br />
                    <el-form-item label="旧密码">
                        <el-input type="password" v-model="pwdform.oldpwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" v-model="pwdform.newpwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input type="password" v-model="pwdform.renewpwd"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="editPwd">确 定</el-button>
            </el-tab-pane>
        </el-tabs>
        <br /><br /><br /><br />
    </div>
</template>
<script>
import applyConslt from './ApplyConslt.vue';

export default {
    name: 'consltUserInfo',
    data() {
        return {
            user: this.$store.state.currentUser,
            editable: true,
            imageUrl: '',
            form: {},
            pwdform: {
                uid: ''
            },
            settleform: {
                uid: ''
            },
            tabPosition: 'left',

            getcodedisabled: false,
            content: '发送验证码', // 按钮里显示的内容
            totalTime: 60, //记录具体倒计时时间
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            // this.form.id = localStorage.getItem('user_id');
            this.user = this.$store.state.currentUser;
            this.$axios.get('/api/userInfo/selectOne?id=' + this.user.id).then((res) => {
                this.form = res;
            });
        },
        authSubmit() {
            this.editable = !this.editable;
            // this.$axios.put('/api/userInfo/toAuth', this.form).then((res) => {
            this.form.id = this.user.id;
            this.putRequest('/api/userInfo/toAuth', this.form).then((res) => {
                this.$store.state.currentUser = res.obj;
                this.$message.success('实名认证成功');
            });
        },

        editPwd() {
            this.pwdform.uid = this.user.id;
            this.$axios.put('/api/user/resetpwd', this.pwdform).then((res) => {
                if (res.data.code == 400) this.$message.error(res.data.msg);
                else {
                    this.$router.push('/user/helloHome');
                    this.$message.success(res.data.msg);
                }
            });
        },
        onSubmit() {
            this.editable = !this.editable;
            // this.$axios.post('/api/user/updateInfo', this.user).then((res) => {
            this.postRequest('/api/user/updateInfo', this.user).then((res) => {
                this.$store.state.currentUser = res.obj;
                // window.sessionStorage.setItem("state",JSON.stringify(this.$store.state));
                localStorage.setItem('user_name', this.user.username);
                this.$message.success('修改成功');
            });
        },
        editabled() {
            this.editable = !this.editable;
        },
        handleAvatarSuccess1(res, file) {
            if (res.code == 200) {
                this.$message.success('上传成功');
                this.form.avatar = 'http://127.0.0.1:8000/images/kinds/' + res.msg;
            } else this.$message.error('上传失败');
        },
        // handleAvatarSuccess2(res, file) {
        //     if (res.code == 200) {
        //         this.$message.success('上传成功');
        //         this.form.photourl = 'http://127.0.0.1:8000/images/kinds/' + res.msg;
        //     } else this.$message.error('上传失败');
        // },
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
        },

        //获取验证码
        getcode() {
            var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
            if (!verify.test(this.form.mail)) {
                this.$message.error('请输入正确邮箱格式');
                return false;
            }
            this.$axios.get('/api/vicodeInfo/getCode?usermail=' + this.form.mail).then((res) => {
                if (res.data.code == 200) {
                    this.$message.success(res.data.msg);
                    let clock = window.setInterval(() => {
                        if (this.totalTime >= 1) {
                            this.getcodedisabled = 'disabled';
                            this.totalTime--;
                            this.content = this.totalTime + 's后重新发送';
                        } else {
                            this.content = '发送验证码';
                            this.getcodedisabled = false;
                            this.totalTime = 60;
                            clearInterval(clock);
                        }
                    }, 1000);
                } else this.$message.error(res.data.msg);
            });
        }
    }
};
</script>

<style scoped>
.avatar {
    width: 100px;
    height: 100px;
}

/deep/ .el-upload {
    width: 260px;
    height: 150px;
    line-height: 100px;
    margin-left: 60px;
}
</style>