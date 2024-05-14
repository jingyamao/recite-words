import request from "../../util/request";
import { getToken, getUserId,removeToken,setToken } from "../../util/auth";

// 登录
export function loginUserName(data) {
    return request({
        method: "post",
        url: "/login",
        data:{
            username: data.userName,
            password: data.password
        }
    });
}

// 注册获取验证码
export function registerUsersmsCode(data) {
    return request({
        method: "post",
        url: "/register",
        data:{
            action: 'regist',
            email: data.email,
            phone: data.mobile,
        }
    });
}

// 注册
export function registerUser(data) {
    return request({
        method: "post",
        url: "/register",
        data:{
            action: 'vetify',
            vetify: data.smsCode,
            verification_code: data.verification_code,
            username: data.userName,
            password: data.password,
            email: data.email,
            phone: data.mobile,
        }
    });
}

// 获取用户信息
export function getInfo() {
    return request({
        method: "post",
        url: "/settings",
        headers:{
            Authorization: "Bearer "+getToken()
        },
        data:{
            username: getUserId()
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
