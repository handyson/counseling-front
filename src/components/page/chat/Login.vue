<template>
  <el-container>
    <!-- <el-header >
      <el-button @click="gotoAdminLogin" icon="el-icon-d-arrow-right" style="float: right;border: none" >管理端登录</el-button>
    </el-header> -->
    <el-main>
      <div class="loginContainer">
        <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
          <h3 class="loginTitle">欢迎大白心理咨询</h3>
          <el-form-item label="用户名:" prop="username">
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="password"  v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="code">
            <el-input type="text" @keydown.enter.native="submitLogin" v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" style="width:150px;"></el-input>
            <img :src="verifyCode" title="点击切换验证码" @click="changeverifyCode" />
          </el-form-item>
          <!-- <el-checkbox v-model="checked" class="loginRemember"></el-checkbox><span> 记住我一周</span> -->
          <div>
            <el-button @click="showRegistryDialog" style="width:45% ;margin-right: 15px">注册</el-button>
            <el-button type="primary" style="width:45% ;" @click="submitLogin"  v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
          </div>
        </el-form>
        <div class="login-bottom">
                <h4>
                  <a style="color: #888888;" href="/">返回首页</a>
                    <!-- <a style="color: #888888;" href="/">返回首页<span> | </span></a>
                    <a style="color: #888888;" href="/#/repwd">找回密码</a> -->
                </h4>
            </div>
      </div>
    </el-main>
    <el-dialog title="新用户注册" :before-close="closeRegisterDialog" :visible.sync="registerDialogVisible" width="30%">
      <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" >
        <el-form-item label="用户昵称：" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model=" registerForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录用户名：" :label-width="formLabelWidth" prop="username">
            <el-input v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" :label-width="formLabelWidth" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户头像：" :label-width="formLabelWidth">
          <el-upload
                  action="/ossFileUpload?module=group-chat"
                  ref="upload"
                  list-type="picture-card"
                  :class="{disabled:uploadDisabled}"
                  :before-upload="beforeAvatarUpload"
                  :file-list="fileList"
                  :on-progress="onProgress"
                  :on-success="imgSuccess"
                  :on-error="imgError"
                  :on-remove="imgRemove"
                  >
            <i  class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">只能上传不超过4MB的图片(可使用默认头像！)</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRegisterForm('registerForm') " style="width: 100%">注册</el-button>
      </div>
    </el-dialog>
  </el-container>


</template>

