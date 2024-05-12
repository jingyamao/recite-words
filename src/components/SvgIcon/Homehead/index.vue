<template>
    <div>
        <div class="header-nav">
            <div class="logoImg">
                <img src="./logo.webp" alt="" />
            </div>
            <el-menu
                mode="horizontal"
                router
                :default-active="defaultPage"
                active-text-color="#a3c57d"
                class="el-menu-demo"
            >
                <el-menu-item
                    v-for="item in routerArr"
                    :key="item.name"
                    :index="'/' + item.path"
                >
                    {{ item.name }}
                </el-menu-item>
            </el-menu>

            <div class="login">
                <el-dropdown v-if="token">
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                @click="toUser"
                                class="dropdownNickName"
                                >{{ userInfo.nickName }}</el-dropdown-item
                            >
                            <el-dropdown-item @click="toUser"
                                >个人中心</el-dropdown-item
                            >
                            <el-dropdown-item @click="toLogout"
                                >退出登录</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-icon v-else :size="30" @click="toLogin">
                    <UserFilled />
                </el-icon>
                <p class="login-text" v-if="!token" @click="toLogin">登录</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { getInfo, logout,getIP,getIPCity } from "../../api/Login";
import { onMounted, ref, computed } from "vue";
import { getToken, removeToken,setToken } from "../../util/auth";
import { ElMessage } from "element-plus";

const router = useRouter();
const token = localStorage.getItem("token");


// 路由数组
const routerArr = [
    { name: "首页", path: "home" },
    { name: "错题记录", path: "error" },
    { name: "单词书", path: "word_book" },
    { name: "单词测试", path: "word_test" },
];

const defaultPage = computed(() => {
    return "/" + router.currentRoute.value.path.split("/")[1];
});

// 登录
const toLogin = () => {
    router.push("/login");
};

// 登出
const toLogout = () => {
    removeToken();
    logout()
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

// 用户信息
const userInfo = ref({});
const getUserInfo = () => {
    getInfo()
        .then((res) => {
            userInfo.value = res.data;
            if (res.code === 401) {
                localStorage.removeItem("token");
                ElMessage.error("登录过期，请重新登录");
                router.push("/login");
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

// 跳转个人中心
const toUser = () => {
    router.push(`/user/${userInfo.value.userId}`);
};

onMounted(() => {
    getUserInfo();
});
</script>

<style lang="less" scoped>
.header-nav {
    border-bottom: 1px solid #d8d8d8;
    height: 8vh;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logoImg {
        height: 100%;
        display: flex;
        align-items: center;
        img {
            height: 100%;
            width: 15vh;
            margin-left: 1vh;
        }
    }
    .time {
        height: 100%;
        width: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .el-col{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .title{
                font-weight: bold; /* 加粗 */
                color: #333; /* 字体颜色 */
                font-size: 1.3vw;
            }
            span{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                width: 100%;
                display: inline-block;
                font-size: 0.9vw;
            }
        }
    }
    .el-menu-demo {
        height: 100%;
        width: 70vh;
        border-bottom: 0;
        .el-menu-item {
            background-color: transparent;
            color: black;
        }
        .el-menu-item:hover {
            color: #a3c57d;
            background-color: #e5f4e6;
            transition: color 0.3s ease, background-color 0.3s ease;
        }
    }

    :deep(.el-menu-item) {
        font-size: 2vh;
        height: 100%;
    }
    .login {
        position: absolute;
        // padding-bottom: 0.5vh;
        right: 5vh;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5vw;
        height: 100%;
        .login-text {
            font-size: 1.8vh;
            cursor: pointer;
        }
    }
    .login:hover {
        color: #a3c57d;
        background-color: #e5f4e6;
        transition: color 0.3s ease, background-color 0.3s ease;
    }
}
</style>
