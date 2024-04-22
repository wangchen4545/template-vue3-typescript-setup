import axios from "axios";
import { sgmLog, sgmError } from "./util";
import { projectName } from '../../ask.module.js'

import querystring from "querystring";

// 创建axios实例
let service: any = {}

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;';

service = axios.create({
  withCredentials: true,
  timeout: 8000 // 请求超时时间
})

// request拦截器 axios的一些配置
service.interceptors.request.use(
  async (config: any) => {
    if (config.method == 'get') {
      config.params = ({ "reqData": JSON.stringify(Object.assign({}, config.params || {})) })
    } else if (config.method == 'post') {
      config.data = querystring.stringify({ reqData: JSON.stringify(config.params) })
    }
    return config;
  },
  (error: any) => {
    // Do something with request error
    console.error("error:", error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器 axios的一些配置
service.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    if (res && res.resultCode === 0) {
      return Promise.resolve(res.resultData);
    } else if (res && res.resultCode === 3) {
      sgmLog({
				code: projectName + '_未登录',
				type: 1,
				msg: 'eval=>' + response.config.url,
			});
      //未登录
      const url = encodeURIComponent(window.location.href);
      window.location.replace('https://plogin.m.jd.com/user/login.action?appid=421&returnurl=' + url)
    }else if(response.config.neederror&&res && res.resultCode === -1){
			//转入主接口挡板接口
			window.location.replace("https://res.jr.jd.com/base/baffle/index.html")
		} else {
      sgmError({
        msg: 'SYSTEM_ERROR_GATEWAY_' + projectName,
        stack: res && JSON.stringify(res),
        filename: '',
        level: 1
      }); 
      return Promise.reject(res);
    }
  },
  (error: any) => {
    const errorContent = {
			msg: '', //String出错信息.可以在作为筛查指标，必传
			stack: '', //String错误堆栈信息，必传
			filename: '', //String出错文件，默认值“error”
			// errorType: '', //String错误类型，默认取 event.type，手动上报时也可以设置其他值
			errorLevel: 1, //int异常级别，1，表示最高，可以是其他值，如 2，3，4 等
		};
		let errorInfo = '';
		try {
			errorInfo = error && JSON.stringify(error);
			errorContent.stack = error.config.url;
			errorContent.filename = errorInfo;
			if (error.message && error.message.indexOf('timeout') > -1) {
				errorContent.msg = 'SYSTEM_ERROR_TIMEOUT_' + projectName;
			} else if (error.message && error.message.indexOf('aborted') > -1) {
				errorContent.msg = 'SYSTEM_ERROR_ABORT_' + projectName;
			} else {
				errorContent.msg = 'SYSTEM_ERROR_NETWORK_' + projectName;
			}
		} catch (e) {
			const eRes = e && JSON.stringify(e);
			errorContent.msg = 'SYSTEM_ERROR_NETWORK_' + projectName;
			errorContent.stack = eRes as string;
		}
		sgmError(errorContent);
    return Promise.reject(error);
  }
);
export default service;
