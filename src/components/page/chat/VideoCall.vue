<template>
    <div class="video-call-section">
        <div class="video-call-section-header">Welcome {{ currentUser && (currentUser.nickname || currentUser.id) }}</div>
        <div class="video-call-section-title">视频通话</div>
        <br />
        <el-button v-if="!isShowVideoCall" type="primary" @click="handleCancelCallUser" size="120"><i class="el-icon-loading"></i> 取消</el-button>
        <div :class="{ 'video-conference': true, 'is-show': isShowVideoCall }">
            <div class="video-conference-header">视频通话区域</div>

            <div class="video-conference-list">
                <div
                    v-for="userId in meetingUserIdList"
                    :key="`video-${userId}`"
                    :id="`video-${userId}`"
                    :class="{ 'user-video-container': true, 'is-me': userId === currentUser.id }"
                >
                    <div class="user-status">
                        <div :class="{ 'user-video-status': true, 'is-mute': isUserMute(muteVideoUserIdList, userId) }"></div>
                        <div :class="{ 'user-audio-status': true, 'is-mute': isUserMute(muteAudioUserIdList, userId) }"></div>
                    </div>
                    <div class="video-item-username">{{ userId2Name[userId] || userId }}</div>
                </div>
            </div>
            <div class="video-conference-action">
                <el-button class="action-btn" type="success" @click="toggleVideo">{{ isVideoOn ? '关闭摄像头' : '打开摄像头' }}</el-button>

                <el-button class="action-btn" type="success" @click="toggleAudio">{{ isAudioOn ? '关闭麦克风' : '打开麦克风' }}</el-button>

                <el-button class="action-btn" type="danger" @click="handleHangup">挂断</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUsernameByUserid } from '../../../utils/trtc';

