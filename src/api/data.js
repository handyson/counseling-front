import http from './public'
// ๅๅๅ่กจ
export const getConsultantList = (params) => {
    return http.fetchGet('/api/consultant/selectShowIndex')
}
export const getTypeList = (params) => {
    return http.fetchGet('/api/consultantType/selectAll')
}

