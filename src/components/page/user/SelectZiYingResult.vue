<template>
    <div style="float: left; width: 100%">
        <div
            class="card"
            v-for="(item, index) in goodsList"
            :key="item.goodsid"
            v-on:mouseenter="showDialog(index)"
            v-on:mouseleave="hideDialog(index)"
        >
            <div class="ribbon">
                <!--鼠标移入移出事件-->
                <div class="handleDialog" v-if="ishow && index == current">
                    <el-button
                        type="success"
                        style="margin-left: 30%; margin-top: 70%"
                        size="medium"
                        @click="goConsultantDesc(item.goodsid)"
                        >查看详情
                    </el-button>
                </div>
                <img :src="item.iconurl" style="height: 100%; width: 100%" />
            </div>
            <div style="text-align: center">
                <span>{{ item.goodsname }}</span>
                <span style="color: red">&yen;{{ item.price }}</span>
                <span>/{{ item.spec }}</span>
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
            },
            pageTotal: 0,
            ishow: false,
            topmsg: false,
            current: 0,
            selectd: '',
            currentDate: new Date(),
            goodsList: []
        };
    },
    created() {
        this.getgoodsList();
    },
    methods: {
        getgoodsList() {
            axios
                .get('/api/goods/selectShowZiYing')
                .then((res) => {
                    this.goodsList = res.data;
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log('接口请求异常');
                });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //前往商品详情页
        goConsultantDesc(goods) {
            this.$router.push({
                path: '/consultant/consultantDesc',
                query: {
                    goods: goods
                }
            });
        },
        //显示操作项
        showDialog(index, item) {
            this.ishow = true;
            this.current = index;
        },
        //隐藏蒙层
        hideDialog(index, item) {
            this.ishow = false;
            this.current = null;
        },
        mouseenter1() {
            this.topmsg = true;
        },
        mouseleave1() {
            this.topmsg = false;
        }
    }
};
</script>

<style scoped>
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
