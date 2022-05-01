<template>
    <div>
        <el-container>
            <div style="width: 10%">
                <!--左边栏空白占位  -->
            </div>
            <div style="width: 80%;margin-left: 40px; font-size: 22px; color: #333; font-weight: 200; line-height: 58px; margin-bottom: -20px">
                专业服务
                <a
                    href="/#/user/selectResult?searchkey="
                    style="float: right; margin-bottom: -20px; margin-right: 40px; color: #333"
                    >查看全部<i class="el-icon-lx-right"></i
                ></a>
            </div>
        </el-container>
        <div class="serv-cent">
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv1.jpg" />
                <p class="serv-title">亲子关系及家庭教育</p>
                <p class="serv-detail">增进与子女的双向沟通方式，降低原生与再生家庭的矛盾、解决两代之间的代沟问题</p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv2.jpg" />
                <p class="serv-title">两性问题</p>
                <p class="serv-detail">辅导因社会快速发展，及长期工作压力因素所造成的婚姻冲突，增强两性沟通能力，提升婚姻的和谐及幸福。</p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv3.jpg" />
                <p class="serv-title">综合服务</p>
                <p class="serv-detail">针对夫妻关系、亲子关系、家庭教育、专业督导、个人成长等等不同领域的思考，并提供专业的心理服务。</p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv4.jpg" />
                <p class="serv-title">人际关系</p>
                <p class="serv-detail">增强人际关系处理技巧，提升个人的沟通能力，有助于人脉拓展，帮助自身成长。</p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv5.jpg" />
                <p class="serv-title">心理压力与情绪疏导</p>
                <p class="serv-detail">
                    从生理、心理、等角度系统还原个体健康， 缓解工作压力，学习如何情绪宣泄的方式， 保持健康与激情，提高工作效率。
                </p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv6.jpg" />
                <p class="serv-title">个体心理咨询与辅导</p>
                <p class="serv-detail">
                    职场压力、人际关系或其它各项心理障碍咨询， 从个人问题中细化诊断，专业化辅导及追踪跟进，
                    改善心理障碍进而协助个人能力成长。
                </p>
            </div>
            <div class="serv-card el-card is-hover-shadow">
                <img src="/serv7.jpg" />
                <p class="serv-title">企业团体心理咨询</p>
                <p class="serv-detail">
                    缓解员工压力，解决职场疑惑，提升各级员工对岗位突发的危机事件处理方式及应对机制，以及提升工作效率和效益。
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ourService'
};
</script>

<style scoped>
.serv-cent {
    width: 80%;
    margin: 40px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
}

.serv-card {
    width: 20%;
    height: 260px;
    padding: 20px 20px;
    flex-grow: 1;
    margin: 5px 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* flex-basis: 100%; */
    flex-shrink: 0;
}
.serv-card img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
}
.serv-card p {
    text-align: center;
    font-size: 14px;
    font-family: Microsoft YaHei;
    line-height: 1.75;
}
.serv-title {
    color: #555555;
    font-weight: bold;
}
.serv-detail {
    color: #888888;
}
.index-el-divider{
    width: 80%;
    margin-left: 10%;
}
</style>
