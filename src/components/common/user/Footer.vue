<template>
    <div style="width: 100%">
        <center>
            <div style="position: absolute; right: 7%; bottom: 10%">
                <el-tooltip class="item" effect="dark" content="返回顶层" placement="left-start">
                    <a href="#top"><el-button size="medium" icon="el-icon-arrow-up" circle></el-button></a>
                </el-tooltip>
                <br /><br />
                <el-tooltip class="item" effect="dark" content="刷新" placement="left-start">
                    <el-button size="medium" @click="goTop()" icon="el-icon-refresh-right" circle></el-button>
                </el-tooltip>
                <br /><br />
                <a href="">
                    <el-tooltip class="item" effect="dark" content="联系店家QQ" placement="left-start">
                        <a href="http://wpa.qq.com/msgrd?v=3&uin=2905257286&site=qq&menu=yes"
                            ><el-button size="medium" icon="el-icon-position" circle></el-button
                        ></a>
                    </el-tooltip>
                </a>
            </div>
        </center>
        <el-footer style="width: 100%; padding: 0px;">
            <div class="footer">
                <div class="ng-promise-box">
                    <div class="ng-promise">
                        <p class="text">
                            <a class="icon1" href="javascript:;">服务热线</a>
                            <a class="icon2" href="javascript:;">质量服务</a>
                            <a class="icon3" style="margin-right: 0" href="javascript:;">值得信赖</a>
                        </p>
                    </div>
                </div>
                <!--                <div class="github">-->
                <!--                    <a href="" target="_blank">-->
                <!--                        <div class="github-but"></div>-->
                <!--                    </a>-->
                <!--                </div>-->
                <div class="mod_help">
                    <p>
                        <router-link to="/user/helloHome">首页</router-link>
                        <span>|</span>
                        <router-link to="/user/helloHome">关于我们</router-link>
                    </p>
                    <p class="coty">大白心理咨询版权所有 &copy; 2021-2021</p>
                </div>
            </div>
        </el-footer>
    </div>
</template>
<script>
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'admin',
            message: 2
        };
    },
    methods: {
        //前往页面头部
        goTop() {
            location.reload();
        }
        //前往客服
        // gokefu() {
        //   location.reload();//刷新页面
        // },
    }
};
</script>
<style scoped>
/* 底栏容器CSS */
.footer {
    width: 100%;
    text-align: center;
    background: #2f2f2f;
    padding-bottom: 20px;
}

.footer .ng-promise-box {
    border-bottom: 1px solid #3d3d3d;
    line-height: 145px;
}

.footer .ng-promise-box {
    margin: 0 auto;
    border-bottom: 1px solid #3d3d3d;
    line-height: 145px;
}

.footer .ng-promise-box .ng-promise p a {
    color: #fff;
    font-size: 20px;
    margin-right: 210px;
    padding-left: 44px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    text-decoration: none;
    background: url('../../../assets/imgs/us-icon.png') no-repeat left 0;
}

.footer .github {
    height: 50px;
    line-height: 50px;
    margin-top: 20px;
}

.footer .github .github-but {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    background: url('../../../assets/imgs/github.png') no-repeat;
}

.footer .mod_help {
    text-align: center;
    color: #888888;
}

.footer .mod_help p {
    margin: 20px 0 16px 0;
}

.footer .mod_help p a {
    color: #888888;
    text-decoration: none;
}

.footer .mod_help p a:hover {
    color: #fff;
}

.footer .mod_help p span {
    padding: 0 22px;
}

/* 底栏容器CSS END */
</style>
