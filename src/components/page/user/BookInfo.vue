<template>
    <div>
        <el-button plain @click="returnPage" style="margin-left: 13%; font-size: 18px; margin-top: 20px">返回</el-button>
        <!-- <el-page-header @back="goBack" style="margin-left: 13%; padding: 20px"> </el-page-header> -->
        <div>
            <el-steps
                :active="index"
                space="300px"
                align-center
                style="width: 80%; margin-top: 22px; margin-left: 15%; margin-bottom: 25px"
            >
                <el-step title="选择咨询师" size="mini"></el-step>
                <el-step title="填写基本信息"></el-step>
                <el-step title="填写咨询内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <div style="display: flex; justify-content: center; align-items: center; width: 90%">
                <div v-show="index == 1" style="width: 500px">
                    <el-form :model="consellform" label-width="150px">
                        <h3>填写基本信息</h3>
                        <br /><br />
                        <el-form-item label="预约老师" v-model="consellform.consltId">
                            <img :src="Consultant.consltPhoto" style="width: 60px; height: 60px" class="avatar" />
                            <span style="font-size: 18px; padding-left: 20px">{{ Consultant.nickname }}</span>
                        </el-form-item>
                        <el-form-item label="咨询方式">
                            <el-select placeholder="请选择咨询方式" v-model="consellform.way">
                                <el-option v-for="way in consltWay" :key="way" :value="way" :label="ways[way]"></el-option>
                            </el-select>
                            <!-- <el-input v-model="consellform.way" size="medium"></el-input> -->
                        </el-form-item>
                        <el-form-item label="预约时间">
                            <el-select v-model="consellform.startTime" placeholder="请选择" @change="selectedTime">
                                <el-option
                                    v-for="item in consltSchedule"
                                    :key="item.id"
                                    :label="transformTime(item.startTime)"
                                    :value="item.startTime"
                                >
                                </el-option>
                            </el-select>
                            <span v-if="isselectTime">-</span>
                            <span v-if="isselectTime">{{ transformTime(consellform.endTime) }}</span>
                        </el-form-item>
                        <el-form-item
                            class="input-prepend restyle no-radius"
                            label="联系方式"
                            :rules="[
                                { required: true, message: '请输入手机号码', trigger: 'blur' },
                                { validator: checkPhone, trigger: 'blur' }
                            ]"
                        >
                            <el-input v-model="consellform.tel" size="medium"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-show="index == 2">
                    <h3>填写咨询内容</h3>
                    <br /><br />
                    <el-form :model="consellform" label-width="150px">
                        <el-form-item label="咨询类型">
                            <el-select placeholder="请选择咨询方式" v-model="consellform.type">
                                <el-option
                                    v-for="(item, index) in consltArea"
                                    :key="index"
                                    :value="item.typeId"
                                    :label="item.tname"
                                ></el-option>
                            </el-select>
                            <!-- <el-input v-model="consellform.tel" size="medium"></el-input> -->
                        </el-form-item>
                        <el-form-item label="详细情况">
                            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="consellform.detail"> </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-show="index == 3">
                    <el-button type="success" icon="el-icon-check" circle size="medium"></el-button>
                    <h4>完成</h4>
                    <br /><br /><br /><br />
                    <router-link to="/user/helloHome">返回首页</router-link>
                </div>
            </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: center; padding: 0px; padding-bottom: 7%">
            <el-button round size="mini" v-if="index == 2" @click="index--">上一步</el-button>
            <el-button type="primary" round size="mini" @click="next" v-text="index == 2 ? '提交' : '下一步'" v-show="showStep"></el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bookInfo',
    data() {
        return {
            Consultant: {
                // ConsltId: '0',
                consltName: '',
                consltPhoto: ''
            },
            orderid: '',
            payWay: '1',
            tableData: [],
            pinglunVisible: false,
            consltArea: [],
            consltWay: [],
            ways: { 0: '即时聊天咨询', 1: '语音咨询', 2: '视频咨询', 3: '面对面咨询' },
            // param: {
            //     details: '',
            //     uid: '',
            //     orderid: '',
            //     anonymousflag: '0'
            // },
            index: 1,
            consellform: {
                ConsltId: 0,
                userId: 0,
                endTime: 0
            },
            consltSchedule: [],
            isselectTime: false,
            showStep: true,
            user: {}
        };
    },
    created() {
        this.user = this.$store.state.currentUser;
        if (!this.user) {
            this.$router.push('/user/helloHome');
            this.$message.error('用户未登录');
        }
        // if (this.$route.query.orderid == null) {
        //     this.$message.error('订单不存在');
        //     this.$router.push('/user/helloHome');
        // }
        this.consellform.ConsltId = this.$route.query.consltId;
        this.Consultant.consltName = this.$route.query.consltName;
        this.Consultant.consltPhoto = this.$route.query.consltPhoto;
        this.consltArea = this.$route.query.consltArea;
        this.consltWay = this.$route.query.consltWay;

        // this.param.uid = localStorage.getItem('user_id');
        this.consellform.userId =  this.user.id;
        this.getconsltSchedule();


    },
    methods: {
        getconsltSchedule() {
            this.$axios.get('/api/consltSchedule/getConsltSchedule?id=' + this.consellform.ConsltId).then((res) => {
                this.consltSchedule = res;
                console.log(this.consltSchedule);
            });
        },
        checkPhone(rule, value, callback) {
            //debugger
            if (!/^1[34578]\d{9}$/.test(value)) {
                return callback(new Error('手机号码格式不正确'));
            }
            return callback();
        },
        next() {
            if (this.index == 2) {
                this.$axios.post('/api/ordersInfo/add', this.consellform).then((res) => {
                    console.log(res);

                    if (res && res.code == 200) {
                        this.index = 3;
                        this.showStep = false;
                        this.$message.success('添加成功');
                    } else this.$message.error(res.msg);
                });
            } else {
                this.index++;
            }
        },
        // 返回上一级
        returnPage() {
            if (window.history.length <= 1) {
                this.$router.push({ path: '/user/helloHome' });
                return false;
            } else {
                this.$router.go(-1);
            }
        },
        selectedTime(startTime) {
            console.log(startTime);
            console.log(this.consellform.startTime);
            this.consellform.endTime = startTime + 50 * 60;
            this.isselectTime = true;
        },
        transformTime(timestamp = +new Date()) {
            var date = new Date(timestamp * 1000 + 8 * 3600 * 1000); // 增加8小时
            return date.toJSON().substr(0, 19).replace('T', ' ');
        }
    }
};
</script>

<style scoped>
#box1 {
    background: #fff;
    padding: 20px;
}

#box1 p {
    font-size: 16px;
    font-family: 'Microsoft YaHei';
    text-align: left;
}

.btn1 {
    float: left;
    height: 40px;
    width: 230px;
    background: #ff771a;
    text-align: center !important;
    line-height: 40px;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    margin-right: auto;
    margin-top: 20px;
    margin-left: 25px;
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>
