<template>
    <transition name="el-zoom-in-center">
        <div v-show="show">
            <div class="serv-header" style="text-align: center">
                <h1 style="padding: 30px">专业服务</h1>
                <p>
                    针对两性心理、社交沟通、夫妻关系、亲子关系、家庭教育、专业督导、个人成长等等不同领域的困惑，并提供专业的心理咨询服务。
                </p>
            </div>
            <div class="serv-content">
                <img src="/ourserv1.png" />
                <img src="/ourserv2.png" />
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'OurService',
    data: () => ({
        show: false
    }),
    mounted: function () {
        this.show = true;
    }
};
</script>

<style scoped>
.serv-header {
    padding: 36px 0px;
}
.serv-header p {
    font-size: 16px;
    font-family: Microsoft YaHei;
    text-align: center;
}
.serv-content {
    width: 100%;
    text-align: center;
    margin-bottom: 100px;
}
.serv-content img {
    width: 80%;
    /* margin: auto; */
}
</style>
