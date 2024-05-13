import request from "../../util/request";
import { getToken, removeToken,setToken } from "../../util/auth";

// 获取每日计划
export function get_daily_words(data) {
    return request({
        method: "post",
        url: "/wordbookchoose",
        headers:{
            Authorization: getToken()
        },
        params:{
            action: 'get_daily_words'
        }
    });
}

