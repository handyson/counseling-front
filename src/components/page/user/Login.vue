<template>
    <div>
        <div class="login">
            <!--            <h2>Acced Form</h2>-->
            <form @submit.prevent="checkform">
                <div class="login-top">
                    <h1>欢迎大白心理咨询</h1>
                    <!-- <input type="text" value="" v-model="param.mail" name="mail" placeholder="邮箱" /> -->
                    <input type="text" value="" v-model="param.username" name="username" placeholder="用户名" />
                    <input type="password" value="" v-model="param.pwd" name="password" placeholder="密码" />

                    <SIdentify
                        :value.sync="validCode"
                        style="background-color: white; border-radius: 10px; float: left; height: 50px; margin-left: 20px"
                    ></SIdentify>
                    <input
                        type="text"
                        value=""
                        v-model="param.code"
                        style="width: 230px; margin-left: 20px"
                        name="code"
                        placeholder="验证码"
                    />
                    <div class="forgot">
                        <el-button
                            type="primary"
                            @click="submitForm()"
                            size="large"
                            style="background-color: #50a3a2; width: 60%; height: 50px; margin-top: 20px"
                        >
                            登录
                        </el-button>
                    </div>
                </div>
            </form>
            <div class="login-bottom">
                <h4>
                    <a style="color: #d3d3d3" href="/">返回首页<span> | </span></a>
                    <a style="color: #d3d3d3" href="/#/repwd">找回密码<span> | </span></a>
                    <a style="color: #d3d3d3" @click="shensuVisible = true" v-if="shensu">我要申诉<span> | </span></a>
                    <a style="color: #d3d3d3" href="/#/userregister">立即注册</a>
                </h4>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="用户申诉" :visible.sync="shensuVisible" width="30%">
            <el-input type="text" v-model="param.details"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="shensuVisible = false">取 消</el-button>
                <el-button type="primary" @keyup.enter.native="saveEdit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import SIdentify from '../../common/user/SIdentify';
import axios from 'axios';

export default {
    components: { SIdentify },
    data() {
        return {
            validCode: '',
            shensu: false,
            shensuVisible: false,
            param: {
                code: '',
                username: '',
                // mail: '',
                pwd: '',
                details: ''
            }
        };
    },
    methods: {
        // 提交申诉
        saveEdit() {
            this.$axios.post('/api/userInfo/shensu', this.param).then((res) => {
                if (res.data.code == 200) this.$message.success(res.data.msg);
                else this.$message.error(res.data.msg);
            });
            this.shensuVisible = false;
        },
        checkform() {
            // if (!this.param.mail) {
            //     this.$message.error('邮箱不能为空');
            //     return false;
            // }
            if (!this.param.username) {
                this.$message.error('账号名不能为空');
                return false;
            }
            if (!this.param.pwd) {
                this.$message.error('密码不能为空');
                return false;
            }
        },
        submitForm() {
            if (this.validCode.toUpperCase() != this.param.code.toUpperCase()) {
                this.$message.error('验证码错误');
                return;
            }
            if (this.checkform() == false) return;
            this.$axios.post('/api/userInfo/login', this.param).then((res) => {
                if (res.data.code == 200) {
                    this.$message.success(res.data.msg);
                    localStorage.setItem('user', res.data.data);
                    localStorage.setItem('user_name', res.data.data.userName);
                    localStorage.setItem('user_icon', res.data.data.avatar);
                    localStorage.setItem('user_id', res.data.data.id);
                    this.$router.push('/');
                } else {
                    this.$message.error(res.data.msg);
                    this.shensu = true;
                }
            });
        }
    }
};
</script>

<style>
/*--login start here--*/
body {
    /*background: url(../../../assets/img/con-bg_04f25dbf8e.jpg) no-repeat;*/
    /*background-size: 100% 100%;*/
    background: #50a3a2;
    background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
    /*opacity: 0.8;*/
    /*padding: 100px 0px 30px 0px;*/
    font-family: 'Roboto', sans-serif;
    font-size: 100%;
}

.login {
    text-align: center;
    padding-top: 150px;
    width: 32%;
    margin: 0 auto;
}

.login h2 {
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    margin: 0px 0px 50px 0px;
    font-family: 'Droid Serif', serif;
}

.login-top {
    background: #e1e1e1;
    border-radius: 25px 25px 0px 0px;
    -webkit-border-radius: 25px 25px 0px 0px;
    -moz-border-radius: 25px 25px 0px 0px;
    -o-border-radius: 25px 25px 0px 0px;
    padding: 40px 60px;
}

.login-top h1 {
    text-align: center;
    font-size: 27px;
    font-weight: 500;
    color: #3d3d3d;
    margin: 0px 0px 20px 0px;
}

.login-top input[type='text'] {
    outline: none;
    font-size: 15px;
    font-weight: 900;
    color: black;
    padding: 15px 20px;
    background: #cacaca;
    border: 1px solid #ccc;
    border-radius: 25px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    -o-border-radius: 25px;
    margin: 0px 0px 12px 0px;
    width: 88%;
    -webkit-appearance: none;
}

.login-top input[type='password'] {
    outline: none;
    font-size: 15px;
    font-weight: 900;
    color: black;
    padding: 15px 20px;
    background: #cacaca;
    border: 1px solid #ccc;
    border-radius: 25px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    -o-border-radius: 25px;
    margin: 0px 0px 12px 0px;
    width: 88%;
    -webkit-appearance: none;
}

.forgot {
    text-align: center;
}

.login-bottom {
    background: #3d3d3d;
    padding: 30px 65px;
    border-radius: 0px 0px 25px 25px;
    -webkit-border-radius: 0px 0px 25px 25px;
    -moz-border-radius: 0px 0px 25px 25px;
    -o-border-radius: 0px 0px 25px 25px;
    text-align: right;
    border-top: 2px solid #3d3d3d;
}
</style>