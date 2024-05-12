<template>
    <div class="login">
        <el-form
            ref="loginRef"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
        >
            <h3 class="title">快背单词</h3>
            <el-form-item>
                <el-radio-group v-model="loginType" class="choseType">
                    <el-radio label="userName">用户名登录</el-radio>
                    <el-radio label="register">注册</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 登陆表单 -->
            <el-form-item prop="userName" v-if="loginType === 'userName'" >
                <el-input
                    v-model="loginForm.userName"
                    type="text"
                    size="large"
                    auto-complete="off"
                    placeholder="用户名"
                >
                    <template #prefix
                        ><el-icon class="el-input__icon input-icon"
                            ><UserFilled /></el-icon></template
                ></el-input>
            </el-form-item>
            <el-form-item prop="password" v-if="loginType === 'userName'">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    size="large"
                    auto-complete="off"
                    placeholder="密码"
                    @keyup.enter="submitForm"
                >
                    <template #prefix
                        ><el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item style="width: 100%" v-if="loginType === 'userName'">
                <el-button
                    :loading="loading"
                    size="large"
                    type="primary"
                    color="rgb(119, 171, 183)"
                    round 
                    plain
                    style="width: 100%"
                    @click.prevent="submitForm"
                >
                    <span v-if="!loading">登录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form-item>

            <!-- 注册表单 -->
            <el-form-item prop="userName" v-if="loginType === 'register'" >
                <el-input
                    v-model="register.userName"
                    type="text"
                    size="large"
                    auto-complete="off"
                    placeholder="用户名"
                >
                    <template #prefix
                        ><el-icon class="el-input__icon input-icon"
                            ><UserFilled /></el-icon></template
                ></el-input>
            </el-form-item>
            <el-form-item prop="password" v-if="loginType === 'register'">
                <el-input
                    v-model="register.password"
                    type="password"
                    size="large"
                    auto-complete="off"
                    placeholder="密码"
                >
                    <template #prefix
                        ><el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword" v-if="loginType === 'register'">
                <el-input
                    v-model="confirmPassword"
                    type="password"
                    size="large"
                    auto-complete="off"
                    placeholder="请确认密码"
                >
                    <template #prefix
                        ><el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="mobile" v-if="loginType === 'register'">
                <el-input
                    v-model="register.mobile"
                    type="text"
                    size="large"
                    placeholder="手机号"
                >
                    <template #prefix>
                        <el-icon class="el-input__icon input-icon"
                            ><PhoneFilled
                        /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="email" v-if="loginType === 'register'">
                <el-input
                    v-model="register.email"
                    type="text"
                    size="large"
                    placeholder="邮箱"
                >
                    <template #prefix>
                        <el-icon class="el-input__icon input-icon"><Message /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item
                prop="smsCode"
                v-if="loginType === 'register'"
                class="smsCode"
            >
                <el-input
                    v-model="register.smsCode"
                    type="text"
                    size="large"
                    auto-complete="off"
                    placeholder="验证码"
                >
                    <template #prefix>
                        <el-icon><ChatLineRound /></el-icon>
                    </template>
                </el-input>
                <el-button
                    @click="getCode"
                    plain
                    color="rgb(119, 171, 183)"
                    :disabled="isCountingDown"
                    >{{ isCountingDown ? `${countdown}s` : "获 取" }}</el-button
                >
            </el-form-item>
            <el-form-item style="width: 100%" v-if="loginType === 'register'">
                <el-button
                    size="large"
                    type="primary"
                    color="rgb(119, 171, 183)"
                    round 
                    plain
                    style="width: 100%"
                    @click.prevent="submitForm"
                >
                    <span>注册</span>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from "vue";
// import { loginUserName } from "../../api/login/index";
import { setToken } from "../../util/auth";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();


// 验证密码是否一致
const confirmPassword = ref('')
const validateConfirmPassword = (rule, value, callback) => {
    if (confirmPassword.value === register.value.password) {
        callback();
    } else {
        callback(new Error("两次输入密码不一致"));
    }
};
// 判断登陆还是注册
const loginType = ref('userName')

// 注册登陆校验
const loginRules = {
    userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    email: [
        { required: true, message: "请输入邮箱地址", trigger: "blur" },
        {
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "邮箱格式不正确",
            trigger: "blur",
        },
    ],
    mobile: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
        },
    ],
    smsCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符",
            trigger: "blur",
        },
    ],
    confirmPassword: [
        { required: true, message: "请确认密码", trigger: "blur" },
        { validator: validateConfirmPassword, trigger: "blur" },
    ],
};

const loading = ref(false);

// 注册表单
const register = ref({
    userName: "",
    password: "",
    smsCode: "",
    email: "",
    mobile: ""
});
// 获取验证码
const getCode = () => {
    ElMessage.success(res.msg);
    isCountingDown.value = true;
    const timer = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            isCountingDown.value = false;
            countdown.value = 60;
            clearInterval(timer);
        }
    }, 1000);
    // getSmsCode(register.value.email)
    //     .then((res) => {
    //         if (res.code === 200) {
    //             ElMessage.success(res.msg);
    //             isCountingDown.value = true;
    //             const timer = setInterval(() => {
    //                 if (countdown.value > 0) {
    //                     countdown.value--;
    //                 } else {
    //                     isCountingDown.value = false;
    //                     countdown.value = 60;
    //                     clearInterval(timer);
    //                 }
    //             }, 1000);
    //         } else {
    //             ElMessage.error(res.msg);
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
};

// 验证码倒计时
const countdown = ref(60);
const isCountingDown = ref(false);

// 登陆表单
const loginRef = ref();
const loginForm = ref({
    userName: "",
    password: "",
    rememberMe: false,
});

// 登录注册表单
const submitForm = async () => {
    ElMessage.success("登录成功");
    setTimeout(() => {
        router.push("/home");
    }, 800);
    // if (!loginRef.value) return;
    // await loginRef.value.validate((valid) => {
    //     if (valid) {
    //         loginByUserName();
    //     } else {
    //         return false;
    //     }
    // });
};
// 登陆
const loginByUserName = () => {
    loginUserName(loginForm.value)
        .then((res) => {
            console.log(res.data)
            setToken(res.data.token);
            ElMessage.success("登录成功");
            setTimeout(() => {
                router.push("/home");
            }, 800);
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>

<style lang="less" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 99vh;
    background-image: url("../../common/background1.webp");
    background-size: cover;
    background-position: center;
    .login-form {
        border-radius: 3vh;
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        width: 40vh;
        padding: 2.5vh 2.5vh 0.5vh 2.5vh;
        .el-input {
            --el-input-border-radius: 2vh;
            height: 5vh;
            input {
                height: 4vh;
            }
            .input-icon {
                height: 4vh;
                width: 2vh;
                margin-left: 0;
            }
        }
        .title {
            margin: 0px auto 30px auto;
            text-align: center;
            color: #707070;
        }
        .choseType {
            margin: 0 auto;
        }
        .smsCode {
            :deep(.el-form-item__content) {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .el-input {
                    width: 70%;
                }
                .el-button {
                    width: 25%;
                    height: 100%;
                    border-radius: 1.5vh;
                    margin-right: 0vh;
                }
            }
        }
    }
}
</style>
