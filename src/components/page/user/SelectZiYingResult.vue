<template>
    <div style="width: 100%; height: 100%">
        <div style="text-align: center">
            <h2 style="padding: 30px">专业服务</h2>
            <h3>针对两性心理、社交沟通、夫妻关系、亲子关系、家庭教育、专业督导、个人成长等等不同领域的困惑，并提供专业的心理咨询服务。</h3>
        </div>
        <div id="consult-index">
            <div class="content">
                <div class="content-item">
                    <img class="pic-left" src="http://127.0.0.1:8000/images/others/011ef15ad054eba80121386751c8fb.jpg" alt="" />
                    <div>
                        <!-- <span class="detial-right">亲密关系</span> -->
                    </div>
                </div>
                <!-- <div class="content-item">
                <img class="pic-right" src="http://127.0.0.1:8000/images/others/019518579c1aa70000012e7e8f388e.jpg" alt="" />
                <div>
                    <span class="detial-left">亲密关系</span>

                </div>
            </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'index',
    data() {
        return {
            query: {
                kind: '',
                searchkey: '',
                pageIndex: 1,
                pageSize: 15
            }
        };
    },
    created() {},
    methods: {}
};
</script>

<style scoped>
#consult-index {
    background: #f9f8fd;
    margin-top: 5%;
}
#consult-index .content {
    width: 1200px;
    margin: 90px 250px 80px;
    display: flex; 
    justify-content: space-between;
}
.content-item {
    height: 200px;
}
.content-item .pic-left {
    width: 70%;
    height: 100%;
}
.content-item .detial-right {
    width: 400px;
    padding: 30px 20px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 20px 40px 0 rgba(227, 225, 237, 0.57);
    border-radius: 14px;
    text-align: center;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

/**
    隐藏页
    */
.handleDialog {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
}

/**
    卡片
     */

.card {
    height: 350px;
    width: 266px;
    margin-left: 45px;
    margin-top: 30px;
    margin-bottom: 50px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 4px;
    float: left;
}

.card img {
    width: 100%;
    height: 70%;
}

.card span {
    font-size: 15px;
    color: #bfbfbf;
    display: block;
    letter-spacing: 2px;
    /*padding: 0px 20px;*/
}

/**
    丝带
     */

.ribbon {
    display: inline-block;
    width: 100%;
    height: 70%;
    position: relative;
    float: left;
    margin-bottom: 30px;
    background-size: cover;
    text-transform: uppercase;
    color: white;
}

.wrap {
    width: 100%;
    height: 188px;
    position: absolute;
    top: -8px;
    left: 8px;
    overflow: hidden;
}

.wrap:before {
    content: '';
    display: block;
    border-radius: 8px 8px 0px 0px;
    width: 40px;
    height: 8px;
    position: absolute;
    right: 100px;
    background: #4d6530;
}

.wrap:after {
    content: '';
    display: block;
    border-radius: 0px 8px 8px 0px;
    width: 8px;
    height: 40px;
    position: absolute;
    right: 0px;
    top: 100px;
    background: #4d6530;
}

.ribbon6 {
    display: inline-block;
    text-align: center;
    width: 200px;
    height: 40px;

    line-height: 40px;
    position: absolute;
    top: 30px;
    right: -50px;
    z-index: 2;
    overflow: hidden;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    border: 1px dashed;
    box-shadow: 0 0 0 3px #57dd43, 0px 21px 5px -18px rgba(0, 0, 0, 0.6);
    background: #57dd43;
}

/* 顶栏容器CSS */
.el-header .el-menu {
    max-width: 1225px;
    margin: 0 auto;
}

.el-header .logo {
    height: 60px;
    width: 189px;
    float: left;
    margin-right: 100px;
}

.el-header .so {
    margin-top: 10px;
    width: 300px;
    float: right;
}

/*.el-menu-demo:hover{*/
/*    background-color: #00a854 !important;*/
/*}*/

.el-menu-demo-item:hover {
    background-color: #f7f7f7 !important;
}

/* 顶栏容器CSS END */
</style>
