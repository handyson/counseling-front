<template>
    <div style="height: auto; width: 100%">
        <div style="margin-left: 10%; width: 80%; text-align: center">
            <el-radio-group style="margin-bottom: 20px; margin-top: 15px; text-align: left; width: 100%">
                <img src="http://127.0.0.1:8000/images/title/consltCenter.png" style="height: 80px" alt="" />
            </el-radio-group>
            <!-- 我的信息管理 -->
            <el-tabs type="border-card">
                <el-tab-pane label="我的信息管理">
                    <el-form ref="form" :model="form" label-width="90px" style="width: 40%; margin-left: 30%">
                        <el-form-item label="ID">
                            <el-input v-model="form.id" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-input v-model="form.gender"></el-input>
                            <!-- <el-input>{{form.gender == 0?"女":"男"}}</el-input> -->
                        </el-form-item>
                        <el-form-item label="图片">
                            <el-upload
                                class="avatar-uploader"
                                name="kimg"
                                action="/api/UpData/upkindimg/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="form.photourl" :src="form.photourl" class="avatar" style="height: 180px" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input v-model="form.tel"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="form.mail"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="updateUserInfo">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <!-- 个人简介 -->
                <el-tab-pane label="个人简介">
                    <el-form ref="aform" :model="aform" label-width="90px" style="width: 40%; margin-left: 30%">
                        <el-form-item label="咨询师头衔">
                            <el-input v-model="aform.title"></el-input>
                            <!-- <el-select v-model="aform.kid" placeholder="请选择商品种类">
                                <el-option v-for="item in kindsList" :key="item.kid" :label="item.kname" :value="item.kid"> </el-option>
                            </el-select> -->
                        </el-form-item>
                        <el-form-item label="寄语">
                            <el-input v-model="aform.price"></el-input>
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input v-model="aform.brief"></el-input>
                        </el-form-item>
                        <el-form-item label="从业年份">
                            <el-input v-model="aform.workyear"></el-input>
                        </el-form-item>
                        <el-form-item label="个人照片">
                            <el-upload
                                class="avatar-uploader"
                                name="kimg"
                                action="/api/UpData/upkindimg/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="aform.iconurl" :src="aform.iconurl" class="avatar" style="height: 180px" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="咨询方式">
                            <el-input v-model="aform.details"></el-input>
                        </el-form-item>
                        <el-form-item label="关键字">
                            <el-input v-model="aform.goodstitle"></el-input>
                        </el-form-item>
                        <div>
                            <!-- <el-button type="primary" @click="applySubmit" v-show="editable"
                                   v-if="settleform.roleType=='0'&&settleform.isAuth=='1'">提交商家申请
                            </el-button> -->
                            <el-button
                                type="primary"
                                @click="dialogVisible = true"
                                icon="el-icon-plus"
                                size="mini"
                                v-show="editable"
                                v-if="form.roleType == '0' && form.isAuth == '1'"
                                >修改资质资料
                            </el-button>

                            <!-- <el-button size="mini" type="success" @click="applySubmit" icon="el-icon-refresh"> </el-button> -->
                        </div>
                        <div>
                            <el-button
                                type="primary"
                                @click="dialogVisible = true"
                                size="mini"
                                v-show="editable"
                                v-if="form.roleType == '0' && form.isAuth == '1'"
                                >修改资质资料
                            </el-button>
                        </div>
                    </el-form>
                    <el-button type="primary" @click="saveAdd">确 定</el-button>
                </el-tab-pane>

                <!-- 我的预约列表 -->
                <el-tab-pane label="我的预约列表">
                    <conslt-order-list></conslt-order-list>
                    <br /><br /><br /><br />
                </el-tab-pane>

                <!-- 我的排班时间 -->
                <el-tab-pane label="我的排班时间">
                    <!--排班管理-->
                    <div class="dutySchedule">
                        <div class="dutySchedule-calendar">
                            <el-calendar v-model="currentDate">
                                <template slot="dateCell" slot-scope="{ date, data }">
                                    <!--自定义内容-->
                                    <div class="calendar-day" @click="btn.add && calendarClick(data, '新增')">
                                        <div style="text-align: center" @click.stop="btn.add && calendarClick(data, '新增')">
                                            {{ data.day.split('-').slice(2).join('-') }}
                                        </div>
                                        <div v-for="(item, index) in textContent(data.day)" :key="index">
                                            <div class="dutySchedule-content">
                                                {{ transformTime(item.startTime) }}-{{ transformTime(item.endTime) }}
                                                <i
                                                    class="icon el-tag__close el-icon-close"
                                                    @click.stop="deleteDar(item, index)"
                                                    v-show="btn.delete"
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-calendar>
                        </div>
                        <el-dialog
                            :title="dialogTitle"
                            :visible.sync="dialogVisible"
                            width="40%"
                            v-if="dialogVisible"
                            :close-on-click-modal="false"
                            @close="propClose('取消')"
                        >
                            <add-duty-schedule
                                @propClose="propClose"
                                :single-data="singleData"
                                :date-show="dateShow"
                                :calendar-data="calendarData"
                            />
                        </el-dialog>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <br />
        <br />
        <br />
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="eform" label-width="90px">
                <el-form-item label="商品种类">
                    <el-select v-model="eform.kid" placeholder="请选择商品种类">
                        <el-option v-for="item in kindsList" :key="item.kid" :label="item.kname" :value="item.kid"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="eform.price"></el-input>
                </el-form-item>
                <el-form-item label="商品名字">
                    <el-input v-model="eform.goodsname"></el-input>
                </el-form-item>
                <el-form-item label="商品规格">
                    <el-input v-model="eform.spec"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                        class="avatar-uploader"
                        name="kimg"
                        action="/api/UpData/upkindimg/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="eform.iconurl" :src="eform.iconurl" class="avatar" style="height: 180px" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情">
                    <el-input v-model="eform.details"></el-input>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input v-model="eform.goodstitle"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import AddDutySchedule from './addSchedule.vue';
