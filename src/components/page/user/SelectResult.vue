<template>
    <div style="font-size: 16.75px; margin-top: -30px">
        <div>
            <div id="consult-index">
                <div class="container">
                    <div class="left-container">
                        <div class="selected-box">
                            <div class="selected" v-for="(item, index) in filterBox" :key="index">
                                <span class="label">{{ item.name }}</span>
                                <ul class="selected-list">
                                    <li
                                        class="selected-item"
                                        v-for="(v, i) in item.items"
                                        :key="i"
                                        @click="clickrange(index, v, i)"
                                        :class="{ active: v.active }"
                                    >
                                        <a href="#"> {{ v.text }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="teacher-box">
                            <div class="top-box">
                                <span class="title">心理咨询师</span>
                                <div class="search-box">
                                    <el-input placeholder="搜索咨询师名字" v-model="query.searchkey" style="width: 200px"></el-input>
                                    <el-button
                                        class="search-btn el-button--infoSearch"
                                        icon="el-icon-search"
                                        @click="getconsltByQuery()"
                                    ></el-button>
                                    <!-- <input type="text" placeholder="搜索咨询师名字" /> -->
                                    <!-- <i class="icon icon-node-website icon-search" icon="el-icon-search" @click="submitSearch()"></i> -->
                                </div>
                            </div>
                            <ul class="sort-list">
                                <li class="sort-item active">
                                    默认排序
                                    <!-- <a href="https://www.xinli001.com/consult"> 默认排序</a> -->
                                </li>
                                <!-- <li class="sort-item">
                                    <a href="https://www.xinli001.com/consult"> 预约最多</a>
                                </li>
                                <li class="sort-item">
                                    <a href="https://www.xinli001.com/consult"> 最新入驻</a>
                                </li> -->
                            </ul>
                            <ul class="teacher-list" :data="consultantList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
                                <li class="teacher-item" v-for="item in consultantList" :key="item.id">
                                    <a @click="goConsultantDesc(item.id)">
                                        <img :src="item.photoUrl" class="avatar" />
                                    </a>
                                    <ul class="teacher-info">
                                        <li class="basic-info">
                                            <a @click="goConsultantDesc(item.id)" class="name">
                                                {{ item.nickname }}&nbsp;&nbsp;&nbsp;&nbsp;</a
                                            >
                                            <span class="zx_num"> {{ item.cases }}人次咨询 </span>
                                            <span class="point">·</span>
                                            <span class="experience_year">从业{{ item.workyear }}年</span>
                                            <!--<span class="point">·</span>
                                             <span class="city">上海市</span> -->
                                        </li>
                                        <li class="honor">{{ item.title }}</li>
                                    </ul>
                                    <a @click="goConsultantDesc(item.id)">
                                        <span class="yuyue">预约</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="block">
                                <!-- <span class="demonstration">页数较少时的效果</span> -->
                                <!-- <el-pagination layout="prev, pager, next" :total="50"> </el-pagination> 
                                @size-change="handleSizeChange"-->
                                <el-pagination
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    layout="total, prev, pager, next"
                                    :total="consultantList.length"
                                >
                                    //这是显示总共有多少数据，
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <div class="right-container">
                        <div class="apply">
                            <a href="https://www.xinli001.com/zx/apply-new"
                                ><div class="apply-btn">
                                    <i class="icon icon-node-website icon-pc-zx-residence"></i>
                                    心理咨询师申请入驻
                                </div></a
                            >
                            <a href="https://www.xinli001.com/info/100476329"
                                ><div class="standard">
                                    <i class="icon icon-node-website icon-pc-zx-standard"></i>
                                    壹心理咨询师入驻标准
                                </div></a
                            >
                        </div>
                        <div class="apply-new-teacher-list">
                            <div class="title">最新入驻心理咨询师</div>
                            <ul class="teacher-list" :data="consultantList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
                                <li class="teacher-item" v-for="item in consultantList" :key="item.id">
                                    <a @click="goConsultantDesc(item.id)"><img :src="item.photoUrl" class="avatar" /></a>
                                    <div class="teacher-info">
                                        <p class="name-price">
                                            <a @click="goConsultantDesc(item.id)" class="name">
                                                {{ item.nickname }}&nbsp;&nbsp;&nbsp;&nbsp;
                                            </a>
                                        </p>
                                        <p class="honor ellipsis-1">{{ item.title }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- <div class="teacher-answer">
                            <div class="top">
                                <div class="title">咨询师问答</div>
                                <a href="https://www.xinli001.com/qa?source=pc-consult"
                                    ><div class="more">更多 <i class="icon icon-node-website icon-m-right"></i></div
                                ></a>
                            </div>
                            <ul class="teacher-answer-list">
                                <li class="teacher-answer-item">
                                    <a href="https://m.xinli001.com/qa/answer-6004658/?source=pc-consult"
                                        ><div class="info-box">
                                            <p class="info">
                                                <a href="https://www.xinli001.com/expert/9100417"
                                                    ><img
                                                        src="https://ossimg.xinli001.com/20180831/44f644acd729697fcd8b8641cae4cf4e.jpg!120?x-oss-process=image/resize,w_750"
                                                        alt="姚元启"
                                                        class="avatar"
                                                /></a>
                                                <a href="https://www.xinli001.com/expert/9100417"
                                                    ><span class="name ellipsis-1">姚元启</span></a
                                                >
                                                <span class="answer-txt">回答了问题</span>
                                            </p>
                                            <span class="time ellipsis-1">2022-04-01</span>
                                        </div>
                                        <p class="content">24岁女生初恋因为男友不是处男而痛苦</p></a
                                    >
                                </li>

                                <li class="teacher-answer-item">
                                    <a href="https://m.xinli001.com/qa/answer-6004612/?source=pc-consult"
                                        ><div class="info-box">
                                            <p class="info">
                                                <a href="https://www.xinli001.com/expert/1791250"
                                                    ><img
                                                        src="https://ossimg.xinli001.com/20191025/46a5dc110a872b97de8d44bfbe28fe8d.jpg!120?x-oss-process=image/resize,w_750"
                                                        alt="李丽峰"
                                                        class="avatar"
                                                /></a>
                                                <a href="https://www.xinli001.com/expert/1791250"
                                                    ><span class="name ellipsis-1">李丽峰</span></a
                                                >
                                                <span class="answer-txt">回答了问题</span>
                                            </p>
                                            <span class="time ellipsis-1">2022-03-31</span>
                                        </div>
                                        <p class="content">无解 咨询</p></a
                                    >
                                </li>
                            </ul>
                        </div> -->
                    <!-- <div class="teacher-article">
                            <div class="top">
                                <div class="title">咨询师文章</div>
                                <a href="https://www.xinli001.com/info?source=pc-consult"
                                    ><div class="more">
                                        更多
                                        <i class="icon icon-node-website icon-m-right"></i></div
                                ></a>
                            </div>
                            <ul class="teacher-article-list">
                                <li>
                                    <a href="https://www.xinli001.com/info/100482509" class="teacher-article-item"
                                        ><img
                                            src="https://ossimg.xinli001.com/20220331/eab675d5f614f938ae126032a857e672.jpeg?x-oss-process=image/resize,m_fill,w_468"
                                            class="cover"
                                        />
                                        <div class="article-detail">
                                            <p class="title ellipsis-2">为什么我们总是遇到“渣男”？总是失败？总是不幸？</p>
                                            <div class="teacher-info">
                                                <p class="info">
                                                    <img
                                                        src="https://ossimg.xinli001.com/op/df/2022125/1643078255872JMVgNg3CoHLNHA0b6lJLK4SFINnHL4X0.jpg!120"
                                                        alt="赵军"
                                                        class="avatar"
                                                    />
                                                    <span class="name">赵军</span>
                                                </p>
                                                <span class="time">2022-03-31</span>
                                            </div>
                                        </div></a
                                    >
                                </li>

                                <li>
                                    <a href="https://www.xinli001.com/info/100482482" class="teacher-article-item"
                                        ><img
                                            src="https://ossimg.xinli001.com/20220330/9dad405108b0633e334e553af6b63050.jpeg?x-oss-process=image/resize,m_fill,w_468"
                                            class="cover"
                                        />
                                        <div class="article-detail">
                                            <p class="title ellipsis-2">【专项培训】焦点解决短期咨询技术</p>
                                            <div class="teacher-info">
                                                <p class="info">
                                                    <img
                                                        src="https://ossimg.xinli001.com/20170623/974e74ce1614efa9dea925d2f6201d69.png!120"
                                                        alt="刘在英"
                                                        class="avatar"
                                                    />
                                                    <span class="name">刘在英</span>
                                                </p>
                                                <span class="time">2022-03-30</span>
                                            </div>
                                        </div></a
                                    >
                                </li>
                            </ul>
                        </div> -->
                    <!-- </div> -->
                </div>

                <!---->
            </div>
        </div>

        <div id="_aihecong_chat_container_start">
            <span data-reactroot=""
                ><div id="_aihecong_chat_container_body" class="_hecong_no_button" style="display: none">
                    <div>
                        <div
                            class="_aihecong_chat_iframe _aihecong_chat_iframe_center react-draggable"
                            style="
                                touch-action: none;
                                bottom: 95px;
                                border-radius: 33px;
                                width: 361px;
                                height: 400px;
                                transform: translate(0px, 0px);
                            "
                        >
                            <iframe
                                id="_aihecong_chat_iframe"
                                src="https://pubres.aihecong.com/web/iframe0512/webchat.html"
                                allowfullscreen=""
                                style="display: block"
                            ></iframe>
                            <div class="_aihecong_chat_iframe_drop" style="height: 55px">
                                <div class="_aihecong_chat_iframe_close"></div>
                            </div>
                        </div>
                    </div></div
            ></span>
        </div>
    </div>

    <!-- <div style="float: left; width: 100%">
        <div style="width: 100%; background-color: #d2d7d7">
            <div style="float: left; width: 10%; margin-top: 30px; text-align: center" v-for="(item, index) in kindlist" :key="item.kid">
                <a @click="kindClick(item.kid)" target="_blank">
                    <div class="figure figure-thumb">
                        <img :src="item.kimg" style="border-radius: 20px" alt="" width="100px" height="80px" />
                    </div>
                    <div class="title" style="margin-top: 15px; font-size: 12px; color: #666666">{{ item.kname }}</div>
                                          <p class="price" style="margin-top:5px;font-size: 12px;color: #fc0d5a">1999元起</p>-->
    <!-- </a>
            </div>
        </div>

        <div style="float: left; width: 100%">
            <div v-if="consultantList.length == 0" style="text-align: center; margin-top: 100px; margin-bottom: 100px">
                <img src="http://127.0.0.1:8000/images/nogoods.png" alt="" />
            </div>
            <div
                class="card"
                v-for="(item, index) in consultantList"
                :key="item.goodsid"
                v-on:mouseenter="showDialog(index)"
                v-on:mouseleave="hideDialog(index)"
            >
                <div class="ribbon"> -->
    <!--鼠标移入移出事件-->
    <!-- <div class="handleDialog" v-if="ishow && index == current">
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
    </div>  -->
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
                cousltway: '',
                cousltgender: '',
                pageIndex: 1,
                pageSize: 10
            },
            oneIndex: -1,
            pageTotal: 0,
            ishow: false,
            topmsg: false,
            currentPage: 1, //初始页
            pagesize: 10,
            current: 0,
            selectd: '',
            // currentDate: new Date(),
            consultantList: [],
            // ConsltTypeList: [],
            // way: { 0: '全部', 1: '语音咨询', 2: '视频咨询', 3: '面对面咨询' },
            // cities:[],
            // 选中的参数
            filterSelected: {
                type: 0,
                way: 0,
                gender: ''
            },
            filterBox: [
                {
                    name: '类别:',
                    key: 'type',
                    defaultVal: 0, // 默认值（全部选项的值）
                    items: [
                        { value: 0, text: '全部', active: true },
                        { value: 1, text: '婚姻家庭', active: false },
                        { value: 2, text: '亲子教育', active: false },
                        { value: 3, text: '职场心理', active: false },
                        { value: 4, text: '情绪管理', active: false },
                        { value: 5, text: '心理健康', active: false },
                        { value: 6, text: '个人成长', active: false },
                        { value: 7, text: '恋爱心理', active: false },
                        { value: 8, text: '人际管理', active: false },
                        { value: 9, text: '性心理', active: false }
                    ]
                },
                {
                    name: '方式:',
                    key: 'way',
                    defaultVal: 0,
                    items: [
                        { value: 0, text: '全部', active: true },
                        { value: 1, text: '语音咨询', active: false },
                        { value: 2, text: '视频咨询', active: false },
                        { value: 3, text: '面对面', active: false }
                    ]
                },
                {
                    name: '性别:',
                    key: 'gender',
                    defaultVal: '',
                    items: [
                        { value: '', text: '不限', active: true },
                        { value: '0', text: '男咨询师', active: false },
                        { value: '1', text: '女咨询师', active: false }
                    ]
                }
            ]
        };
    },
    created() {
        // this.query.kind = this.$route.query.kind;
        this.query.uid = this.$route.query.uid;
        this.query.searchkey = this.$route.query.searchkey;
        this.getconsltByQuery();
        // getConsultantList().then((data) => {
        //     this.ConsultantList = data;
        // });
        // getTypeList().then((data) => {
        //     this.ConsltTypeList = data;
        // });
    },
    methods: {
        // 筛选框点击事件
        clickrange(parentIndex, el, childIndex) {
            var selKey = this.filterBox[parentIndex].key;
            var selKeyDefaultVal = this.filterBox[parentIndex].defaultVal;
            var item = this.filterBox[parentIndex].items;
            item.filter((v, i) => {
                if (i === childIndex) {
                    v.active = !v.active; // 选中和反选
                    if (v.active === true) {
                        this.filterSelected[selKey] = v.value;
                    } else {
                        // 反选
                        // 不允许反选“全部”这个选项
                        if (childIndex === 0) {
                            v.active = true;
                        }
                        // 设为默认值
                        this.filterSelected[selKey] = selKeyDefaultVal;
                    }

                    console.log('选中后', this.filterSelected);
                } else {
                    v.active = false; // 取消选中，实现一行只选一个
                }
            });

            // 重新请求列表接口
            this.getconsltByQuery();
        },
        getconsltByQuery() {
            this.query.kind = this.filterSelected.type;
            this.query.cousltway = this.filterSelected.way;
            this.query.cousltgender = this.filterSelected.gender;
            // 有分页的话要重置会第一页，不能可能没有数据！！！！！！！！！！！！！！！！！！

            axios
                .post('/api/consultant/selectResult', this.query)
                .then((res) => {
                    this.consultantList = res.records;
                    console.log(res.records);
                })
                .catch((error) => {
                    console.log('接口请求异常');
                });
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            console.log(this.currentPage); //点击第几页
        },
        getCouponSelected() {
            //获取选中的优惠券
            console.log(this.couponSelected);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //前往商品详情页
        goConsultantDesc(consultant) {
            this.$router.push({
                path: '/consultant/consultantDesc',
                query: {
                    consultant: consultant
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
        },
        kindClick(kindid) {
            this.$router.push({
                path: '/user/selectkindTemp',
                query: {
                    kind: kindid
                }
            });
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

/* .ribbon {
    display: inline-block;
    width: 100%;
    height: 70%;
    position: relative;
    float: left;
    margin-bottom: 30px;
    background-size: cover;
    text-transform: uppercase;
    color: white;
} */

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

#consult-index {
    background: #f9f8fd;
    margin-top: -7%;
    margin-top: 40px;
}

#consult-index .header {
    width: 100%;
    background: #fff;
    height: 70px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
}

#consult-index .container {
    width: 87%;
    margin: auto;
    display: flex;
    justify-content: space-between;
}

#consult-index .container .left-container {
    width: 750px;
    box-sizing: border-box;
    padding: 30px 40px;
    background: #fff;
    box-shadow: 0 20px 40px 0 rgba(227, 225, 237, 0.57);
    border-radius: 20px;
}

#consult-index .container .left-container .selected-box {
    width: 100%;
    box-sizing: border-box;
    position: relative;
}

#consult-index .container .left-container .selected-box .selected {
    margin-bottom: 13px;
    display: flex;
}

