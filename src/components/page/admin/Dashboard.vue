<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="18" style="width: 70%">
                <el-card shadow="hover" style="height: 340px; margin-top: 10px; margin-left: 20px">
                    <div>
                        <schart class="schart" canvasId="pie" :options="options3"></schart>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height: 200px; margin-top: 20px; margin-left: 20px">
                    <div slot="header" class="clearfix">
                        <span>心理咨询预约总览</span>
                    </div>
                    咨询完成：{{ orderView[0] }}次
                    <el-progress :percentage="((orderView[0] * 100) / orderView[3]).toFixed(0)" color="#42b983"></el-progress>
                    咨询进行中：{{ orderView[1] }}次
                    <el-progress :percentage="((orderView[1] * 100) / orderView[3]).toFixed(0)"></el-progress>
                    咨询终止：{{ orderView[2] }}次
                    <el-progress :percentage="((orderView[2] * 100) / orderView[3]).toFixed(0)" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="6" style="width: 28%">
                <el-card shadow="hover" class="mgb20" style="height: 152px; margin-top: 10px">
                    <div class="user-info">
                        <!--                        <img src="src/assets/img/img.jpg" class="user-avator" alt/>-->
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ name }}</div>
                            <!--                            <div>{{role}}</div>-->
                        </div>
                    </div>
                    <div class="user-info-list">
                        <span>{{ clock }}</span>
                    </div>
                </el-card>

                <el-row :gutter="30" class="mgb20">
                    <el-col :span="24">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ userSum }}</div>
                                    <div>用户注册量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="24" style="margin-top: 40px">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ waitRead }}</div>
                                    <div>待处理审核</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="24" style="margin-top: 40px">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ checkConsultant }}</div>
                                    <div>总在册咨询师</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: -20px">
            <el-col :span="12" style="margin-left: 20px; width: 49%">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12" style="width: 49%">
                <el-card
                    shadow="hover"
                    id="commentbox"
                    style="height: 340px; overflow-x: hidden; overflow-y: scroll; line-height: 30px; text-align: center"
                    v-infinite-scroll="load"
                    infinite-scroll-disabled="disabled"
                >
                    <ul class="infinite-list" style="overflow: auto">
                        <h3 style="color: #666666">最新评论</h3>
                        <div style="width: 100%; text-align: left">
                            <div v-for="item in commentcount">
                                <el-divider content-position="left">
                                    <i class="el-icon-user-solid"></i>
                                    <span v-if="item.anonymousflag == 0">{{ item.username }}</span>
                                    <span v-else>匿名评论</span>
                                    <i class="el-icon-time"></i>
                                    {{ item.createtimeString }}
                                    <i class="el-icon-takeaway-box"></i>
                                    {{ item.goodsname }}
                                </el-divider>
                                <el-button type="success" plain
                                    ><span>{{ item.details }}</span></el-button
                                >
                            </div>
                        </div>
                        <!--                        <li v-for="i in count" class="infinite-list-item">{{ i }}</li>-->
                    </ul>
                    <h5 v-if="loading">加载中...</h5>
                    <h5 v-if="noMore">没有更多了</h5>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../../common/admin/bus';

export default {
    name: 'dashboard',
    data() {
        return {
            userSum: '',
            waitRead: '',
            checkConsultant: '',
            orderView: [],
            clock: '', //显示时间
            count: 10, //无限滑动
            commentcount: [], //无限滑动数据
            loading: false, //无限滑动
            countfinal: false, //无限滑动
            name: localStorage.getItem('manage_name'),
            options: {
                type: 'line',
                title: {
                    text: '用户预约统计'
                },
                xRorate: 25,
                labels: ['01-01', '01-01'],
                datasets: [
                    {
                        label: '本月所有用户预约统计',
                        data: [234, 278, 270, 190, 230]
                    }
                ]
            },
            options3: {
                title: { text: '咨询师总览' },
                legend: { position: 'left' },
                bgColor: '#fbfbfb',
                labels: [],
                datasets: [{ data: [] }]
            }
        };
    },
    components: {
        Schart
    },
    created() {
        this.getbingtu();
        this.getorderView();
        this.getintright();
        this.getcommentcount();
        this.getorderbyM();
        // this.handleListener();
        // this.changeDate();
    },
    mounted() {
        this.$nextTick(() => {
            setInterval(this.CurrentTime, 1000);
        });
    },
    computed: {
        noMore() {
            return this.countfinal;
        },
        disabled() {
            return this.loading || this.noMore;
        }
    },
    methods: {
        load() {
            this.loading = true;
            setTimeout(() => {
                this.count += 2;
                this.getcommentcount();
                this.loading = false;
            }, 2000);
        },
        //查询本月每天订单量
        getorderbyM() {
            this.$axios.get('/api/adminhome/adminHomeOrderByM').then((res) => {
                this.options.labels = res[1];
                this.options.datasets[0].data = res[0];
                console.log(res);
                console.log(this.options);
            });
        }, //无限滑动评论更新
        getcommentcount() {
            this.$axios.get('/api/adminhome/adminHomeViewCommentLimit?offset=0&limit=' + this.count).then((res) => {
                if (this.commentcount.length >= res.length) this.countfinal = true;
                this.commentcount = res;
                this.changeData();
            });
        },
        changeData() {
            const length = this.commentcount.length;
            for (let i = 0; i < length; i++) {
                var createtime = new Date(this.commentcount[i].createtime);
                var month = createtime.getMonth() + 1;
                this.commentcount[i].createtimeString =
                    createtime.getFullYear() +
                    '-' +
                    month +
                    '-' +
                    createtime.getDate() +
                    ' ' +
                    createtime.getHours() +
                    ':' +
                    createtime.getMinutes();
            }
        },
        getbingtu() {
            this.$axios.get('/api/adminhome/adminhomepageAllConsultant').then((res) => {
                this.options3.labels = res[0];
                this.options3.datasets[0].data = res[1];
            });
        },
        getorderView() {
            this.$axios.get('/api/adminhome/orderView').then((res) => {
                this.orderView = res;
            });
        },
        getintright() {
            this.$axios.get('/api/adminhome/userSum').then((res) => {
                this.userSum = res;
            });
            this.$axios.get('/api/adminhome/waitRead').then((res) => {
                this.waitRead = res;
            });
            this.$axios.get('/api/adminhome/checkConsultant').then((res) => {
                this.checkConsultant = res;
            });
        },
        CurrentTime() {
            var getTime = new Date();
            var year = getTime.getFullYear(); //年
            var month = getTime.getMonth() + 1; //月
            var day = getTime.getDate(); //日
            var hh = getTime.getHours(); //时
            var mm = getTime.getMinutes(); //分
            var ss = getTime.getSeconds(); //秒
            var clock = year + '年';
            if (month < 10) clock += '0';
            clock += month + '月';
            if (day < 10) clock += '0';
            clock += day + '日 ';
            if (hh < 10) clock += '0';
            clock += hh + ':';
            if (mm < 10) clock += '0';
            clock += mm + ':';
            if (ss < 10) clock += '0';
            clock += ss;
            this.clock = clock;
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 25px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 30px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    margin-left: 110px;
    font-size: 28px;
    color: #222;
}

.user-info-list {
    text-align: center;
    font-size: 24px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 20px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}

#commentbox::-webkit-scrollbar {
    display: none;
}
</style>
