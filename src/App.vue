<template>
    <div id="app">
        <router-view></router-view>
        <trtc></trtc>
    </div>
</template>
<script>
import trtc from './components/chat/trtc.vue';

export default {
    name: 'App',
    components: {
        trtc
    },
    created () {
            //刷新连接聊天室WebSocket服务
            // this.$store.dispatch('initData');
            if (this.$store.state.currentUser) {
                console.log("刷新连接聊天室WebSocket服务");
                this.$store.dispatch('connect');
            }
        // }
    }
};
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   !*浅绿色主题*!*/
</style>