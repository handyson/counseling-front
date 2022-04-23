<template>
    <div class="addPrestudyRecord">
        <el-form :model="form" label-width="98px" ref="form" :rules="rules" :hide-required-asterisk="true" label-position="left">
            <el-row :gutter="30">
                
                <el-col :span="30">
                    <el-form-item label="时间范围" prop="workTime">
                        <el-time-picker
                            is-range
                            v-model="form.workTime"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围"
                            format = 'HH:mm'>
                        </el-time-picker>
                    </el-form-item>
                </el-col>

                <el-col align="right">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" class="btnbgc" @click="save('form')" :loading="loading">提交</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'addPrestudyRecord',
    data() {
        // 时间冲突验证器
        var checkTimeConflict = (rule, value, callback) => {
            var start = Date.parse(value[0]) / 1000
            var end = Date.parse(value[1]) / 1000
            var date = this.dateShow
            date = parseInt(date.split('-').join(''), 10);  // 转为yyyyMMdd格式

            var conflictTimeArr = this.calendarData.filter((item) => {
                return date === item.workdate;
            }).filter((item) => {
                return !(start >= item.endtime || end <= item.starttime)
            })
            
            if (conflictTimeArr.length > 0) {
                callback(new Error('所选时间与当天排班存在冲突'))
            } else {
                callback()
            }
        }

        return {
            loading: false,
            form: {
                // 排班时间
                // workTime: [new Date(), new Date()]
            },
            rules: {
                workTime: [
                    {
                        required: true,
                        message: '请选择时间',
                        trigger: 'blur'
                    },
                    { 
                        validator: checkTimeConflict, 
                        trigger: 'blur'
                    }
                ]
            },
        };
    },
    methods: {
        created() {
            this.singleShow();
        },
        save(formName) {
            this.loading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 日历项
                    // 替换日期为当前点击的日期
                    var currYear = this.dateShow.split('-');
                    currYear[1]--;
                    this.form.workTime[0].setFullYear(currYear[0], currYear[1], currYear[2]);
                    this.form.workTime[0].setSeconds(0);
                    this.form.workTime[1].setFullYear(currYear[0], currYear[1], currYear[2]);
                    this.form.workTime[1].setSeconds(0);
                    var calendarDataItem = {
                        workdate: parseInt(this.dateShow.split('-').join(''), 10),
                        starttime: this.form.workTime[0].getTime() / 1000,
                        endtime: this.form.workTime[1].getTime() / 1000
                    }
                    // 请求参数
                    var params = {
                        cid: localStorage.getItem("user_id"),
                        schedule: calendarDataItem
                    }
                    // 请求添加接口
                    this.$axios.post('/api/consltSchedule/addSchedule', params).then((res) => {
                        console.log(res);
                        if (res && res.data.code == 200) {
                            calendarDataItem.id = res.data.data.id  // 接口返回新增的id字段

                            // 添加成功自动更新到日历显示
                            this.$emit('propClose', calendarDataItem);
                            this.$message.success('添加成功');
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });

                } else {
                    //console.log("error submit!!");
                    this.loading = false;
                    return false;
                }
            });
        },
        cancel() {
            console.log('cancel');
            this.$emit('propClose', '取消');
        },
        singleShow() {
            if (this.singleData) {
                this.form = this.singleData;
            }
        }
    },
    props: {
        singleData: {
            type: [Object || null]
        },
        dateShow: {
            type: String
        },
        // 从父组件获得排班列表
        calendarData: {
            type: [Array || null]
        },
    }
};
</script>
<style lang="scss" scoped>
.addPrestudyRecord::v-deep {
    .el-form-item {
        > label::after {
            content: '*';
            color: #f56c6c;
            margin-left: 4px;
        }
    }

    .addPrestudyRecord-nmust {
        .el-form-item {
            > label::after {
                content: '';
            }
        }
    }

    .el-form-item__label {
        color: #5a6066;
        font-size: 14px;
        font-weight: normal;
    }
}

.addPrestudyRecord {
    &-input {
        width: 100%;
    }
}
</style>
