<template>
    <div>
        <div class="text-box">
            <!-- <div>
                <img src="http://www.lzy.edu.cn/__local/B/E6/97/2EBB828D970D7D3CA7E18F50D4A_70DCAB7B_2040C.jpg"
                     style="width: 80%;" alt="">
            </div> -->
            <h3>我们是谁？</h3>
            <p style="text-align: center;">大白心理咨询专注于提供高质量心理服务，是国内优质的心理咨询平台。</p>
            
            <h3>大白心理咨询平台正在做些什么？</h3>
            <p>
                我们在做心理健康服务领域的标杆，我们培养、监督、选择数量有限的专业心理咨询师和相关领域的从业者，生产靠谱的心理服务产品，为有心理健康帮助需求的用户提供有偿服务。
                目前，已有超过40万次心理咨询在大白心理咨询平台发生；
                用严苛的标准筛选国内及海外的心理咨询师入驻，参考美国心理学会（APA）标准逐一对咨询师进行专业考核和面试、以及追踪评估和管理；
                目前有来自全球117个城市800余名个体心理咨询师提供包括个体咨询、伴侣咨询、家庭咨询在内的心理咨询服务。
            </p>
            

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
            
            <h3>创始团队</h3>
            <p>简单心理学术团队90%为心理学硕士，毕业于欧洲、美国、香港以及大陆的名校，我们尤其注重团队的思维训练以及科研能力。我们是有温度、有边界、守伦理的心理服务者。</p>

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
.text-box {
    text-align: left;
    width: 70%;
    margin: auto;
    padding-bottom: 80px;
}
h3 {
    line-height: 25px;
    font-size: 18px;
    color: #40434c;
    text-align: center;
    font-weight: 600;
    padding-top: 30px;
    padding-bottom: 14px;
}
p {
    text-indent: 30px;
    margin-bottom: 14px;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    line-height: 30px;
    letter-spacing: 0.3px;
    font-size: 16px;
    word-break: break-all;
    color: rgb(140, 140, 140);
}
</style>