import consltOrderList from './ConsltOrderList.vue';
export default {
    name: 'ConsltInfo',
    data() {
        return {
            consltId: '',
            editable: true,
            dialogVisible: false,
            editVisible: false,
            tableData: [],
            kindsList: [],
            form: {},
            eform: {},
            aform: {
                uid: ''
            },

            // 按钮权限
            btn: {
                add: true,
                update: true,
                delete: true
            },
            // 指定显示日期
            currentDate: '',
            // 弹框Title
            dialogTitle: '',
            // 弹框显示隐藏
            dialogVisible: false,
            // 传递子组件的点击日历时间
            dateShow: '',
            // 编辑显示内容
            singleData: '',
            // 显示页面数据---模拟后端数据
            calendarData: []
        };
    },
    created() {
        this.getUserData();
        // this.getData();
        // getKindsList().then(
        //     data => {
        //         this.kindsList = data
        //     }
        // )
        this.refreshCalendarData();
    },
    mounted() {
        // 删除“上个月”按钮
        this.$el.querySelector('div.el-calendar__header .el-button-group>:first-child').remove();
    },
    methods: {
        //前往用户主页
        goUserShow(uid) {
            this.$router.push({
                path: '/user/UserShow',
                query: {
                    uid: uid
                }
            });
        },
        getUserData() {
            this.consltId = localStorage.getItem('user_id');
            this.aform.uid = localStorage.getItem('user_id');
            this.$axios.get('/api/consultant/selectOne?id=' + this.consltId).then((res) => {
                this.form = res.data;
                // this.getConsltOrdersByUId();
            });
        },
        
        updateUserInfo() {
            this.editable = !this.editable;
            this.$axios.put('/api/userInfo/toAuth', this.form).then((res) => {
                this.$message.success('修改成功');
            });
        },
        editabled() {
            this.editable = !this.editable;
        },
        // getData() {
        //     axios.get('/api/goods/getGoodsByUid?id=' + this.consltId).then(res => {
        //         console.log(res);
        //         this.tableData = res.data;
        //         // this.changeData();
        //     }).catch(error => {
        //         console.log("接口请求异常");
        //     });
        // },
        
        handleEdit(index, row) {
            this.idx = index;
            this.eform = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            axios.post('/api/goods/useredit', this.eform).then((res) => {
                this.$message.success('修改成功');
            });
            this.editVisible = false;
        },
        //保存添加
        saveAdd() {
            axios.post('/api/goods/useradd', this.aform).then((res) => {
                this.aform = '';
                this.$message.success('添加成功');
            });
        },
        //文件上传
        handleAvatarSuccess(res, file) {
            if (res.code == 200) {
                this.$message.success('上传成功');
                this.aform.iconurl = 'http://127.0.0.1:8000/images/kinds/' + res.msg;
                this.eform.iconurl = 'http://127.0.0.1:8000/images/kinds/' + res.msg;
            } else this.$message.error('上传失败');
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPng = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 刷新排班数据
        refreshCalendarData() {
            // 获取本月和下个月的排班数据
            var time = new Date();
            var year = String(time.getFullYear());
            var month = time.getMonth() + 1;
            var nextMonth = month + 1;
            month = String(month).length === 1 ? '0' + String(month) : String(month);
            nextMonth = String(nextMonth).length === 1 ? '0' + String(nextMonth) : String(nextMonth);
            this.currentDate = year + '-' + month;
            var current = parseInt(year + month, 10);
            var next = parseInt(year + nextMonth, 10);
            this.getCalendarData(current);
            this.getCalendarData(next);
        },
        // 获取排班数据
        getCalendarData(date) {
            var param = {
                cid: this.consltId,
                date: date
            };
            this.$axios.post('/api/consltSchedule/getSchedule', param).then((res) => {
                if (res && res.data.code == 200) {
                    // 删除成功自动更新到日历显示
                    for (let i in res.data.data) {
                        this.calendarData.push(res.data.data[i]);
                    }
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },

        //  删除按钮
        deleteDar(content, index) {
            this.$confirm('此操将删除排班, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    // 请求添加接口
                    this.$axios.post('/api/consltSchedule/delSchedule/' + this.calendarData[index].id).then((res) => {
                        console.log(res);
                        if (res && res.data.code == 200) {
                            // 删除成功自动更新到日历显示
                            this.refreshCalendarData();
                            this.$message.success('删除成功');
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });

                    return true;
                })
                .catch(() => {});
        },
        // 弹框关闭
        propClose(content) {
            this.dialogVisible = false;
            this.examineShow = false;
            if (content != '取消') {
                this.calendarData.push(content);
            }
        },
        // 点击日历内容
        calendarClick(content, text, data) {
            if (text == '新增') {
                this.dialogTitle = '添加';
                this.singleData = null;
                this.dateShow = content.day;
            } else {
                this.dialogTitle = '编辑';
                this.singleData = data;
                this.dateShow = content.day;
            }
            this.dialogVisible = true;
        },
        // 文字显示
        textContent(date) {
            date = parseInt(date.split('-').join(''), 10); // 转为yyyyMMdd格式

            return this.calendarData.filter((item) => {
                return date === item.workdate;
            });
        },
        transformTime(timestamp = +new Date()) {
            if (timestamp) {
                var time = new Date(timestamp * 1000);
                var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
                var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
                return h + ':' + m;
            } else {
                return '';
            }
        }
    },
    components: {
        AddDutySchedule,
        consltOrderList
    }
};
</script>


 <style lang="scss" scoped>
.dutySchedule-content {
    color: #fff;
    background-color: #3a87ad;
    border-radius: 3px;
}

.dutySchedule-content:hover {
    background-color: #08a4f0;
}

.calendar-day {
    height: 100%;
}

.dutySchedule::v-deep {
    .el-calendar-table .el-calendar-day {
        height: 75px;
    }

    .el-calendar__body {
        padding-bottom: 20px;
    }

    .el-calendar-day {
        padding: 8px 0;
    }

    // 控制点击上个月或者下个月日期时间
    .el-calendar-table:not(.is-range) td.next,
    .el-calendar-table:not(.is-range) td.prev {
        pointer-events: none;
    }

    .icon {
        float: right;
        margin: 1px 7px 0 0;
    }

    .icon:hover {
        background-color: red;
        border-radius: 50%;
    }
}
</style>