<template>
    <div class="addPrestudyRecord">
        <el-form ref="aform" :model="aform" label-width="90px" style="width: 40%; margin-left: 30%">
            <el-form-item label="咨询师头衔" v-model="aform.title">
                <span>{{ aform.title }}</span>
            </el-form-item>
            <el-form-item label="最高学历" v-model="aform.education">
                <span>{{ eduList[aform.education] }}</span>
            </el-form-item>
            <el-form-item label="从业年份" v-model="aform.workyear">
                <span>{{ aform.workyear }}</span>
            </el-form-item>
            <el-form-item label="个人照片" v-model="aform.photourl">
                <img :src="aform.photourl" class="avatar" style="height: 180px" />
            </el-form-item>
            <el-form-item label="咨询方式" v-model="wayList">
                <span v-for="(item, i) in wayList" :label="i" :key="i">
                    <span style="font-size: 20px">
                        {{ ways[item] }}
                    </span>
                </span>
                <!-- <el-checkbox-group v-model="wayList">
                    <el-checkbox v-for="(item, i) in ways" :label="i" :key="i" name="type" class="favour_checkbox">{{ item }}</el-checkbox>
                </el-checkbox-group> -->
            </el-form-item>
            <el-form-item label="手机号码" v-model="aform.tel">
                <span>{{ aform.tel }}</span>
            </el-form-item>
            <el-form-item label="寄语" v-model="aform.sendword">
                <span>{{ aform.sendword }}</span>
            </el-form-item>
            <el-form-item label="简介" v-model="aform.brief">
                <span>{{ aform.brief }}</span>
            </el-form-item>
        </el-form>
        <div>
            <!-- <el-button type="primary" @click="applySubmit" v-show="editable"
                                   v-if="settleform.roleType=='0'&&settleform.isAuth=='1'">提交商家申请
                            </el-button> -->
            <el-button type="primary" @click="CertifeditVisible = true" size="mini" v-show="editable"
                >资质资料
            </el-button>
            <el-button type="primary" @click="SkilleditVisible = true" size="mini" v-show="editable"
                >擅长领域
            </el-button>
            <br /><br />
        </div>
        <el-button type="primary" @click="saveAdd">确 定</el-button>

        <!-- 编辑弹出框 -->
        <el-dialog title="咨询师资质" :visible.sync="CertifeditVisible" width="30%">
            <!-- <div>
                <p><el-button class="el-icon-plus" @click.prevent="handleAddCertf()"></el-button></p>
            </div> -->
            <el-table height="310" :data="ConsltCertifList" style="width: 580px; margin-left: 10px">
                <el-table-column type="index" label="序号">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="证书名称">
                    <template slot-scope="scope">
                        <el-input size="mini" v-show="scope.row.show" v-model="scope.row.certifName"></el-input>
                        <span v-show="!scope.row.show">{{ scope.row.certifName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="code" label="证书编号">
                    <template slot-scope="scope">
                        <el-input size="mini" v-show="scope.row.show" v-model="scope.row.certifNo"></el-input>
                        <span v-show="!scope.row.show">{{ scope.row.certifNo }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="c_year" label="持证年限">
                    <template slot-scope="scope">
                        <el-input size="mini" v-show="scope.row.show" v-model="scope.row.certifAge"></el-input>
                        <span v-show="!scope.row.show">{{ scope.row.certifAge }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="detail" label="备注">
                    <template slot-scope="scope">
                        <el-input size="mini" v-show="scope.row.show" v-model="scope.row.remark"></el-input>
                        <span v-show="!scope.row.show">{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="" label="操作">
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
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column> -->
            </el-table>
            <!-- <div>
                <el-button type="primary" @click="saveCertifEdit">提 交</el-button>
            </div> -->
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="咨询师擅长领域" :visible.sync="SkilleditVisible" width="30%">
            <el-table height="310" :data="ConsltSkillList" style="width: 580px; margin-left: 10px">
                <el-table-column type="index" label="序号">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="擅长服务方向">
                    <template slot-scope="scope">
                        <!-- <el-input size="mini" v-show="scope.row.show" v-model="scope.row.tname"></el-input> -->
                        <span v-show="!scope.row.show">{{ scope.row.tname }}</span>
                        <el-select v-model="scope.row.id" placeholder="请选择" v-show="scope.row.show">
                            <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName" :value="item.id"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="detail" label="详情">
                    <template slot-scope="scope">
                        <el-input size="mini" v-show="scope.row.show" v-model="scope.row.detail"></el-input>
                        <span v-show="!scope.row.show">{{ scope.row.detail }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="" label="操作">
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
                </el-table-column> -->
            </el-table>
            <!-- <div>
                <el-button type="primary" @click="saveSkillEdit">提 交</el-button>
            </div> -->
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'consltResume',
    data() {
        return {
            consltId: '',
            editable: true,
            dialogVisible: false,
            CertifeditVisible: false,
            SkilleditVisible: false,
            isAdd: false,
            tableData: [],
            typeList: [],
            wayList: [],
            // way: { 0: '即时聊天咨询', 1: '语音咨询', 2: '视频咨询', 3: '面对面咨询' },
            ways: ['聊天', '语音', '视频', '面对面'],
            eduList: { 1: '大专以下', 2: '大专', 3: '本科', 4: '研究生', 5: '博士' },
            form: {},
            eform: {},
            aform: {
                uid: ''
            },
            ConsltSkillList: [],
            ConsltCertifList: []
        };
    },
    props: {
        uid: {
            type: Number
        }
    },
    watch: {
        uid(newVal) {
            this.uid = newVal; //对父组件传过来的值进行监听，如果改变也对子组件内部的值进行改变
        }
    },
    created() {
        this.consltId = this.uid;
        this.getUserData();
    },
    methods: {
        getUserData() {
            // this.consltId = localStorage.getItem('user_id');
            // this.aform.uid = localStorage.getItem('user_id');
            this.$axios.get('/api/consultant/selectOne?id=' + this.consltId).then((res) => {
                this.aform = res;
                this.wayList = this.aform.way.split(';').map(Number);
                console.log(this.wayList);
                this.ConsltSkillList = res.ConsltSkill;
                this.ConsltCertifList = res.ConsltCertif;
                // this.getConsltOrdersByUId();
            });
        },
        // 添加点击按钮
        handleAddCertf() {
            this.ConsltCertifList.push({
                certifName: '',
                certifNo: '',
                certifAge: '',
                remark: '',
                show: true
            });
        },
        // 添加点击按钮
        handleAddSkill() {
            this.ConsltSkillList.push({
                tname: '',
                detail: '',
                show: true
            });
            this.getConsltSkillList();
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
        //保存添加
        saveAdd() {
            var setway = '';
            for (var i = 0; i < this.wayList.length; i++) {
                if (this.wayList[i] == 0) continue;
                setway += this.wayList[i] + ';';
            }
            this.aform.way = setway;

            axios.post('/api/consultant/update', this.aform).then((res) => {
                this.$message.success('添加成功');
            });
        },
        // 保存资质资料编辑
        saveCertifEdit() {
            axios.post('/api/goods/useredit', this.eform).then((res) => {
                this.$message.success('修改成功');
            });
            this.editVisible = false;
        },
        // 保存咨询类型编辑
        saveSkillEdit() {
            axios.post('/api/goods/useredit', this.eform).then((res) => {
                this.$message.success('修改成功');
            });
            this.editVisible = false;
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
        }
        // getConsltSkillList() {
        //     axios
        //         .get('/api/consltSkill/getConsltSkill?id=' + this.consultantId)
        //         .then((res) => {
        //             this.ConsltSkillList = res.data;
        //             console.log(res.data);
        //         })
        //         .catch((error) => {
        //             console.log('查找商品接口请求异常');
        //         });
        // },
        // getConsltCertifList() {
        //     axios
        //         .get('/api/consltCertification/getConsltCertf?id=' + this.consultantId)
        //         .then((res) => {
        //             this.ConsltCertifList = res.data;
        //             console.log(res.data);
        //         })
        //         .catch((error) => {
        //             console.log('查找商品接口请求异常');
        //         });
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
