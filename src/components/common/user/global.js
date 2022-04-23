

export function getWay(key) {

  
    // 基本事件类型ID
const consltWayMap = new Map([
    [0,"即时聊天咨询"],
    [1,"语音咨询"],
    [2,"视频咨询"],
    [3,"面对面咨询"]
]);
        var myMap = new Map();
        let list = key.split(';');
        for(const i in list){
            myMap.set(i,consltWayMap[key])
        }
        return myMap;
    

};