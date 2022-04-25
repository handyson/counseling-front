<template>
    <div>
        <div style="text-align: center; width: 70%; margin-left: 15%; margin-top: 40px; margin-bottom: 50px">
            <!-- <div>
                <img src="http://www.lzy.edu.cn/__local/B/E6/97/2EBB828D970D7D3CA7E18F50D4A_70DCAB7B_2040C.jpg"
                     style="width: 80%;" alt="">
            </div> -->
            <h3>我们是谁？</h3>
            <p>大白心理咨询专注于提供高质量心理服务，是国内优质的心理咨询平台。</p>
            <br /><br />
            <h3>大白心理咨询平台正在做些什么？</h3>
            <p>
                我们在做心理健康服务领域的标杆，我们培养、监督、选择数量有限的专业心理咨询师和相关领域的从业者，生产靠谱的心理服务产品，为有心理健康帮助需求的用户提供有偿服务。
                目前，已有超过40万次心理咨询在大白心理咨询平台发生；
                用严苛的标准筛选国内及海外的心理咨询师入驻，参考美国心理学会（APA）标准逐一对咨询师进行专业考核和面试、以及追踪评估和管理；
                目前有来自全球117个城市800余名个体心理咨询师提供包括个体咨询、伴侣咨询、家庭咨询在内的心理咨询服务。
            </p>
            <br /><br />
            <h3>旨在服务</h3>
            <p>
                面向企业客户的服务：大白心理咨询为企业提供定制化专业心理服务，包括企业心理课程 、员工心理咨询 、
                危机咨询等，已服务过的客户包括嫣然天使基金、上海家化、中国联通、国家电网等企业；
            </p>
            <p>面向咨询师的服务：大白心理咨询为这些心理服务提供者提供执业的行政支持、专业学习支持、督导支持，并对服务进行监督和管理；</p>
            <p>
                面向心理咨询学习者：大白心理咨询平台优选海内外优质教员和督导，为入门咨询师提供系统的基础训练，并帮助搭建实习平台，搭建完善咨询师专业成长路径；
            </p>
            <p>
                面向行业：大白心理咨询平台和国内外知名的研究机构合作，进行心理咨询行业的数据统计分析、干预方法的比较研究等学术研究项目，助力咨询行业发展。
            </p>
        </div>
        <div style="height: 200px; text-align: center">
            <h2>公司电话：13321191379</h2>
            <h2>联系人：刘经理</h2>
            <h2>邮箱：12346543@ershou.com</h2>
            <h2>传真：3465464</h2>
            <h2>公司地址：XX省XX市XX区XX街道XX号</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userInfo',
    data() {
        return {
            editable: true,
            imageUrl: '',
            form: {
                name: 'admin'
            }
        };
    },
    methods: {
        onSubmit() {
            this.editable = !this.editable;
        },
        editabled() {
            this.editable = !this.editable;
        },
        editPwd() {},
        handleAvatarSuccess(res, file) {
            this.form.img = URL.createObjectURL(file.raw);
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
    }
};
</script>

<style scoped>
.avatar {
    width: 100px;
    height: 100px;
}

/deep/ .el-upload {
    width: 100px;
    height: 100px;
    line-height: 100px;
    margin-left: 60px;
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