#consult-index .container .left-container .selected-box .selected .label {
    float: left;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #21252d;
    box-sizing: border-box;
    width: 36px;
    position: relative;
    top: -3px;
    white-space: nowrap;
}

#consult-index .container .left-container .selected-box .selected .selected-list {
    width: 524px;
    margin-left: 15px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #566171;
}

#consult-index .container .left-container .selected-box .selected .selected-list .selected-item {
    display: inline-block;
    margin-left: 28px;
    margin-bottom: 10px;
    white-space: nowrap;
}

#consult-index .container .left-container .selected-box .selected .selected-list .selected-item a {
    color: #566171;
}

#consult-index .container .left-container .selected-box .selected .selected-list .selected-item.active a {
    color: #6982fa !important;
}

#consult-index .container .left-container .selected-box .selected {
    margin-bottom: 13px;
    display: flex;
}

#consult-index .container .left-container .selected-box .selected.price {
    margin-bottom: -20px;
}

#consult-index .container .left-container .teacher-box {
    margin-top: 40px;
    width: 100%;
    box-sizing: border-box;
}

#consult-index .container .left-container .teacher-box .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#consult-index .container .left-container .teacher-box .top-box .title {
    font-family: PingFangSC-Medium;
    font-size: 22px;
    color: #21252d;
    position: relative;
    padding-left: 12px;
    font-weight: 700;
}

