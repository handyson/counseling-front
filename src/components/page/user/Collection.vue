<template>
    <div>
        <!--表头-->
        <div class="title" style="width: 80%; margin-left: 10%">
            <!--            <h3>我的收藏</h3>-->
            <el-radio-group style="margin-bottom: 20px; margin-top: 15px; text-align: left; width: 100%">
                <img src="http://127.0.0.1:8000/images/title/wodeshoucang.png" style="height: 90px" alt="" />
            </el-radio-group>
            <el-table
                ref="multipleTable"
                @row-click="goDesc"
                :span-method="objectSpanMethod"
                :data="tableData.filter((data) => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
            >
                <el-table-column label="咨询师" prop="photoUrl" width="110px" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.photoUrl" />
                    </template>
                </el-table-column>
                <!--        咨询师名字-->
                <el-table-column label="咨询师姓名" prop="nickname" align="center"></el-table-column>
                <el-table-column label="咨询师详情" prop="title" align="center"></el-table-column>
            </el-table>
        </div>

        <!-- <div style="text-align: center">
            <img :showable="showable" src="http://127.0.0.1:8000/images/title/msg/noCollection.png" style="height: 90px" alt="" />
        </div> -->
        <br /><br /><br /><br />
        <div style="width: 80%; margin-left: 10%"></div>
    </div>
</template>

<script>
export default {
    name: 'collection',
    data() {
        return {
            uid: '',
            tableData: [],
            search: '',
            showable: true
        };
    },
    created() {
        // if (localStorage.getItem('user_id') == null) {
        //     this.$router.push('/user/helloHome');
        //     this.$message.error('用户未登录');
        // }
        // this.uid = localStorage.getItem('user_id');
        this.uid = this.$store.state.currentUser.id;
        this.getData();
    },
    methods: {
        getData() {
            this.$axios.get('/api/userCollection/' + this.uid).then((res) => {
                console.log(res);
                this.tableData = res.data;
                // if(this.tableData) this.showable=false
            });
        },
        // goodsStatus(status) {
        //     if (status == "1")
        //         return "danger";
        //     else if (status == "2")
        //         return "";
        // },
        goDesc(row, column, event) {
            this.$router.push({
                path: '/consultant/consultantDesc',
                query: {
                    consultant: row.consultant
                }
            });
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {}
    }
};
</script>


<style scoped>
.title {
    margin-top: 50px;
}

.title h3 {
    /*float: left;*/
    font-size: 23px;
    color: #c91623;
}
</style>
