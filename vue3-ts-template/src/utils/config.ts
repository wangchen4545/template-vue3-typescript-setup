const config = {
    SYSTEM_CODE: 'xjk-zhilianqianyue',
    URL: {
        XJK_HOLD: 'https://lc.jr.jd.com/ck/xjkHold/index/', //小金库持仓
    }
}
const mode = process.env.VUE_APP_MODE;
if(mode == 'dev' || mode == 'test') {
    config.SYSTEM_CODE = 'test';
    config.URL.XJK_HOLD = 'http://cf-test.jd.com/ck/xjkHold/index/'
}else if(mode == 'yufa') {
    config.URL.XJK_HOLD = 'http://cf-minner.jd.com/ck/xjkHold/index/'
}
export default config;