#consult-index .container .left-container .teacher-box .top-box .search-box {
    position: relative;
}

#consult-index .container .left-container .teacher-box .top-box .search-box input {
    background: #f3f4f5;
    border-radius: 18px;
    padding: 10px 20px;
    width: 220px;
    height: 36px;
    box-sizing: border-box;
    border: 0;
}

#consult-index .container .left-container .teacher-box .top-box .search-box .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #bcc2cf;
}

#consult-index .container .left-container .teacher-box .sort-list {
    display: flex;
    margin-top: 12px;
    margin-bottom: 18px;
}

#consult-index .container .left-container .teacher-box .sort-list .sort-item {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    margin-right: 40px;
    cursor: pointer;
}

#consult-index .container .left-container .teacher-box .sort-list .sort-item.active a {
    color: #6982fa;
}

#consult-index .container .left-container .teacher-box .sort-list .sort-item a {
    color: #566171;
}

.mo-paging[data-v-a1038638] {
    display: block;
    padding: 0;
    margin: 0 auto;
    font-size: 0;
    list-style: none;
    user-select: none;
    text-align: center;
}

#consult-index .container .left-container .teacher-box .teacher-list .teacher-item {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    height: 100px;
}

#consult-index .container .left-container .teacher-box .teacher-list .teacher-item .teacher-info {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#consult-index .container .left-container .teacher-box .teacher-list .teacher-item .teacher-info .basic-info {
    display: flex;
    align-items: center;
}

