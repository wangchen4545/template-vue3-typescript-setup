//公共方法类
import { sgmData } from "@/types/index.js";
import { projectName } from "../../ask.module.js";

export function getUrlString(name: string): any {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

export function isjrApp(): boolean {
  const ua: string = navigator.userAgent.toLowerCase();
  if (ua.indexOf('jdjr-app') > -1) {
    return true;
  } else {
    return false;
  }
}

export function isJDApp(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('jdapp') > -1) {
      return true;
  } else {
      return false;
  }
}

export function isWx(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == null) {
    return false;
  } else {
    return true;
  }
}

export function closeView() {
  if ((isjrApp()) && JrBridge) {
		JrBridge.closeView();
	} else {
		const prv = document.referrer;
		if (prv) {
			history.go(-1);
		} else {
			window.close();
			setTimeout(function () {
				history.go(-1);
			}, 500);
		}
	}
}


export function openScheme(url: string) {
	if(isjrApp() && JrBridge) {
		JrBridge.openScheme({
			jumpType: '7', //不登录跳M页无token，登录跳M页有Token
			jumpUrl: url
		})
	}else if(isWx()) {
		location.href = url
	}else {
		window.open(url);
	}
}

export function sgmLog(obj: sgmData) {
  try {
  if (
    window.__sgm__ &&
    window.__sgm__.custom &&
    typeof window.__sgm__.custom === 'function'
  ) {
    window.__sgm__.custom({
      type: obj['type'], //int自定义类型（1-error,2-warn,3-info）
      code: obj['code'], //String自定义标示代码，可以是任意字符串，用于查询
      msg: obj['msg'], //String自定义信息，可以传入对象
    });
  }
  } catch (e) {
    console.log(e)
  }
}

export function sgmError(obj: sgmData) {
try {
  if (window.__sgm__ && window.__sgm__.error && typeof window.__sgm__.error === "function") {
    window.__sgm__.error({
      msg: obj["msg"] || projectName, //String出错信息，可以作为筛查指标，必传
      stack: obj["stack"] || projectName, //String错误堆栈信息，必传
      filename: obj["filename"] || "error", //String出错文件，默认值 "error"
      errorType: obj["stack"] || "apiError", //string错误类型，默认去event.type,手动上报时也可以设置其他值
      errorLevel: obj["level"] || 1, //int异常级别，1，表示最高，可以是其他值，如 2,3,4等
    });
  }
}catch(e) {
  console.log('error')
}
}