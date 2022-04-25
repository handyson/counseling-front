import TRTCCalling from 'trtc-calling-js';
import store from '../store';

export function createTrtcCalling() {
  console.log("createTrtcCalling");
  return new TRTCCalling({
    SDKAppID: 1400667624
  });
}

// 根据userid从聊天用户获取nickname
export async function getUsernameByUserid(userId) {
  // return userId;
  var userName = store.state.users.filter(item => {
    return item.id == userId;
  });

  if (userName[0]) {
    return userName[0].nickname;
  } else {
    return store.state.currentUser.nickname;
  }
}

// TODO
export async function getUserDetailInfoByUserid(userId) {
  return {
    name: userId,
    avatar: '',
    userId: userId
  };
}

const LOG_PREFIX = 'trtc-callling-webrtc-demo:';
export function log(content) {
  console.log(`${LOG_PREFIX} ${content}`)
}
