import http from './public'
// 商品列表
export const getConsultantList = (params) => {
    return http.fetchGet('/api/consultant/selectShowIndex')
}
export const getTypeList = (params) => {
    return http.fetchGet('/api/consultantType/selectAll')
}

