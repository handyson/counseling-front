<template>
    <div id="list">
        <!--群聊列表-->
        <!-- <ul v-if="currentList=='群聊'">
			<p style="padding: 2px 4px;height: 20px">群聊列表</p>
			<li :class="{ active: currentSession?'群聊'== currentSession.username:false }"
					v-on:click="changeCurrentSession(chatObj)">
				<img class="avatar" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1268761962,3976237305&fm=26&gp=0.jpg">
				<el-badge :is-dot="isDot[user.username+'#群聊']"><p class="name">群聊</p></el-badge>
			</li>
		</ul> -->
        <!--机器人-->
        <!-- <ul v-if="currentList=='机器人'">
			<p style="padding: 2px 4px;height: 20px">快来和机器人聊天吧！</p>
			<li :class="{ active: currentSession?'机器人'== currentSession.username:false }"
					v-on:click="changeCurrentSession(robotObj)">
				<img class="avatar" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2548892998,499717296&fm=26&gp=0.jpg">
				<p class="name">瓦力(智能回复)</p>
			</li>
		</ul> -->
        <!--用户列表-->
        <el-scrollbar wrap-class="userList" wrap-style="height:600px;" view-style="height:100%;" :native="false">
            <ul v-if="currentList == '私聊'">
                <p style="padding: 2px 4px; height: 20px; margin: 16px 0px">用户列表</p>
                <li
                    v-for="item in users"
                    :class="{ active: currentSession ? item.username === currentSession.username : false }"
                    v-on:click="changeCurrentSession(item)"
                >
                    <!--   :class="[item.id === currentSession ? 'active':'']" -->
                    <div style="display: flex; justify-content: space-between">
                        <div>
                            <el-badge :is-dot="isDot[user.username + '#' + item.username]" style="">
                                <el-image class="avatar" :preview-src-list="[item.avatar || 'default_head.jpg']" :src="item.avatar || 'default_head.jpg'" :alt="item.nickname">
                                    <div slot="error" class="image-slot">
                                        <el-image :preview-src-list="['default_head.jpg']" src="default_head.jpg"></el-image>
                                    </div>
                                </el-image>
                            </el-badge>
                            <p class="name">{{ item.nickname }}</p>&nbsp;
                            <i v-if="item.roleType == 1" class="el-icon-service"></i>
                        </div>
                        <div>
                            <el-badge
                                :value="item.userStateId == 1 ? '在线' : '离线'"
                                :type="item.userStateId == 1 ? 'danger' : 'info'"
                            ></el-badge>
                        </div>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { log } from '../../utils/sockjs';

export default {
    name: 'list',
    data() {
        return {
            user: this.$store.state.currentUser,
            chatObj: { username: '群聊', nickname: '群聊' }, //群聊实体对象（为方法复用而构造，对于User对象）
            robotObj: {
                username: '机器人',
                nickname: '机器人',
                fromAvatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2548892998,499717296&fm=26&gp=0.jpg'
            },
            showVideo: false,
        };
    },
    mounted() {
        if (this.$route.params.uid) {
            console.log(this.$route.params.uid);
            this.changeCurrentSessionByUid(this.$route.params.uid);
        }
    },
    computed: mapState([
        //'sessions',//this.sessions映射成this.$store.state.sessions
        'users',
        'currentSession',
        'isDot',
        'currentList'
    ]),
    methods: {
        changeCurrentSession: function (currentSession) {
            let params = {};
            params.uid = this.$store.state.currentUser.id;
            params.cid = currentSession.id;
            this.postRequest("/chat/allowVideo", params).then(resp => {
                if (resp) {
                    currentSession.showVideo = true;
                } else {
                    currentSession.showVideo = false;
                }
                this.$store.commit('changeCurrentSession', currentSession);
            });
        },
        changeCurrentSessionByUid: function (id) {
            var user = this.$store.state.users.filter((item) => item.id == id);

            if (user.length > 0) {
                let params = {};
                params.uid = this.$store.state.currentUser.id;
                params.cid = user[0].id;
                this.postRequest("/chat/allowVideo", params).then(resp => {
                    if (resp) {
                        user[0].showVideo = true;
                    } else {
                        user[0].showVideo = false;
                    }
                    this.$store.commit('changeCurrentSession', user[0]);
                });
            }
        },
    }
};
</script>

<style lang="scss" scoped>
#list {
    ul {
        margin-left: 0px;
        padding-left: 0px;
        margin-left: 2px;
    }
    li {
        padding: 14px 6px;
        //padding-right: 40px;
        //border-bottom: 1px solid #292C33;
        list-style: none;
        cursor: pointer;
        &:hover {
            background-color: #d8d6d6;
        }
    }
    li.active {
        /*注意这个是.不是冒号:*/
        background-color: #c8c6c6;
    }
    .avatar {
        border-radius: 2px;
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }
    .name {
        display: inline-block;
        margin-left: 15px;
        margin-top: 0px;
        margin-bottom: 0px;
    }
    .stateItem {
        //在线状态的样式
        /*position: absolute;*/
        /*left: 160px;*/
        //margin-left: 100px;
        //margin-right: 10px;
    }
    .userList {
        max-height: 600px;
    }
    .el-scrollbar__wrap.default-scrollbar__wrap {
        overflow-x: auto;
    }
}
</style>
