import request from "../../util/request";
import { getToken,getUserId, removeToken,setToken } from "../../util/auth";

// 获取每日计划
export function get_daily_words(data) {
    return request({
        method: "post",
        url: "/wordbookchoose",
        headers:{
            Authorization: "Bearer "+getToken()  
        },
        data:{
            action: 'get_daily_words',
            username: getUserId(),
            word_book_id:data.word_book_id,
            daily_plan_id:data.daily_plan_id,
            review_plan_id:data.review_plan_id            
        }
    });
}

// 获取所有单词书
export function select_words() {
    return request({
        method: "post",
        url: "/wordbookchoose",
        headers:{
            Authorization: "Bearer "+getToken()
        },
        data:{
            action: 'select',
            username: getUserId()
        }
    });
}

// 新增背诵单词
export function update_daily_plan() {
    return request({
        method: "post",
        url: "/wordbookchoose",
        headers:{
            Authorization: "Bearer "+getToken()
        },
        data:{
            action: 'update_daily_plan',
            username: getUserId()
        }
    });
}

// 新增背诵单词书单词
export function edit_actionAdd(data) {
    return request({
        method: "post",
        url: "/wordbookchoose",
        headers:{
            Authorization: "Bearer "+getToken()
        },
        data:{
            action: {edit_action:'add'},
            username: getUserId()
        }
    });
}

// 修改背诵单词书单词
export function edit_actionUpdate(data) {
    return request({
        method: "post",
        url: "/wordbookchoose",
        headers:{
            Authorization: "Bearer "+getToken()
        },
        data:{
            action: {edit_action:'update'},
            username: getUserId()
        }
    });
}