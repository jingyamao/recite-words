import request from "../../util/request";
import { getToken, removeToken,setToken } from "../../util/auth";

// 登录
export function loginUserName(data) {
    return request({
        method: "post",
        url: "/login",
        params:{
            userName: data.userName,
            password: data.password
        }
    });
}

// 注册
export function registerUser(data) {
    return request({
        method: "post",
        url: "/register",
        params:{
            action: 'regist',
            userName: data.userName,
            password: data.password,
            email: data.email,
            phone: data.phone,
            vetify: data.vetify,
            verification_code: data.verification_code
        }
    });
}

// 注册获取验证码
export function registerUsersmsCode(data) {
    return request({
        method: "post",
        url: "/register",
        params:{
            action: 'vetify',
            email: data.email
        }
    });
}


// 获取用户信息
export function getInfo() {
    return request({
        method: "post",
        url: "/settings",
        headers:{
            Authorization: getToken()
        }
    });
}

// 获取本机ip
export function getIP() {
    return request({
        method: "get",
        url: "https://restapi.amap.com/v3/ip",
        params:{
            key:"a97860fb4b6caa184ab1d5c6034a8163"
        }
    });
}

// 获取本机ip所在城市天气
export function getIPCity(city) {
    return request({
        method: "get",
        url: `https://restapi.amap.com/v3/weather/weatherInfo`,
        params:{
            key: "a97860fb4b6caa184ab1d5c6034a8163",
            city:city
        }
    });
}
