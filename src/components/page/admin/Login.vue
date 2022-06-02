<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">大白心理咨询后台管理</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.pwd" @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="gouser()">前往首页</el-button>
                </div>
                <!--                <p class="login-tips">Tips :</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            param: {
                username: '',
                pwd: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    created() {
        // if (!(localStorage.getItem('manage_name') == "null"))
        //     console.log("未登录");
        // else {
        //     this.$router.push('/admin/dashboard');
        //     this.$message.success('登录成功');
        // }
    },
    methods: {
        gouser() {
            this.$router.push('/user/helloHome');
        },
        submitForm() {
            this.$refs.login.validate((valid) => {
                if (valid) {
                    this.postKeyValueRequest('/api/managerInfo/login', this.param).then((res) => {
                        if (res.status == 200) {
                            this.$message.success('登录成功');
                            localStorage.setItem('manage_name', res.obj.name);
                            localStorage.setItem('manage', res.obj);
                            this.$router.push('/admin/dashboard');
                        } else this.$message.error('用户名或密码错误');
                    });
                } else {
                    this.$message.error('请输入用户名和密码');
                    console.log('登录失败');
                    return false;
                }
            });
        }

        // submitLogin() {
        //     this.$refs.loginForm.validate((valid) => {
        //         if (valid) {
        //             this.fullscreenLoading = true;
        //             this.postKeyValueRequest('/doLogin', this.loginForm).then((resp) => {
        //                 setTimeout(() => {
        //                     this.fullscreenLoading = false;
        //                 }, 1000);
        //                 if (resp) {
        //                     //保存当前用户到vuex
        //                     this.$store.state.currentUser = resp.obj;
        //                     //保存登录用户到sessionStorage中
        //                     window.sessionStorage.setItem('user', JSON.stringify(resp.obj));
        //                     let path = this.$route.query.redirect;
        //                     this.$router.replace(path == '/' || path == undefined ? '/chatroom' : path);
        //                 } else {
        //                     this.changeverifyCode();
        //                 }
        //             });
        //         } else {
        //             this.$message.error('用户名,密码和验证码都不能为空！');
        //             return false;
        //         }
        //     });
        // }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../../assets/imgs/adminloginbg.jpg);
    background-size: 100% 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 45%;
    top: 50%;
    width: 520px;
    margin: -190px 0 0 -175px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.5);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    font-size: 18px;
    width: 40%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>