export default {
    name: 'VideoCall',
    components: {},
    computed: {
        ...mapState({
            currentUser: (state) => state.currentUser,
            callStatus: (state) => state.callStatus,
            isInviter: (state) => state.isInviter,
            meetingUserIdList: (state) => state.meetingUserIdList,
            muteVideoUserIdList: (state) => state.muteVideoUserIdList,
            muteAudioUserIdList: (state) => state.muteAudioUserIdList
        })
    },
    data() {
        return {
            isShowVideoCall: false,
            isVideoOn: true,
            isAudioOn: true,
            userId2Name: {},
            callFlag: false,
            cancelFlag: false
        };
    },
    mounted() {
        if (this.callStatus === 'connected' && !this.isInviter) {
            this.startMeeting();
            this.updateUserId2Name(this.meetingUserIdList);
        }

        let param = this.$route.params.call;
        console.log('call video to user ID', param);
        if (param) {
            param = String(param);
            this.handleCallUser({ param });
        }
    },
    destroyed() {
        this.$store.commit('updateMuteVideoUserIdList', []);
        this.$store.commit('updateMuteAudioUserIdList', []);
        if (this.callStatus === 'connected') {
            this.$trtcCalling.hangup();
            this.$store.commit('updateCallStatus', 'idle');
        }
    },
    watch: {
        callStatus: function (newStatus, oldStatus) {
            // 作为被邀请者, 建立通话连接
            if (newStatus !== oldStatus && newStatus === 'connected') {
                this.startMeeting();
                this.updateUserId2Name(this.meetingUserIdList);
            }
        },
        meetingUserIdList: function (newList, oldList) {
            if (newList !== oldList || newList.length !== oldList) {
                this.updateUserId2Name(newList);
            }
        }
    },
    methods: {
        handleCallUser: function ({ param }) {
            console.log('handleCallUser!!!!!!!!!!!!!!!!!!!!!', param);
            this.callFlag = true;
            this.$trtcCalling
                .call({
                    userID: param,
                    type: this.TrtcCalling.CALL_TYPE.VIDEO_CALL
                })
                .then(() => {
                    this.callFlag = false;
                    this.$store.commit('userJoinMeeting', this.currentUser.id);
                    this.$store.commit('updateCallStatus', 'calling');
                    this.$store.commit('updateIsInviter', true);
                });
        },
        handleCancelCallUser: function () {
            this.cancelFlag = true;
            this.$trtcCalling.hangup().then(() => {
                this.cancelFlag = false;
                this.$store.commit('dissolveMeeting');
                this.$store.commit('updateCallStatus', 'idle');
                this.$router.go(-1);
            });
        },
        startMeeting: function () {
            if (this.meetingUserIdList.length >= 3) {
                // 多人通话
                const lastJoinUser = this.meetingUserIdList[this.meetingUserIdList.length - 1];
                this.$trtcCalling.startRemoteView({
                    userID: lastJoinUser,
                    videoViewDomID: `video-${lastJoinUser}`
                });
                return;
            }
            this.isShowVideoCall = true;
            this.$trtcCalling.startLocalView({
                userID: this.currentUser.id,
                videoViewDomID: `video-${this.currentUser.id}`
            });
            const otherParticipants = this.meetingUserIdList.filter((userId) => userId !== this.currentUser.id);
            otherParticipants.forEach((userId) => {
                this.$trtcCalling.startRemoteView({
                    userID: userId,
                    videoViewDomID: `video-${userId}`
                });
            });
        },
        handleHangup: function () {
            this.$trtcCalling.hangup();
            this.isShowVideoCall = false;
            this.$store.commit('updateCallStatus', 'idle');
            this.$router.go(-1);
        },
        toggleVideo: function () {
            this.isVideoOn = !this.isVideoOn;
            if (this.isVideoOn) {
                this.$trtcCalling.openCamera();
                const muteUserList = this.muteVideoUserIdList.filter((userId) => userId !== this.currentUser.id);
                this.$store.commit('updateMuteVideoUserIdList', muteUserList);
            } else {
                this.$trtcCalling.closeCamera();
                const muteUserList = this.muteVideoUserIdList.concat(this.currentUser.id);
                this.$store.commit('updateMuteVideoUserIdList', muteUserList);
            }
        },
        toggleAudio: function () {
            this.isAudioOn = !this.isAudioOn;
            this.$trtcCalling.setMicMute(!this.isAudioOn);
            if (this.isAudioOn) {
                const muteUserList = this.muteAudioUserIdList.filter((userId) => userId !== this.currentUser.id);
                this.$store.commit('updateMuteAudioUserIdList', muteUserList);
            } else {
                const muteUserList = this.muteAudioUserIdList.concat(this.currentUser.id);
                this.$store.commit('updateMuteAudioUserIdList', muteUserList);
            }
        },
        closeAudio: function () {
            this.isAudioOn = false;
            const muteUserList = this.muteAudioUserIdList.concat(this.currentUser.id);
            this.$store.commit('updateMuteAudioUserIdList', muteUserList);
        },
        isUserMute: function (muteUserList, userId) {
            return muteUserList.indexOf(userId) !== -1;
        },
        updateUserId2Name: async function (userIdList) {
            let userId2Name = {};
            let loginUserId = this.currentUser.id;
            for (let i = 0; i < userIdList.length; i++) {
                const userId = userIdList[i];
                if (!this.userId2Name[userId]) {
                    const userName = await getUsernameByUserid(userId);
                    userId2Name[userId] = userName;
                    if (loginUserId === userId) {
                        userId2Name[userId] += '(me)';
                    }
                }
            }
            this.userId2Name = {
                ...this.userId2Name,
                ...userId2Name
            };
        },
        goto: function (path) {
            this.$router.push(path);
        }
    }
};
</script>

<style scoped>
.video-call-section {
    padding-top: 50px;
    width: 800px;
    margin: 0 auto;
}
.video-call-section-header {
    font-size: 24px;
}
.video-call-section-title {
    margin-top: 30px;
    font-size: 20px;
}
.video-conference {
    display: none;
    margin-top: 20px;
}
.video-conference.is-show {
    display: block;
}

.video-conference-list {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}

.user-video-container {
    position: relative;
    text-align: left;
    width: 360px;
    height: 240px;
    margin: 10px;
}

.user-video-status {
    position: absolute;
    right: 50px;
    bottom: 20px;
    width: 24px;
    height: 27px;
    z-index: 10;
    background-image: url('../../../assets/camera-on.png');
    background-size: cover;
}
.user-video-status.is-mute {
    background-image: url('../../../assets/camera-off.png');
}

.user-audio-status {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 22px;
    height: 27px;
    z-index: 10;
    background-image: url('../../../assets/mic-on.png');
    background-size: cover;
}

.user-audio-status.is-mute {
    background-image: url('../../../assets/mic-off.png');
}

.video-conference-action {
    margin-top: 10px;
}

.video-item-username {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
    color: #ffffff;
}
@media screen and (max-width: 767px) {
    .video-call-section {
        width: 100%;
    }
    .video-conference-list {
        margin: 0;
        padding: 10px;
    }
    .user-video-container {
        margin: 5px;
    }
}
</style>
