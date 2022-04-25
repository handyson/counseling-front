<template>
    <div>
        <div class="login">
            <div class="login-top">
                <h1>注册新用户</h1>
                <form @submit.prevent="checkform" ref="register">
                    <input type="text" value="" v-model="param.username" :rules="rules" placeholder="用户名" />
                    <!-- <input type="text" value="" v-model="param.tel" placeholder="电话"> -->
                    <!-- <input type="text" value="" v-model="param.mail" placeholder="邮箱"> -->
                    <!-- <input style="width: 50%;" v-model="param.iscode" type="text" value="" placeholder="邮箱验证码">&emsp;&emsp; -->
                    <!-- <input type="button" @click="getcode" :value="this.content" v-bind:disabled="getcodedisabled"> -->
                    <input type="password" value="" v-model="param.password" placeholder="密码字母开头,长度6-18之间,允许字母数字和下划线" />
                    <input type="password" value="" v-model="param.repassword" placeholder="确认密码" />

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
                        <el-button type="primary" @click="submitForm()" size="large" style="background-color: #50a3a2; width: 60%">
                            注册
                        </el-button>
                    </div>
                </form>
            </div>
            <div class="login-bottom">
                <h4>
                    <a style="color: #d3d3d3" href="/">返回首页<span> | </span></a>
                    <a style="color: #d3d3d3" href="/#/userlogin">立即登录</a>
                </h4>
            </div>
        </div>
    </div>
</template>
<script>
import SIdentify from '../../common/user/SIdentify';
export default {
    components: { SIdentify },
    data() {
        return {
            validCode: '',
            param: {
                username: '',
                // tel: '',
                // mail: '',
                // iscode: '',
                password: '',
                repassword: '',
                code: ''
            }
            // getcodedisabled: false,
            // content: '发送验证码',  // 按钮里显示的内容
            // totalTime: 60      //记录具体倒计时时间
        };
    },
    methods: {
        //获取验证码
        // getcode() {
        //     var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        //     if (!verify.test(this.param.mail)) {
        //         this.$message.error('请输入正确邮箱格式');
        //         return false;
        //     }
        //     this.$axios.get('/api/vicodeinfo/getCode?usermail=' + this.param.mail).then(res => {
        //         if (res.data.code == 200) {
        //             this.$message.success(res.data.msg);
        //             let clock = window.setInterval(() => {
        //                 if (this.totalTime >= 1) {
        //                     this.getcodedisabled = 'disabled';
        //                     this.totalTime--;
        //                     this.content = this.totalTime + 's后重新发送';
        //                 } else {
        //                     this.content = '发送验证码';
        //                     this.getcodedisabled = false;
        //                     this.totalTime = 60;
        //                     clearInterval(clock);
        //                 }
        //             }, 1000);
        //         } else
        //             this.$message.error(res.data.msg);
        //     })
        // },
        checkform() {
            if (!this.param.username) {
                this.$message.error('用户名不能为空');
                return false;
            }
            // else {
            //     // 去后端检查用户名使用数量
            //     user_count({ type: 'username', data: this.username }).then((res) => {
            //         console.log(res);
            //         if (res.data.count > 0) {
            //             this.username_message = '用户名已存在';
            //             this.username_error = true;
            //         } else {
            //             this.username_message = '';
            //             this.username_error = false;
            //         }
            //     });
            // }

            // if (!this.param.tel) {
            //     this.$message.error('电话不能为空');
            //     return false;
            // }
            // if (this.param.tel.length != 11) {
            //     this.$message.error('电话格式不正确');
            //     return false;
            // }
            // if (!this.param.mail) {
            //     this.$message.error('邮箱不能为空');
            //     return false;
            // }
            // if (!this.param.iscode) {
            //     this.$message.error('验证码不能为空');
            //     return false;
            // }
            //密码规则
            if (!this.param.password) {
                this.$message.error('密码不能为空');
                return false;
            }
            const passwordRule = /^[a-zA-Z]\w{5,17}$/;
            if (!passwordRule.test(this.param.password)) {
                this.$message.error('密码字母开头,长度6-18之间,允许字母数字和下划线');
                return false;
            }
            if (!this.param.repassword || this.param.repassword != this.param.password) {
                this.$message.error('请正确输入确认密码');
                return false;
            }
        },
        submitForm() {
            if (this.validCode.toUpperCase() != this.param.code.toUpperCase()) {
                this.$message.error('验证码错误');
                return;
            }
            if (this.checkform() != false) {
                this.$axios.post('/api/userInfo/register', this.param).then((res) => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                        this.$router.push('/userlogin');
                    } else this.$message.error(res.data.msg);
                });
            }
        }
    }
};
</script>

<style>
/*--login start here--*/
body {
    /*background: url(../images/banner.jpg)repeat;*/
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

.forgot a {
    font-size: 13px;
    font-weight: 500;
    color: #3d3d3d;
    display: inline-block;
    border-right: 2px solid #3d3d3d;
    padding: 0px 7px 0px 0px;
}

.forgot a:hover {
    color: #818181;
}

.forgot input[type='submit'] {
    background: #3d3d3d;
    color: #fff;
    font-size: 17px;
    font-weight: 400;
    padding: 8px 7px;
    width: 20%;
    display: inline-block;
    cursor: pointer;
    border-radius: 6px;
    -webkit-border-radius: 19px;
    -moz-border-radius: 6px;
    -o-border-radius: 6px;
    margin: 0px 7px 0px 3px;
    outline: none;
    border: none;
}

.forgot input[type='submit']:hover {
    background: #818181;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
}

.login-top input[type='button'] {
    background: #3d3d3d;
    color: #fff;
    font-size: 17px;
    font-weight: 400;
    padding: 8px 7px;
    width: 25%;
    display: inline-block;
    cursor: pointer;
    border-radius: 6px;
    -webkit-border-radius: 19px;
    -moz-border-radius: 6px;
    -o-border-radius: 6px;
    margin: 0px 7px 0px 3px;
    outline: none;
    border: none;
}

.login-top input[type='button']:hover {
    background: #818181;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
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

.login-bottom h3 {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
}

.login-bottom h3 a {
    font-size: 25px;
    font-weight: 500;
    color: #fff;
}

.login-bottom h3 a:hover {
    color: #696969;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
}
</style>