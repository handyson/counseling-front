<template>
    <div class="addPrestudyRecord">
        <div style="display: flex; justify-content: flex-start">
            <el-steps :active="index" direction="vertical" space="50px">
                <el-step title="实名认证" size="mini"></el-step>
                <el-step title="基本信息"></el-step>
                <el-step title="资质材料"></el-step>
                <el-step title="服务类别"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <div style="margin-left: 30px; display: flex; justify-content: center; align-items: center; width: 80%">
                <div v-show="index == 1">
                    <el-form :model="consltInfoform" label-width="150px">
                        <h3>入驻基本信息</h3>
                        <br /><br />
                        <el-form-item label="姓名">
                            <el-input v-model="consltInfoform.nickname" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item style="margin-left: -200px">
                            <el-upload
                                class="avatar-uploader"
                                name="Consltimg"
                                action="/api/UpData/upConsltimg/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess1"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img
                                    v-if="consltInfoform.photourl"
                                    :src="consltInfoform.photourl"
                                    style="width: 100%;height=100%"
                                    class="avatar"
                                />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <!-- <el-form-item label="头衔">
                            <el-input v-model="consltInfoform.title" size="medium"></el-input>
                        </el-form-item> -->
                        <el-form-item label="最高学历">
                            <el-select placeholder="请选择学历" v-model="consltInfoform.education">
                                <el-option v-for="edu in eduList" :key="edu.id" :value="edu.id" :label="edu.detail"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="电话号码">
                            <el-input v-model="consltInfoform.tel" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="通讯地址">
                            <el-input v-model="consltInfoform.faceAddress" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="从业时间">
                            <el-input v-model="consltInfoform.workyear" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="目前累计服务案例">
                            <el-input v-model="consltInfoform.cases" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="寄望">
                            <el-input v-model="consltInfoform.sendWord" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input v-model="consltInfoform.brief" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="选择咨询方式">
                            <el-checkbox-group v-model="wayList">
                                <el-checkbox v-for="(item, i) in ways" :label="i" :key="i" name="type" class="favour_checkbox">{{
                                    item
                                }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-show="index == 2">
                    <h3>资质材料</h3>
                    <br /><br />
                    <div>
                        <p><el-button class="el-icon-plus" @click.prevent="handleAddCertf()"></el-button></p>
                    </div>
                    <el-table height="310" :data="CC_tableData" style="width: 580px; margin-left: 10px">
                        <el-table-column type="index" label="序号">
                            <template slot-scope="scope">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="证书名称">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                                <span v-show="!scope.row.show">{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="code" label="证书编号">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.show" v-model="scope.row.code"></el-input>
                                <span v-show="!scope.row.show">{{ scope.row.code }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="c_year" label="持证年限">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.show" v-model="scope.row.c_year"></el-input>
                                <span v-show="!scope.row.show">{{ scope.row.c_year }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="detail" label="备注">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.show" v-model="scope.row.detail"></el-input>
                                <span v-show="!scope.row.show">{{ scope.row.detail }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <el-dropdown trigger="click">
                                    <el-button type="text" size="mini"
                                        >操作
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <el-button
                                                @click="handleDelete(scope.$index)"
                                                class="btn-text-red"
                                                type="text"
                                                size="mini"
                                                icon="el-icon-delete"
                                                >删除
                                            </el-button>
                                        </el-dropdown-item>
                                        <!-- <el-dropdown-item>
                                                        <el-button
                                                            @click="scope.row.show = true"
                                                            type="text"
                                                            size="mini"
                                                            icon="el-icon-edit"
                                                            >编辑</el-button
                                                        >
                                                    </el-dropdown-item> -->
                                        <!-- <el-dropdown-item>
                                                        <el-button @click="save1(scope.row)" type="text" size="mini" icon="el-icon-success"
                                                            >保存</el-button
                                                        >
                                                    </el-dropdown-item> -->
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-show="index == 3">
                    <h3>服务类别</h3>
                    <br /><br />
                    <div>
                        <p><el-button class="el-icon-plus" @click.prevent="handleAddSkill()"></el-button></p>
                    </div>
                    <el-table height="310" :data="skill_tableData" style="width: 580px; margin-left: 10px">
                        <el-table-column type="index" label="序号">
                            <template slot-scope="scope">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="擅长服务方向">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.id" placeholder="请选择">
                                    <el-option
                                        v-for="(item, index) in typeList"
                                        :key="index"
                                        :label="item.typeName"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>

                                <!-- <el-input size="mini" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                                            <span v-show="!scope.row.show">{{ scope.row.name }}</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="detail" label="详情">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.show" v-model="scope.row.detail"></el-input>
                                <span v-show="!scope.row.show">{{ scope.row.detail }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <el-dropdown trigger="click">
                                    <el-button type="text" size="mini"
                                        >操作
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <el-button
                                                @click="handleDeleteSkill(scope.$index)"
                                                class="btn-text-red"
                                                type="text"
                                                size="mini"
                                                icon="el-icon-delete"
                                                >删除
                                            </el-button>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-show="index == 4">
                    <el-button type="success" icon="el-icon-check" circle size="medium"></el-button>
                    <h4>完成</h4>
                    <br /><br /><br /><br />
                    <router-link to="/user/helloHome">返回首页</router-link>
                </div>
            </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: center; padding: 0px; margin: 0px">
            <el-button round size="mini" v-if="index > 1 && index < 4" @click="index--">上一步</el-button>
            <el-button type="primary" round size="mini" v-if="finished" @click="next" v-text="index == 3 ? '完成' : '下一步'"></el-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'applyConslt',
    data() {
        return {
            uid: '',
            loading: false,
            index: 1,
            form: {},
            consltInfoform: {},
            typeList: [],
            CC_tableData: [],
            skill_tableData: [],
            wayList: [],
            ways: ['聊天', '语音', '视频', '面对面'],
            tableLoading: false,
            finished: true,
            editable: true,
            eduList: [
                { id:1,detail:'大专以下'}, 
                { id:2,detail: '大专'}, 
                { id:3,detail: '本科'}, 
                { id:4,detail: '研究生'}, 
                { id:5,detail: '博士' }]
        };
    },
    created() {
        // this.uid = localStorage.getItem('user_id');
        this.uid = this.$store.state.currentUser.id;
        // this.singleShow();
    },
    methods: {
        // save(formName) {
        //     this.loading = true;
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             if (this.singleData) {
        //                 this.form.dutyDate = this.dateShow;
        //                 this.$emit('propClose', '取消');
        //             } else {
        //                 this.form.dutyDate = this.dateShow;
        //                 this.$emit('propClose', this.form);
        //             }
        //         } else {
        //             //console.log("error submit!!");
        //             this.loading = false;
        //             return false;
        //         }
        //     });
        // },
        // cancel() {
        //     this.$emit('propClose', '取消');
        // },
        // singleShow() {
        //     if (this.singleData) {
        //         this.uid = this.singleData;
        //         console.log(this.uid);
        //     }
        // },
        next() {
            this.tableLoading = true;
            if (this.index == 3) {
                var setway = '';
                for (var i = 0; i < this.wayList.length; i++) {
                    if (this.wayList[i] == 0) continue;
                    setway += this.wayList[i] + ';';
                }
                this.consltInfoform.way = setway;
                var paramsData = {
                    uid: this.uid,
                    consellform: this.consltInfoform,
                    CC_tableData: this.CC_tableData,
                    skill_tableData: this.skill_tableData
                };
                console.log(paramsData);
                this.$axios.post('/api/consultant/applyConslt', paramsData).then((res) => {
                    console.log(res);
                    if (res && res.code == 200) {
                        this.index = 4;
                        this.finished = false;
                        this.$message.success('添加成功');
                    } else this.$message.error(res.msg);
                });
            } else {
                this.index++;
            }
        },
        // 添加点击按钮
        handleAddSkill() {
            this.skill_tableData.push({
                name: '',
                detail: '',
                show: true
            });
            this.getConsltSkillList();
        },
        // applySubmit() {
        //     this.tableLoading = true;
        //     var _this = this;
        //     this.getRequest('/sal/salary').then((resp) => {
        //         _this.tableLoading = false;
        //         if (resp && resp.status == 200) {
        //             _this.salaries = resp.data;
        //         }
        //     });
        // },
        handleDelete(index) {
            this.CC_tableData.splice(index, 1);
        },
        handleDeleteSkill(index) {
            this.skill_tableData.splice(index, 1);
        },
        // 添加点击按钮
        handleAddCertf() {
            this.CC_tableData.push({
                name: '',
                code: '',
                c_year: '',
                detail: '',
                show: true
            });
        },
        getConsltSkillList() {
            axios
                .get('/api/consultantType/selectAll')
                .then((res) => {
                    this.typeList = res;
                    console.log(res);
                })
                .catch((error) => {
                    console.log('查找商品接口请求异常');
                });
        },
        handleAvatarSuccess1(res, file) {
            if (res.code == 200) {
                this.$message.success('上传成功');
                this.consltInfoform.photourl = 'http://127.0.0.1:8000/images/consultant/' + res.msg;
                console.log(this.consltInfoform.photourl);
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
        }
        // applySubmit() {
        //     this.$axios.post('/api/userInfo/applyConslt', this.form).then((res) => {
        //         this.$message.success('申请成功');
        //         this.getData();
        //     });
        // }
    },
    props: {
        singleData: {
            type: [Object || null]
        }
        // dateShow: {
        //     type: String
        // }
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
