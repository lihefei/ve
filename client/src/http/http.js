import axios from 'axios';
import router from '../router';
import { Message, Loading } from 'element-ui';

let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    });

}

function endLoading() {
    loading.close();
}


//请求拦截
axios.interceptors.request.use(config => {

    startLoading(); //加载动画

    let token = localStorage.eleToken;
    if (token) {
        //设置统一的请求头header
        config.headers.Authorization = token;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use(response => {
    endLoading(); //结束加载动画
    return response;
}, error => {
    /* 错误提醒 */
    endLoading(); //结束加载动画
    Message.error(error.response.data); //错误提示


    /* 获取错误码 */
    const { status } = error.response;
    if (status == 401) {
        Message.error('token失效, 请重新登录');
        localStorage.removeItem('eleToken'); //清除token
        router.push('/login'); //返回登录页面
    }

    return Promise.reject(error);
});


export default axios;