import request from './request';
const BASE_API = window.location.protocol + process.env.VUE_APP_API_BASE_URL;

//策略平台新接口
export function queryStallNew(query:object) {
    return request({
        url: BASE_API + '/gw/generic/jrm/h5/m/queryStallNew',
        method: 'post',
        params: query,
    });
}