#consult-index .container .left-container .teacher-box .teacher-list .teacher-item .avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
    box-sizing: border-box;
}

#consult-index .container .left-container .teacher-box .teacher-list .teacher-item .teacher-info .basic-info .name {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    font-weight: 700;
    color: #21252d;
    cursor: pointer;
}

#consult-index .container .left-container .teacher-box .teacher-list .teacher-item .teacher-info .basic-info .point {
    margin: 0 5px;
    font-size: 18px;
    color: #bcc2cf;
}

#consult-index .container .left-container .teacher-box .teacher-list .teacher-item .teacher-info .honor {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #566171;
}

#consult-index .container .left-container .teacher-box .teacher-list .teacher-item .yuyue {
    display: inline-block;
    padding: 11px 24px;
    border: 1px solid #6982fa;
    border-radius: 20px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #6982fa;
    text-align: right;
    line-height: 16px;
    cursor: pointer;
    white-space: nowrap;
}
#consult-index .container .right-container {
    width: 400px;
}
#consult-index .container .right-container .apply {
    padding: 30px 20px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 20px 40px 0 rgba(227, 225, 237, 0.57);
    border-radius: 14px;
    text-align: center;
}
#consult-index .container .right-container .apply .apply-btn {
    padding: 18px 0;
    background: #6982fa;
    box-shadow: 0 20px 40px 0 rgba(227, 225, 237, 0.57);
    border-radius: 34px;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #fff;
    margin-bottom: 20px;
    cursor: pointer;
}
#consult-index .container .right-container .apply .apply-btn .icon {
    font-size: 20px;
}
#consult-index .container .right-container .apply-new-teacher-list {
    padding: 30px 20px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 20px 40px 0 rgba(227, 225, 237, 0.57);
    border-radius: 14px;
    margin-top: 20px;
}
#consult-index .container .right-container .apply-new-teacher-list .title {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    font-weight: 700;
    color: #21252d;
    position: relative;
    padding-left: 12px;
}
#consult-index .container .right-container .apply-new-teacher-list .teacher-list {
    margin-top: 13px;
}
#consult-index .container .right-container .apply-new-teacher-list .teacher-list .teacher-item .avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    margin-right: 14px;
    cursor: pointer;
}
#consult-index .container .right-container .apply-new-teacher-list .teacher-list .teacher-item {
    display: flex;
    margin-bottom: 8px;
    height: 70px;
}
</style>
