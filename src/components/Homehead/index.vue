<template>
    <div>
        <div class="header-nav">
            <div class="logoImg">
                <img src="./logo.webp" alt="" />
            </div>
            <div class="time">
                <el-row>
                    <el-col :span="6">
                        <span class="title">
                            {{ weather.city }}
                        </span>
                        <span>
                            天气：{{ weather.weather }}
                        </span>
                    </el-col>
                    <el-col :span="14">
                        <span>
                            风向：{{ weather.winddirection }},
                            风力：{{ weather.windpower }}
                        </span>
                        <span>
                            温度：{{ weather.temperature }}，
                            湿度：{{ weather.humidity }}
                        </span>
                        <span>
                            最近一次更新时间：{{ weather.reporttime }}
                        </span>
                    </el-col>
                    <el-col :span="4">
                        <el-icon size="50px" color="#a3c576" v-if="weather.weather === '晴' "><Sunny /></el-icon>
                        <el-icon size="50px" color="#a3c576" v-if="weather.weather === '' "><MostlyCloudy /></el-icon>
                        <el-icon size="50px" color="#a3c576" v-if="weather.weather === '' "><PartlyCloudy /></el-icon>
                        <el-icon size="50px" color="#a3c576" v-if="weather.weather === '小雨' "><Drizzling /></el-icon>
                        <el-icon size="50px" color="#a3c576" v-if="weather.weather === '大雨' "><Pouring /></el-icon>
                        <el-icon size="50px" color="#a3c576" v-if="weather.weather === '多云' "><Cloudy /></el-icon>
                        <el-icon size="50px" color="#a3c576" v-if="weather.weather === '' "><Lightning /></el-icon>
                    </el-col>
                </el-row>
            </div>
            <el-menu
                mode="horizontal"
                router
                :default-active="defaultPage"
                active-text-color="rgb(119, 171, 183)"
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
                    <el-avatar
                        class="userAvatar"
                        :size="50"
                        src="/src/components/Homehead/logo.webp"
                    ></el-avatar>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                @click="toUser"
                                class="dropdownNickName"
                                >{{ userInfo.Username }}</el-dropdown-item
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
import { getInfo,getIP,getIPCity } from "../../api/login";
import { onMounted, ref, computed } from "vue";
import { getToken, removeToken,setToken,removeUserId } from "../../util/auth";
import { ElMessage } from "element-plus";

const router = useRouter();
const token = localStorage.getItem("token");

// 在组件挂载后获取当前时间，并更新 currentTime 数据
onMounted(() => {
    getUserIP();
    getUserInfo();
});

// 获取当前ip
const weather = ref('')
function getUserIP(){
    getIP()
    .then(res =>{
        // console.log(res)
        getIPCity(res.city)
        .then(res =>{
            // console.log(res)
            weather.value = res.lives[0];
        })
        .catch(error =>{
            console.log(error)
        })
    })
    .catch(error =>{
        console.log(error)
    })
}


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
    removeUserId();
    ElMessage.success("退出成功");
    router.push("/login");
};

// 用户信息
const userInfo = ref({});
const getUserInfo = () => {
    getInfo()
        .then((res) => {
            userInfo.value = res.result.User_Info;
            // if (res.code === 401) {
            //     localStorage.removeItem("token");
            //     ElMessage.error("登录过期，请重新登录");
            //     router.push("/login");
            // }
        })
        .catch((err) => {
            console.log(err);
        });
};

// 跳转个人中心
const toUser = () => {
    router.push(`/userCenter`);
};


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
            color: rgb(105, 201, 223);
            background-color: rgb(226, 242, 246);
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
        color: rgb(119, 171, 183);
        background-color: rgb(209, 229, 233);
        transition: color 0.3s ease, background-color 0.3s ease;
    }
}
</style>