<script>

  export default {
    name: "Login",
    data(){
      var validateNickname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        }
        //检查昵称是否重复
          this.getRequest("user/checkNickname?nickname="+value).then(resp=>{
            if (resp!=0){
              callback(new Error("该昵称已被注册"))
            } else {
              callback();
            }
          })
      };
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        //检查用户名是否重复
        this.getRequest("/user/checkUsername?username="+value).then(resp=>{
            if (resp!=0){
              callback(new Error('该用户名已被注册'));
            }
            else {
              callback();
            }
          })

      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        loginForm:{
           username:'',
           password:'',
           code:''
        },
        verifyCode:'/verifyCode',
        checked:true,
        rules: {
          username:[{required:true,message:'请输入用户名',trigger:'blur'}],
          password:[{required:true,message: '请输入密码',trigger:'blur'}],
          code:[{required:true,message: '请输入验证码',trigger:'blur'}]
        },
        fullscreenLoading:false,
        //注册表单相关
        registerDialogVisible:false,
        formLabelWidth: '120px',
        registerForm:{
          nickname:'',
          username:'',
          password:'',
          checkPass:'',
          avatar:'default_head.jpg',
        },
        registerRules: {
          nickname: [
            { validator: validateNickname, trigger: 'blur' }
          ],
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        uploadDisabled:false,
        //上传的文件信息列表
        fileList:[],
      };
    },
    methods:{
      submitLogin(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.fullscreenLoading=true;
            this.postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
              setTimeout(()=>{
                this.fullscreenLoading=false;
              },1000);
              if (resp){
                //保存当前用户到vuex
                this.$store.state.currentUser=resp.obj;
                //保存登录用户到sessionStorage中
                window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
                let path=this.$route.query.redirect;
                // this.$router.replace((path=='/'||path==undefined)?"/chatroom":path);
                this.$router.replace((path=='/'||path==undefined)?"/user/helloHome":path);
              }else {
                this.changeverifyCode();
              }
            })
          } else {
            this.$message.error("用户名,密码和验证码都不能为空！");
            return false;
          }
        });
      },
      changeverifyCode(){
        this.verifyCode="/verifyCode?time="+new Date();
      },
      // gotoAdminLogin(){
      //   this.$router.replace("/adminlogin");
      // },
      showRegistryDialog(){
        this.registerDialogVisible=true;
      },
      /**
       *       图片上传的方法
       */
      //上传前
      beforeAvatarUpload(file) {
        let isLt4M = file.size / 1024 / 1024 < 4;

        if (!isLt4M) {
          this.$message.error('上传头像图片大小不能超过 4MB!');
        }
        return isLt4M;
      },
      // 上传中
      onProgress(event, file, fileList){
        this.uploadDisabled = true;
      },
      // 图片上传成功
      imgSuccess(response, file, fileList) {
        this.uploadDisabled = true;
        this.registerForm.avatar=response;//将返回的路径给表单的头像属性
        console.log("图片url为："+this.registerForm.avatar);
      },
      // 图片上传失败
      imgError(err, file, fileList){
        this.$message.error("上传失败");
        this.uploadDisabled = false;
      },
      //移除图片
      imgRemove(file,fileList){
        this.uploadDisabled = false;
      },
      closeRegisterDialog(done){
        this.registerForm={//清空表单
          nickname:'',
          username:'',
          password:'',
          checkPass:'',
          avatar:'',
        };
        //this.$refs.upload.clearFiles();//清除上传组件的图片
        done();//关闭对话框
      },
      //提交注册操作
      submitRegisterForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postRequest("/user/register",this.registerForm).then(resp=>{
              if (resp){
                this.registerDialogVisible=false;
                location.reload();//刷新页面，清空注册界面的上传组件中的图片
              }
            })
          } else {
            this.$message.error("请正确填写信息！");
            console.log('error submit!!');
            return false;
          }
        });
      },

    }
  }
</script>


<style>
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


  .disabled .el-upload--picture-card{
    display: none;
  }
  .loginContainer{
    width: 350px;
    margin: 100px auto;
    border-radius:15px ;
    border: 1px solid #eaeaea;
    /*添加阴影 h-shadow(水平阴影位置)，v-shadow(垂直阴影位置)，blur(阴影大小)，color(颜色)*/
    box-shadow: 10px 10px 35px #cac6c6;
    background: #fff;
    /*background-clip——规定背景的绘制区域*/
    /*border-box：背景被裁剪到边框盒*/
    /*padding-box：背景被裁剪到内边距框*/
    /*content-box：背景被裁剪到内容框*/
    background-clip: padding-box;
    padding: 25px 35px 25px 35px;
  }
  .loginTitle{
    margin: 10px auto 30px auto;
    text-align: center;
    color:#505458;
  }
  .loginRemember{
    margin: 5px auto 35px 80px;
  }
  /*.el-form-item__content{*/
  /* display: flex;*/
  /*  align-items: center*/
  /*}*/
  .login-bottom {
    background: #fff;
    padding: 30px 5px 10px;
    border-radius: 0px 0px 25px 25px;
    -webkit-border-radius: 0px 0px 25px 25px;
    -moz-border-radius: 0px 0px 25px 25px;
    -o-border-radius: 0px 0px 25px 25px;
    text-align: right;
    border-top: 2px solid #fff;
}
</style>
