<template>
    <div class="main">
        <div class="head">
            <el-row>
                <el-col :span="4">
                    <div class="header" >
                        <el-avatar
                            :src="UserNewsValue.avatar"
                            :size="120"
                        />
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="userNews" >
                        <el-row>
                            <el-col :span="20">
                                <h3>
                                    昵称：{{ UserNewsValue.nickName }}
                                </h3>
                                <p>
                                    个人简介：{{ UserNewsValue.introduction }}
                                </p>
                                <p>
                                    账号创建时间：{{ UserNewsValue.createTime }}
                                </p>
                                <p style="margin-bottom:0.5%">
                                    上次信息修改时间：{{ UserNewsValue.updateTime }}
                                </p>
                            </el-col>
                            <el-col :span="4">
                                <el-button type="success" plain :icon="Edit" circle style="margin-left: 10%;" @click="dialogUserIntro = true"/>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="userNews"> 
                        <div style="height:100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;">
                            <div>
                                <p  style="font-size:1.2vw">
                                    账号：{{ UserNewsValue.userName }}
                                </p>
                                <p  style="font-size:1.2vw">
                                    绑定手机号：{{ UserNewsValue.mobile }}
                                </p>
                            </div>
                            <el-button type="success" style="width: 80%;" plain size="small" @click="toeditpassMobile">修改</el-button>
                        </div>   
                    </div>
                </el-col>
            </el-row>
        </div>
        
        <div class="Banner" >
            <div class="userNews">
                <el-descriptions
                    class="margin-top"
                    title="个人基本信息"
                    size="large"
                    :column="3"
                    border
                >
                    <template #extra>
                        <el-button type="success" plain :icon="Edit" circle @click="dialogUserValue = true"/>
                    </template>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon>
                            <user />
                        </el-icon>
                        姓名
                        </div>
                    </template>
                    {{ UserNewsValue.name }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <iphone />
                        </el-icon>
                        手机号
                        </div>
                    </template>
                    {{ UserNewsValue.mobile }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Female />
                                </el-icon>
                                性别
                            </div>
                        </template>
                        {{ UserNewsValue.gender }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Avatar /></el-icon>
                                年龄
                            </div>
                        </template>
                        {{ UserNewsValue.age }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <tickets />
                        </el-icon>
                        生日
                        </div>
                    </template>
                    {{ UserNewsValue.birthday }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon><MessageBox /></el-icon>
                        职业
                        </div>
                    </template>
                    {{ UserNewsValue.occupation }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <office-building />
                        </el-icon>
                        地址
                        </div>
                    </template>
                    {{ UserNewsValue.address }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
        <div class="Banner" >
            <div class="userNews">
                <el-descriptions
                    class="margin-top"
                    title="身体基本信息"
                    size="large"
                    :column="3"
                    border
                >
                    <template #extra>
                        <el-button type="success" plain :icon="Edit" circle @click="dialogUserBody = true"/>
                    </template>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon>
                            <user />
                        </el-icon>
                        身高
                        </div>
                    </template>
                    {{ UserNewsValue.height }}
                    <el-tag type="success">cm</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon><TakeawayBox /></el-icon>
                        体重
                        </div>
                    </template>
                    {{ UserNewsValue.weight }}
                    <el-tag type="success">kg</el-tag>
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon><FirstAidKit /></el-icon>
                        BMI
                        </div>
                    </template>
                    {{ BMI }}
                    <el-tag :type="warn">{{warnValue}}</el-tag>
                    </el-descriptions-item>

                </el-descriptions>
            </div>
        </div>
        
        <!-- 个人简介修改 -->
        <el-dialog v-model="dialogUserIntro" title="修改个人信息" width="600" draggable>
            <div class="Userhead">
                <el-text class="mx-1" size="large">请选择头像上传</el-text>
                <el-upload
                    class="avatar-uploader"
                    action="/api/common/upload"
                    :headers="token"
                    :show-file-list="false"
                    :on-success="avatarUploadProps.onSuccess"
                    :before-upload="avatarUploadProps.beforeUpload"
                >
                    <img v-if="UserNews.avatar" :src="UserNews.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </div>
            <el-form
            ref="UserIntroForm"
            style="max-width: 600px"
            :model="UserNews"
            status-icon
            :rules="UserIntrorules"
            label-width="auto"
            class="demo-ruleForm"
        >
            <el-form-item label="昵称" prop="nickName">
            <el-input v-model="UserNews.nickName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
            <el-input
                v-model="UserNews.introduction"
                autocomplete="off"
                type="textarea"
            />
            </el-form-item>
        </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="success" @click="submitIntroForm">
                    确定
                </el-button>
            </div>
            </template>
        </el-dialog>

        <!-- 修改个人基本信息 -->
        <el-dialog v-model="dialogUserValue" title="修改身体基本信息" width="600" draggable>
            <el-form
            ref="UserValueForm"
            style="max-width: 600px"
            :model="UserNews"
            status-icon
            :rules="UserIntrorules"
            label-width="auto"
            class="demo-ruleForm"
        >
            <el-form-item label="姓名" prop="name">
            <el-input v-model="UserNews.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="UserNews.gender" class="ml-4">
                    <el-radio value="男" >男</el-radio>
                    <el-radio value="女" >女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" prop="name">
                <div class="block">
                    <el-date-picker
                        v-model="UserNews.birthday"
                        type="date"
                        placeholder="请选择日期"
                        size="default"
                        @change="handlePanelChange"
                    />
                </div>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-select
                    v-model="UserNews.age"
                    clearable
                    placeholder="请选择年龄"
                    style="width: 240px"
                    disabled
                >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="职业" prop="occupation">
            <el-input v-model="UserNews.occupation" autocomplete="off" />
            </el-form-item>
            <el-form-item label="所在省市">  
                <el-cascader 
                v-model="cascaderValue" 
                :options="cityaddress"
                clearable
                @change="handleChange"
                />
                <el-button type="success" plain @click="getUserIP">获取当前所在省市</el-button>
            </el-form-item>
            <el-form-item label="详细地址信息" prop="address">
                <el-input v-model="UserNews.address" autocomplete="off" style="width:80%"/>
            </el-form-item>
        </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="success" @click="submitUserForm">
                    确定
                </el-button>
            </div>
            </template>
        </el-dialog>

        <!-- 修改身体基本信息 -->
        <el-dialog v-model="dialogUserBody" title="修改身体信息" width="600" draggable>
            <el-form
                ref="UserBodyForm"
                style="max-width: 600px"
                :model="UserNews"
                status-icon
                :rules="UserIntrorules"
                label-width="auto"
                class="demo-ruleForm"
            >
                <el-form-item label="身高" prop="height">
                <el-input v-model.number="UserNews.height" autocomplete="off" />
                </el-form-item>
                <el-form-item label="体重" prop="weight">
                <el-input v-model.number="UserNews.weight" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="success" @click="submitaBodyForm">
                确定
                </el-button>
            </div>
            </template>
        </el-dialog>

        <!-- 展示关联用户详细信息 -->
        <el-dialog v-model="dialogassociatedUser" width="600">
            <div class="AssociatedUser">
                <el-descriptions
                    title="关联用户详细信息"
                    :column="3"
                    size="large"
                    border
                >
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon>
                                <user />
                            </el-icon>
                            账号：
                            </div>
                        </template>
                    {{ AssociatedUserValue.userName }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon>
                            <user />
                        </el-icon>
                        昵称：
                        </div>
                    </template>
                    {{ AssociatedUserValue.nickName }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon>
                            <user />
                        </el-icon>
                        姓名
                        </div>
                    </template>
                    {{ AssociatedUserValue.name }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <iphone />
                        </el-icon>
                        手机号
                        </div>
                    </template>
                    {{ AssociatedUserValue.mobile }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Female />
                                </el-icon>
                                性别
                            </div>
                        </template>
                        {{ AssociatedUserValue.gender }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Avatar /></el-icon>
                                年龄
                            </div>
                        </template>
                        {{ AssociatedUserValue.age }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <tickets />
                        </el-icon>
                        生日
                        </div>
                    </template>
                    {{ AssociatedUserValue.birthday }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon >
                            <office-building />
                        </el-icon>
                        地址
                        </div>
                    </template>
                    {{ AssociatedUserValue.address }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            
        </el-dialog>

        <!-- 关联账号 -->
        <el-dialog v-model="dialogAddassociated" width="600">
            <!-- 账户登录 -->
            <div v-show="showuserNameLogin" class="center">
                <h2>账号密码登录</h2>
                    <el-form
                        ref="UserNameFrom"
                        style="min-width: 300px"
                        :model="UserNamePassLogin"
                        status-icon
                        :rules="UserNamerules"
                        label-width="auto"
                    >
                        <el-form-item label="账号:" prop="userName" >
                            <el-input v-model="UserNamePassLogin.userName" placeholder="请输入账号" style="flex: 1;" />
                        </el-form-item>
                        <el-form-item label="密码:" prop="password" >
                            <el-input v-model="UserNamePassLogin.password" placeholder="请输入密码" style="flex: 1;" show-password/>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-button type="info" plain size="large" @click="Addassociated(2)">使用手机号登录</el-button>
                        <el-button type="success" plain size="large" @click="submitUserPassLoginForm">确认</el-button>
                    </div>
            </div>
            <!-- 手机号登录 -->
            <div v-show="showmobileLogin" class="center">
                <h2>手机号登录</h2>
                    <el-form
                        ref="UsermobileForm"
                        style="min-width: 300px"
                        :model="UsermobileValue"
                        status-icon
                        :rules="Usermobilerules"
                        label-width="auto"
                        class="fromPass"
                    >
                        <el-form-item label="手机号:" prop="mobile" >
                            <el-input v-model="UsermobileValue.mobile" placeholder="请输入手机号" style="flex: 1;" />
                        </el-form-item>
                        <el-form-item label="验证码:" prop="smsCode" style="display: flex; align-items: center;">
                            <el-input v-model="UsermobileValue.smsCode" placeholder="请输入验证码" style="flex: 1;" />
                            <el-button
                                type="success"
                                plain
                                :disabled="isCountingDown"
                                @click="getSmsCode"
                                style="margin-left: 10px;"
                            >
                                {{
                                    isCountingDown ? `${countdown}s` : "获 取"
                                }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-button type="info" plain size="large" @click="Addassociated(1)">使用账号密码登录</el-button>
                        <el-button type="success" plain size="large" @click="submitmobileForm">确认</el-button>
                    </div>
            </div>
        </el-dialog>
        <!-- 行为验证码 -->
        <el-dialog
            v-model="dialogVisible"
            width="31vh"
            class="captchaDialog"
            show-close="false"
            style="background: transparent;
                    box-shadow: none;
                    margin: 25vh auto;"
        >
            <captcha-slider @close-dialog="finishCheck"></captcha-slider>
        </el-dialog>
    </div>
</template>
<script setup>
// import {
//     getUserName,
//     putUserName,
//     getOneUser,
//     smsCodeGet,
//     putAddUserConnection,
//     putDelUserConnection,
//     postUserConnection,
//     putAddMobileConnection
// } from '../../api/User/index'
import { ref,onMounted,onBeforeUnmount} from 'vue'
import { setToken,removeToken } from "../../util/auth";
import { getToken } from '../../util/auth';
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
import {
  Edit
} from '@element-plus/icons-vue'
// import { getIP } from "../../api/Login";

const router = useRouter();

const token = {token:getToken()}

// 获取当前所在ip
function getUserIP(){
    getIP()
    .then(res =>{
        // console.log(res)
        UserNews.value.address = ''
        UserNews.value.address += res.province
        UserNews.value.address += res.city
    })
    .catch(error =>{
        console.log(error)
    })
}


// el-dialog展示
let dialogUserIntro = ref(false)
let dialogUserValue = ref(false)
let dialogUserBody = ref(false)
let dialogassociatedUser = ref(false)

// 查看关联用户详细信息
const AssociatedUserValue = ref()
function LookassociatedUser(item){
    dialogassociatedUser.value = true;
    AssociatedUserValue.value = item;
}


// 切换登录
const toggleLoginID = ref('');
function ToggleLogin(item){
    isSwitched.value = 4;
    dialogVisible.value = true;
    toggleLoginID.value = item.userId;
}

// 头像上传成功处理函数
const handleAvatarSuccess = (response, uploadFile) => {
    UserNews.value.avatar = response.data;
};

// 头像上传前的校验函数
const beforeAvatarUpload = (file) => {
    // console.log(file)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // 允许的图片格式
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    // 检查图片格式是否合法
    if (!allowedTypes.includes(file.type)) {
        ElMessage.error('照片只能是  JPEG, PNG, GIF 格式!');
        return false;
    }

    // 检查图片大小是否超出限制
    if (file.size > maxFileSize) {
        ElMessage.error('照片大小不能超过 5MB!');
        return false;
    }

    return true;
};

// 调用头像上传钩子函数
const avatarUploadProps = {
  onSuccess: handleAvatarSuccess,
  beforeUpload: beforeAvatarUpload
};

// 调整头像大小
const avatarSize = ref('large');
const calculateAvatarSize = () => {
    // 计算当前视窗宽度的10%
    const windowWidth10Percent = window.innerWidth * 0.1;
    avatarSize.value = windowWidth10Percent > 120 ? 'large' : 'medium';
    // console.log(avatarSize.value)
};


// 年龄选择器数据
const options = [];

// 地址选择器数据
const cityaddress = [
  {
    label: '北京市',
    value: '北京市',
  },
  {
    label: '天津市',
    value: '天津市',
  },
  {
    label: '上海市',
    value: '上海市',
  },
  {
    label: '重庆市',
    value: '重庆市',
  },
  {
    label: '河北省',
    value: '河北省',
    children: [
      { label: '石家庄市', value: '石家庄市' },
      { label: '唐山市', value: '唐山市' },
      { label: '秦皇岛市', value: '秦皇岛市' },
      { label: '邯郸市', value: '邯郸市' },
      { label: '邢台市', value: '邢台市' },
      { label: '保定市', value: '保定市' },
      { label: '张家口市', value: '张家口市' },
      { label: '承德市', value: '承德市' },
      { label: '沧州市', value: '沧州市' },
      { label: '廊坊市', value: '廊坊市' },
      { label: '衡水市', value: '衡水市' }
    ]
  },
  {
    label: '山西省',
    value: '山西省',
    children: [
      { label: '太原市', value: '太原市' },
      { label: '大同市', value: '大同市' },
      { label: '阳泉市', value: '阳泉市' },
      { label: '长治市', value: '长治市' },
      { label: '晋城市', value: '晋城市' },
      { label: '朔州市', value: '朔州市' },
      { label: '晋中市', value: '晋中市' },
      { label: '运城市', value: '运城市' },
      { label: '忻州市', value: '忻州市' },
      { label: '临汾市', value: '临汾市' },
      { label: '吕梁市', value: '吕梁市' }
    ]
  },
  {
    label: '内蒙古自治区',
    value: '内蒙古自治区',
    children: [
      { label: '呼和浩特市', value: '呼和浩特市' },
      { label: '包头市', value: '包头市' },
      { label: '乌海市', value: '乌海市' },
      { label: '赤峰市', value: '赤峰市' },
      { label: '通辽市', value: '通辽市' },
      { label: '鄂尔多斯市', value: '鄂尔多斯市' },
      { label: '呼伦贝尔市', value: '呼伦贝尔市' },
      { label: '巴彦淖尔市', value: '巴彦淖尔市' },
      { label: '乌兰察布市', value: '乌兰察布市' },
      { label: '兴安盟', value: '兴安盟' },
      { label: '锡林郭勒盟', value: '锡林郭勒盟' },
      { label: '阿拉善盟', value: '阿拉善盟' }
    ]
  },
  {
    label: '辽宁省',
    value: '辽宁省',
    children: [
      { label: '沈阳市', value: '沈阳市' },
      { label: '大连市', value: '大连市' },
      { label: '鞍山市', value: '鞍山市' },
      { label: '抚顺市', value: '抚顺市' },
      { label: '本溪市', value: '本溪市' },
      { label: '丹东市', value: '丹东市' },
      { label: '锦州市', value: '锦州市' },
      { label: '营口市', value: '营口市' },
      { label: '阜新市', value: '阜新市' },
      { label: '辽阳市', value: '辽阳市' },
      { label: '盘锦市', value: '盘锦市' },
      { label: '铁岭市', value: '铁岭市' },
      { label: '朝阳市', value: '朝阳市' },
      { label: '葫芦岛市', value: '葫芦岛市' }
    ]
  },
  {
    label: '吉林省',
    value: '吉林省',
    children: [
      { label: '长春市', value: '长春市' },
      { label: '吉林市', value: '吉林市' },
      { label: '四平市', value: '四平市' },
      { label: '辽源市', value: '辽源市' },
      { label: '通化市', value: '通化市' },
      { label: '白山市', value: '白山市' },
      { label: '松原市', value: '松原市' },
      { label: '白城市', value: '白城市' },
      { label: '延边朝鲜族自治州', value: '延边朝鲜族自治州' }
    ]
  },
  {
    label: '黑龙江省',
    value: '黑龙江省',
    children: [
      { label: '哈尔滨市', value: '哈尔滨市' },
      { label: '齐齐哈尔市', value: '齐齐哈尔市' },
      { label: '鸡西市', value: '鸡西市' },
      { label: '鹤岗市', value: '鹤岗市' },
      { label: '双鸭山市', value: '双鸭山市' },
      { label: '大庆市', value: '大庆市' },
      { label: '伊春市', value: '伊春市' },
      { label: '佳木斯市', value: '佳木斯市' },
      { label: '七台河市', value: '七台河市' },
      { label: '牡丹江市', value: '牡丹江市' },
      { label: '黑河市', value: '黑河市' },
      { label: '绥化市', value: '绥化市' },
      { label: '大兴安岭地区', value: '大兴安岭地区' }
    ]
  },
  {
    label: '江苏省',
    value: '江苏省',
    children: [
      { label: '南京市', value: '南京市' },
      { label: '无锡市', value: '无锡市' },
      { label: '徐州市', value: '徐州市' },
      { label: '常州市', value: '常州市' },
      { label: '苏州市', value: '苏州市' },
      { label: '南通市', value: '南通市' },
      { label: '连云港市', value: '连云港市' },
      { label: '淮安市', value: '淮安市' },
      { label: '盐城市', value: '盐城市' },
      { label: '扬州市', value: '扬州市' },
      { label: '镇江市', value: '镇江市' },
      { label: '泰州市', value: '泰州市' },
      { label: '宿迁市', value: '宿迁市' }
    ]
  },
  {
    label: '浙江省',
    value: '浙江省',
    children: [
      { label: '杭州市', value: '杭州市' },
      { label: '宁波市', value: '宁波市' },
      { label: '温州市', value: '温州市' },
      { label: '嘉兴市', value: '嘉兴市' },
      { label: '湖州市', value: '湖州市' },
      { label: '绍兴市', value: '绍兴市' },
      { label: '金华市', value: '金华市' },
      { label: '衢州市', value: '衢州市' },
      { label: '舟山市', value: '舟山市' },
      { label: '台州市', value: '台州市' },
      { label: '丽水市', value: '丽水市' }
    ]
  },
  {
    label: '安徽省',
    value: '安徽省',
    children: [
      { label: '合肥市', value: '合肥市' },
      { label: '芜湖市', value: '芜湖市' },
      { label: '蚌埠市', value: '蚌埠市' },
      { label: '淮南市', value: '淮南市' },
      { label: '马鞍山市', value: '马鞍山市' },
      { label: '淮北市', value: '淮北市' },
      { label: '铜陵市', value: '铜陵市' },
      { label: '安庆市', value: '安庆市' },
      { label: '黄山市', value: '黄山市' },
      { label: '滁州市', value: '滁州市' },
      { label: '阜阳市', value: '阜阳市' },
      { label: '宿州市', value: '宿州市' },
      { label: '六安市', value: '六安市' },
      { label: '亳州市', value: '亳州市' },
      { label: '池州市', value: '池州市' },
      { label: '宣城市', value: '宣城市' }
    ]
  },
  {
    label: '福建省',
    value: '福建省',
    children: [
      { label: '福州市', value: '福州市' },
      { label: '厦门市', value: '厦门市' },
      { label: '莆田市', value: '莆田市' },
      { label: '三明市', value: '三明市' },
      { label: '泉州市', value: '泉州市' },
      { label: '漳州市', value: '漳州市' },
      { label: '南平市', value: '南平市' },
      { label: '龙岩市', value: '龙岩市' },
      { label: '宁德市', value: '宁德市' }
    ]
  },
  {
    label: '江西省',
    value: '江西省',
    children: [
      { label: '南昌市', value: '南昌市' },
      { label: '景德镇市', value: '景德镇市' },
      { label: '萍乡市', value: '萍乡市' },
      { label: '九江市', value: '九江市' },
      { label: '新余市', value: '新余市' },
      { label: '鹰潭市', value: '鹰潭市' },
      { label: '赣州市', value: '赣州市' },
      { label: '吉安市', value: '吉安市' },
      { label: '宜春市', value: '宜春市' },
      { label: '抚州市', value: '抚州市' },
      { label: '上饶市', value: '上饶市' }
    ]
  },
  {
    label: '山东省',
    value: '山东省',
    children: [
      { label: '济南市', value: '济南市' },
      { label: '青岛市', value: '青岛市' },
      { label: '淄博市', value: '淄博市' },
      { label: '枣庄市', value: '枣庄市' },
      { label: '东营市', value: '东营市' },
      { label: '烟台市', value: '烟台市' },
      { label: '潍坊市', value: '潍坊市' },
      { label: '济宁市', value: '济宁市' },
      { label: '泰安市', value: '泰安市' },
      { label: '威海市', value: '威海市' },
      { label: '日照市', value: '日照市' },
      { label: '莱芜市', value: '莱芜市' },
      { label: '临沂市', value: '临沂市' },
      { label: '德州市', value: '德州市' },
      { label: '聊城市', value: '聊城市' },
      { label: '滨州市', value: '滨州市' },
      { label: '菏泽市', value: '菏泽市' }
    ]
  },
  {
    label: '河南省',
    value: '河南省',
    children: [
      { label: '郑州市', value: '郑州市' },
      { label: '开封市', value: '开封市' },
      { label: '洛阳市', value: '洛阳市' },
      { label: '平顶山市', value: '平顶山市' },
      { label: '安阳市', value: '安阳市' },
      { label: '鹤壁市', value: '鹤壁市' },
      { label: '新乡市', value: '新乡市' },
      { label: '焦作市', value: '焦作市' },
      { label: '濮阳市', value: '濮阳市' },
      { label: '许昌市', value: '许昌市' },
      { label: '漯河市', value: '漯河市' },
      { label: '三门峡市', value: '三门峡市' },
      { label: '南阳市', value: '南阳市' },
      { label: '商丘市', value: '商丘市' },
      { label: '信阳市', value: '信阳市' },
      { label: '周口市', value: '周口市' },
      { label: '驻马店市', value: '驻马店市' },
      { label: '济源市', value: '济源市' }
    ]
  },
  {
    label: '湖北省',
    value: '湖北省',
    children: [
      { label: '武汉市', value: '武汉市' },
      { label: '黄石市', value: '黄石市' },
      { label: '十堰市', value: '十堰市' },
      { label: '宜昌市', value: '宜昌市' },
      { label: '襄阳市', value: '襄阳市' },
      { label: '鄂州市', value: '鄂州市' },
      { label: '荆门市', value: '荆门市' },
      { label: '孝感市', value: '孝感市' },
      { label: '荆州市', value: '荆州市' },
      { label: '黄冈市', value: '黄冈市' },
      { label: '咸宁市', value: '咸宁市' },
      { label: '随州市', value: '随州市' },
      { label: '恩施土家族苗族自治州', value: '恩施土家族苗族自治州' },
      { label: '仙桃市', value: '仙桃市' },
      { label: '潜江市', value: '潜江市' },
      { label: '天门市', value: '天门市' },
      { label: '神农架林区', value: '神农架林区' }
    ]
  },
  {
    label: '湖南省',
    value: '湖南省',
    children: [
      { label: '长沙市', value: '长沙市' },
      { label: '株洲市', value: '株洲市' },
      { label: '湘潭市', value: '湘潭市' },
      { label: '衡阳市', value: '衡阳市' },
      { label: '邵阳市', value: '邵阳市' },
      { label: '岳阳市', value: '岳阳市' },
      { label: '常德市', value: '常德市' },
      { label: '张家界市', value: '张家界市' },
      { label: '益阳市', value: '益阳市' },
      { label: '郴州市', value: '郴州市' },
      { label: '永州市', value: '永州市' },
      { label: '怀化市', value: '怀化市' },
      { label: '娄底市', value: '娄底市' },
      { label: '湘西土家族苗族自治州', value: '湘西土家族苗族自治州' }
    ]
  },
  {
    label: '广东省',
    value: '广东省',
    children: [
      { label: '广州市', value: '广州市' },
      { label: '韶关市', value: '韶关市' },
      { label: '深圳市', value: '深圳市' },
      { label: '珠海市', value: '珠海市' },
      { label: '汕头市', value: '汕头市' },
      { label: '佛山市', value: '佛山市' },
      { label: '江门市', value: '江门市' },
      { label: '湛江市', value: '湛江市' },
      { label: '茂名市', value: '茂名市' },
      { label: '肇庆市', value: '肇庆市' },
      { label: '惠州市', value: '惠州市' },
      { label: '梅州市', value: '梅州市' },
      { label: '汕尾市', value: '汕尾市' },
      { label: '河源市', value: '河源市' },
      { label: '阳江市', value: '阳江市' },
      { label: '清远市', value: '清远市' },
      { label: '东莞市', value: '东莞市' },
      { label: '中山市', value: '中山市' },
      { label: '潮州市', value: '潮州市' },
      { label: '揭阳市', value: '揭阳市' },
      { label: '云浮市', value: '云浮市' }
    ]
  },
  {
    label: '广西壮族自治区',
    value: '广西壮族自治区',
    children: [
      { label: '南宁市', value: '南宁市' },
      { label: '柳州市', value: '柳州市' },
      { label: '桂林市', value: '桂林市' },
      { label: '梧州市', value: '梧州市' },
      { label: '北海市', value: '北海市' },
      { label: '防城港市', value: '防城港市' },
      { label: '钦州市', value: '钦州市' },
      { label: '贵港市', value: '贵港市' },
      { label: '玉林市', value: '玉林市' },
      { label: '百色市', value: '百色市' },
      { label: '贺州市', value: '贺州市' },
      { label: '河池市', value: '河池市' },
      { label: '来宾市', value: '来宾市' },
      { label: '崇左市', value: '崇左市' }
    ]
  },
  {
    label: '海南省',
    value: '海南省',
    children: [
      { label: '海口市', value: '海口市' },
      { label: '三亚市', value: '三亚市' },
      { label: '三沙市', value: '三沙市' },
      { label: '儋州市', value: '儋州市' },
      { label: '五指山市', value: '五指山市' },
      { label: '琼海市', value: '琼海市' },
      { label: '文昌市', value: '文昌市' },
      { label: '万宁市', value: '万宁市' },
      { label: '东方市', value: '东方市' },
      { label: '定安县', value: '定安县' },
      { label: '屯昌县', value: '屯昌县' },
      { label: '澄迈县', value: '澄迈县' },
      { label: '临高县', value: '临高县' },
      { label: '白沙黎族自治县', value: '白沙黎族自治县' },
      { label: '昌江黎族自治县', value: '昌江黎族自治县' },
      { label: '乐东黎族自治县', value: '乐东黎族自治县' },
      { label: '陵水黎族自治县', value: '陵水黎族自治县' },
      { label: '保亭黎族苗族自治县', value: '保亭黎族苗族自治县' },
      { label: '琼中黎族苗族自治县', value: '琼中黎族苗族自治县' }
    ]
  },
  {
    label: '四川省',
    value: '四川省',
    children: [
      { label: '成都市', value: '成都市' },
      { label: '自贡市', value: '自贡市' },
      { label: '攀枝花市', value: '攀枝花市' },
      { label: '泸州市', value: '泸州市' },
      { label: '德阳市', value: '德阳市' },
      { label: '绵阳市', value: '绵阳市' },
      { label: '广元市', value: '广元市' },
      { label: '遂宁市', value: '遂宁市' },
      { label: '内江市', value: '内江市' },
      { label: '乐山市', value: '乐山市' },
      { label: '南充市', value: '南充市' },
      { label: '眉山市', value: '眉山市' },
      { label: '宜宾市', value: '宜宾市' },
      { label: '广安市', value: '广安市' },
      { label: '达州市', value: '达州市' },
      { label: '雅安市', value: '雅安市' },
      { label: '巴中市', value: '巴中市' },
      { label: '资阳市', value: '资阳市' },
      { label: '阿坝藏族羌族自治州', value: '阿坝藏族羌族自治州' },
      { label: '甘孜藏族自治州', value: '甘孜藏族自治州' },
      { label: '凉山彝族自治州', value: '凉山彝族自治州' }
    ]
  },
  {
    label: '贵州省',
    value: '贵州省',
    children: [
      { label: '贵阳市', value: '贵阳市' },
      { label: '六盘水市', value: '六盘水市' },
      { label: '遵义市', value: '遵义市' },
      { label: '安顺市', value: '安顺市' },
      { label: '毕节市', value: '毕节市' },
      { label: '铜仁市', value: '铜仁市' },
      { label: '黔西南布依族苗族自治州', value: '黔西南布依族苗族自治州' },
      { label: '黔东南苗族侗族自治州', value: '黔东南苗族侗族自治州' },
      { label: '黔南布依族苗族自治州', value: '黔南布依族苗族自治州' }
    ]
  },
  {
    label: '云南省',
    value: '云南省',
    children: [
      { label: '昆明市', value: '昆明市' },
      { label: '曲靖市', value: '曲靖市' },
      { label: '玉溪市', value: '玉溪市' },
      { label: '保山市', value: '保山市' },
      { label: '昭通市', value: '昭通市' },
      { label: '丽江市', value: '丽江市' },
      { label: '普洱市', value: '普洱市' },
      { label: '临沧市', value: '临沧市' },
      { label: '楚雄彝族自治州', value: '楚雄彝族自治州' },
      { label: '红河哈尼族彝族自治州', value: '红河哈尼族彝族自治州' },
      { label: '文山壮族苗族自治州', value: '文山壮族苗族自治州' },
      { label: '西双版纳傣族自治州', value: '西双版纳傣族自治州' },
      { label: '大理白族自治州', value: '大理白族自治州' },
      { label: '德宏傣族景颇族自治州', value: '德宏傣族景颇族自治州' },
      { label: '怒江傈僳族自治州', value: '怒江傈僳族自治州' },
      { label: '迪庆藏族自治州', value: '迪庆藏族自治州' }
    ]
  },
  {
    label: '西藏自治区',
    value: '西藏自治区',
    children: [
      { label: '拉萨市', value: '拉萨市' },
      { label: '日喀则市', value: '日喀则市' },
      { label: '昌都市', value: '昌都市' },
      { label: '林芝市', value: '林芝市' },
      { label: '山南市', value: '山南市' },
      { label: '那曲市', value: '那曲市' },
      { label: '阿里地区', value: '阿里地区' }
    ]
  },
  {
    label: '陕西省',
    value: '陕西省',
    children: [
      { label: '西安市', value: '西安市' },
      { label: '铜川市', value: '铜川市' },
      { label: '宝鸡市', value: '宝鸡市' },
      { label: '咸阳市', value: '咸阳市' },
      { label: '渭南市', value: '渭南市' },
      { label: '延安市', value: '延安市' },
      { label: '汉中市', value: '汉中市' },
      { label: '榆林市', value: '榆林市' },
      { label: '安康市', value: '安康市' },
      { label: '商洛市', value: '商洛市' }
    ]
  },
  {
    label: '甘肃省',
    value: '甘肃省',
    children: [
      { label: '兰州市', value: '兰州市' },
      { label: '嘉峪关市', value: '嘉峪关市' },
      { label: '金昌市', value: '金昌市' },
      { label: '白银市', value: '白银市' },
      { label: '天水市', value: '天水市' },
      { label: '武威市', value: '武威市' },
      { label: '张掖市', value: '张掖市' },
      { label: '平凉市', value: '平凉市' },
      { label: '酒泉市', value: '酒泉市' },
      { label: '庆阳市', value: '庆阳市' },
      { label: '定西市', value: '定西市' },
      { label: '陇南市', value: '陇南市' },
      { label: '临夏回族自治州', value: '临夏回族自治州' },
      { label: '甘南藏族自治州', value: '甘南藏族自治州' }
    ]
  },
  {
    label: '青海省',
    value: '青海省',
    children: [
      { label: '西宁市', value: '西宁市' },
      { label: '海东市', value: '海东市' },
      { label: '海北藏族自治州', value: '海北藏族自治州' },
      { label: '黄南藏族自治州', value: '黄南藏族自治州' },
      { label: '海南藏族自治州', value: '海南藏族自治州' },
      { label: '果洛藏族自治州', value: '果洛藏族自治州' },
      { label: '玉树藏族自治州', value: '玉树藏族自治州' },
      { label: '海西蒙古族藏族自治州', value: '海西蒙古族藏族自治州' }
    ]
  },
  {
    label: '宁夏回族自治区',
    value: '宁夏回族自治区',
    children: [
      { label: '银川市', value: '银川市' },
      { label: '石嘴山市', value: '石嘴山市' },
      { label: '吴忠市', value: '吴忠市' },
      { label: '固原市', value: '固原市' },
      { label: '中卫市', value: '中卫市' }
    ]
  },
  {
    label: '新疆维吾尔自治区',
    value: '新疆维吾尔自治区',
    children: [
      { label: '乌鲁木齐市', value: '乌鲁木齐市' },
      { label: '克拉玛依市', value: '克拉玛依市' },
      { label: '吐鲁番市', value: '吐鲁番市' },
      { label: '哈密市', value: '哈密市' },
      { label: '昌吉回族自治州', value: '昌吉回族自治州' },
      { label: '博尔塔拉蒙古自治州', value: '博尔塔拉蒙古自治州' },
      { label: '巴音郭楞蒙古自治州', value: '巴音郭楞蒙古自治州' },
      { label: '阿克苏地区', value: '阿克苏地区' },
      { label: '克孜勒苏柯尔克孜自治州', value: '克孜勒苏柯尔克孜自治州' },
      { label: '喀什地区', value: '喀什地区' },
      { label: '和田地区', value: '和田地区' },
      { label: '伊犁哈萨克自治州', value: '伊犁哈萨克自治州' },
      { label: '塔城地区', value: '塔城地区' },
      { label: '阿勒泰地区', value: '阿勒泰地区' },
      { label: '自治区直辖县级行政区划', value: '自治区直辖县级行政区划' }
    ]
  },
  {
    label: '台湾省',
    value: '台湾省',
    children: [
      { label: '台北市', value: '台北市' },
      { label: '高雄市', value: '高雄市' },
      { label: '台南市', value: '台南市' },
      { label: '台中市', value: '台中市' },
      { label: '金门县', value: '金门县' },
      { label: '南投县', value: '南投县' },
      { label: '基隆市', value: '基隆市' },
      { label: '新竹市', value: '新竹市' },
      { label: '嘉义市', value: '嘉义市' },
      { label: '新北市', value: '新北市' },
      { label: '宜兰县', value: '宜兰县' },
      { label: '新竹县', value: '新竹县' },
      { label: '桃园市', value: '桃园市' },
      { label: '苗栗县', value: '苗栗县' },
      { label: '彰化县', value: '彰化县' },
      { label: '嘉义县', value: '嘉义县' },
      { label: '云林县', value: '云林县' },
      { label: '屏东县', value: '屏东县' },
      { label: '台东县', value: '台东县' },
      { label: '花莲县', value: '花莲县' },
      { label: '澎湖县', value: '澎湖县' }
    ]
  },
  {
    label: '香港特别行政区',
    value: '香港特别行政区',
    children: [
      { label: '香港岛', value: '香港岛' },
      { label: '九龙', value: '九龙' },
      { label: '新界', value: '新界' }
    ]
  },
  {
    label: '澳门特别行政区',
    value: '澳门特别行政区',
    children: [
      { label: '澳门半岛', value: '澳门半岛' },
      { label: '氹仔岛', value: '氹仔岛' },
      { label: '路环岛', value: '路环岛' }
    ]
  }
];


function handlePanelChange(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    UserNews.value.age = age;
}

// 表单校验规则
const UserIntrorules = ref({
    nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入个人简介", trigger: "blur" }],
    gender: [{ type: 'enum', enum: ['男', '女'], message: "请选择性别", trigger: "change" }],
    age: [
        { required: true, message: "请输入年龄", trigger: "blur" },
        { type: 'number', min: 0, max: 150, message: "请输入合法年龄", trigger: "blur" }
    ],
    address: [{ required: true, message: "请输入地址", trigger: "blur" }],
    height: [
        { required: true, message: "请输入身高", trigger: "blur" },
        { type: 'number', min: 50, max: 300, message: "请输入合法身高,身高必须大于50小于300", trigger: "blur" }
    ],
    weight: [
        { required: true, message: "请输入体重", trigger: "blur" },
        { type: 'number', min: 20, max: 200, message: "请输入合法体重,体重必须大于20,小于200", trigger: "blur" }
    ],
    birthday: [
        { required: true, message: "请选择生日", trigger: "blur" },
        { type: 'date', message: "请选择合法生日", trigger: "change" }
    ],
    occupation: [{ required: true, message: "请输入职业", trigger: "blur" }],
    name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
})


const resetForm = () => {
  dialogUserIntro.value = false;
  dialogUserValue.value = false;
  dialogUserBody.value = false;
  getUserValue();
}

// 去修改密码
const toeditpassMobile = () =>{
    router.push(`/editpaddMobile`)
}
// 手机号表单验证
const Usermobilerules = ref({
    mobile: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
        },
    ],
    smsCode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
})
const UserNamerules = ref({
    userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" }
    ],
})

const dialogAddassociated  = ref(false)
const showuserNameLogin = ref(false)
const showmobileLogin = ref(false)
const Addassociated = (flag) =>{
    dialogAddassociated.value = true;
    if(flag === 1){
        showuserNameLogin.value = true;
        showmobileLogin.value = false;
    }else if(flag === 2){
        showuserNameLogin.value = false;
        showmobileLogin.value = true
    }
}

// 取消关联账号
const CancelassociatedUserID = ref('')
function Cancelassociated(item){
    dialogVisible.value = true;
    isSwitched.value = 3;
    CancelassociatedUserID.value = item.userId;
}


// onMounted(()=>{
//     getUserValue();
//     calculateAvatarSize();
//     // 监听窗口大小变化
//     window.addEventListener('resize', calculateAvatarSize);
// })

// onBeforeUnmount(() => {
//     window.removeEventListener('resize', calculateAvatarSize);
// });

// 行为验证码
const dialogVisible = ref(false)
const isSwitched = ref(null)
function finishCheck() {
    dialogVisible.value = false;
    if(isSwitched.value === 1){
        postAddUser();
    }else if(isSwitched.value === 2){
        postAddmobile();
    }else if(isSwitched.value === 3){
        let data = CancelassociatedUserID.value
        putDelUserConnection(data)
        .then(res =>{
            console.log(res.data)
            ElMessage({
                message: '取消关联成功',
                type: 'success',
            })
            getUserValue();
        })
        .catch(error =>{
            console.log(error)
        })
    }else if(isSwitched.value === 4){
        postUserConnection(toggleLoginID.value)
        .then(res =>{
            // console.log(res)
            removeToken();
            setToken(res.data.token)
            ElMessage({
                message:"切换账号登录成功",
                type:"success"
            })
            toggleLoginID.value = '';
            getUserValue();
        })
        .catch(error =>{
            console.log(error)
        })
    }
}

// 获取用户信息
const UserNews = ref({})
const UserNewsValue = ref({})
function getUserValue(){
    getUserName()
    .then(res=>{
        UserNews.value = res.data;
        for (let key in UserNews.value) {
            if (!UserNews.value[key]||UserNews.value[key] === '') {
                UserNews.value[key] = '暂无信息';
            }
        }
        calculateBMI();
        UserNewsValue.value = UserNews.value;
        AllUserValue.value = [];
        getAllUserValue();
    })
    .catch(error =>{
        console.log(error);
    })
}

// 获取所有用户信息
const AllUserValue = ref([])
function getAllUserValue(){
    if(UserNews.value.associatedIds === null){
        return;
    }
    UserNews.value.associatedIds.forEach((userId,index) =>{
        getOneUser(userId)
        .then(res=>{
            AllUserValue.value.push(res.data)
        })
        .catch(error =>{
            console.log(error);
        })
    })
}

// 提交修改的用户信息
function putUserValue(data){
    putUserName(data)
    .then(res=>{
        // console.log(res);
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
        UserNewsValue.value = UserNews.value;
        getUserValue();
    })
    .catch(error =>{
        console.log(error);
    })
}

// 上传的表单数据
const UserFormValue = ref({})

// 提交昵称基本信息表单
const UserIntroForm = ref(null)
const submitIntroForm = async () => {
    if (!UserIntroForm.value) return;
    await UserIntroForm.value.validate((valid) => {
        if (valid) {
            UserFormValue.value.userId = UserNews.value.userId;
            UserFormValue.value.nickName = UserNews.value.nickName;
            UserFormValue.value.introduction = UserNews.value.introduction;
            UserFormValue.value.avatar = UserNews.value.avatar
            // console.log(UserFormValue.value)
            dialogUserIntro.value = false;
            putUserValue(UserFormValue.value)
        } else {
            return false;
        }
    });
};

// 提交基本信息表单
const UserValueForm = ref(null)
// cascader
const cascaderValue = ref([])
function handleChange(){
    cascaderValue.value.address.forEach((item,index) =>{
        UserNews.value.address = '';
        UserNews.value.address += item;
    })
}
const submitUserForm = async () => {
    if (!UserValueForm.value) return;
    await UserValueForm.value.validate((valid) => {
        if (valid) {
            UserFormValue.value.userId = UserNews.value.userId;
            UserFormValue.value.name = UserNews.value.name;
            UserFormValue.value.gender = UserNews.value.gender;
            const birthday = new Date(UserNews.value.birthday);
            const formattedBirthday = birthday.toISOString().split('T')[0];
            UserFormValue.value.birthday = formattedBirthday;
            UserNews.value.birthday = UserFormValue.value.birthday;
            UserFormValue.value.address = UserNews.value.address;
            UserFormValue.value.age = UserNews.value.age;
            UserFormValue.value.occupation = UserNews.value.occupation;
            // console.log(UserFormValue.value)
            dialogUserValue.value = false;
            putUserValue(UserFormValue.value)
        } else {
            return false;
        }
    });
};

// 提交身体基本信息
const UserBodyForm = ref(null)
const submitaBodyForm = async () => {
    if (!UserBodyForm.value) return;
    await UserBodyForm.value.validate((valid) => {
        if (valid) {
            UserFormValue.value.userId = UserNews.value.userId;
            UserFormValue.value.height = UserNews.value.height;
            UserFormValue.value.weight = UserNews.value.weight;
            calculateBMI();
            // console.log(UserFormValue.value)
            dialogUserBody.value = false;
            putUserValue(UserFormValue.value)
        } else {
            return false;
        }
    });
};

// 提交关联账户密码账号
// 关联账号
function putAddassociatedUser(data){
    putAddUserConnection(data)
    .then(res =>{
        // console.log(res.data)
        ElMessage({
            message: '添加关联成功',
            type: 'success',
        })
        getUserValue();
    })
    .catch(error =>{
        console.log(error)
    })
}
const UserNameFrom = ref(null)
const UserNamePassLogin = ref({
    userName:'',
    password:'',
})
const submitUserPassLoginForm = async () => {
    if (!UserNameFrom.value) return;
    await UserNameFrom.value.validate((valid) => {
        if (valid) {
            isSwitched.value = 1;
            dialogVisible.value = true;
        } else {
            return false;
        }
    });
};
const postAddUser = () =>{
    dialogAddassociated.value = false;
    putAddassociatedUser(UserNamePassLogin.value);
    UserNamePassLogin.value = {
        userName:'',
        password:'',
    }
    isSwitched.value = null
}

// 提交手机号关联
const UsermobileValue = ref({
    mobile:'',
    smsCode:''
})
const UsermobileForm = ref()
const submitmobileForm = async () => {
    if (!UsermobileForm.value){
        ElMessage({
            message:"请将信息补充完整",
            type:"error"
        })
        return
    } ;
    await UsermobileForm.value.validate((valid) => {
        if (valid) {
            isSwitched.value = 2;
            dialogVisible.value = true;
        } else {
            return false;
        }
    });
};
const postAddmobile = () =>{
    dialogAddassociated.value = false;
    putAddMobileConnection(UsermobileValue.value)
    .then(res =>{
        ElMessage({
            message: '添加关联成功',
            type: 'success',
        })
        getUserValue();
    })
    UserNamePassLogin.value = {
        userName:'',
        password:'',
    }
    isSwitched.value = null
}

// 获取验证码倒计时
const countdown = ref(60);
const isCountingDown = ref(false);

// 获取手机验证码
function getSmsCode() {
    if(UsermobileValue.value.mobile === ''){
        ElMessage({
            message:"请先填写手机号",
            type:"error"
        })
        return;
    }
    smsCodeGet(UsermobileValue.value.mobile)
        .then((res) => {
            console.log(res);
            isCountingDown.value = true;
            const timer = setInterval(() => {
                if (countdown.value > 0) {
                    countdown.value--;
                    console.log(countdown.value);
                } else {
                    isCountingDown.value = false;
                    countdown.value = 60;
                    clearInterval(timer);
                }
            }, 1000);
        })
        .catch((err) => {
            console.log(err);
        });
}


//计算BMI
let BMI = ref('')
let warn = ref("success")
let warnValue = ref('正常')
function calculateBMI() {
    const height = parseFloat(UserNews.value.height) / 100;
    const weight = parseFloat(UserNews.value.weight);
    let bmi = weight / (height * height);
    if (isNaN(bmi)) {
        BMI.value = "暂无信息";
        warnValue.value = "";
        return;
    }

    bmi = bmi.toFixed(2); // 保留两位小数

    if (bmi < 18.5) {
        warn.value = 'warning'; // 偏瘦
        warnValue.value = "偏瘦";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        warn.value = 'success'; // 正常
        warnValue.value = "正常";
    } else if (bmi >= 24.9 && bmi < 29.9) {
        warn.value = 'warning'; // 偏胖
        warnValue.value = "偏胖";
    } else {
        warn.value = 'danger'; // 严重肥胖
        warnValue.value = "严重肥胖";
    }

    BMI.value = bmi;
}

</script>
<style lang="less" scoped>
.main{
    display: flex;
    flex-direction: column; /* 垂直排列 */
    justify-content: center; 
    align-items: center; 
    background-repeat: repeat;
    background-size: cover;
    min-height: 90vh;
    .head{
        width: 80%;
        margin-top:2vh;
        margin-bottom:2vh;
        background-color: rgb(234, 246, 248);
        border-radius: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
        .el-row{
            padding: 1%;
            width: 100%;
            height: 100%;
            .el-col{
                .header{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 100%;
                        max-width: 120px;
                        display: block;
                        border-radius: 50%;
                        border: 1px dashed #d9d9d9;
                    }
                }
                .userNews{
                    width: 95%;
                    height: 100%;
                    border-radius: 3vh;
                    background-color: #fff;
                    padding: 2%;
                    box-sizing: border-box;
                    h3{
                        font-size: 2vw;
                        margin-top: 1.5%;
                        margin-bottom: 1.5%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    p{
                        margin-top: 1%;
                        margin-bottom: 1%;
                        font-size: 1vw;
                    }
                }
            }
            
        }
    }
    .Banner{
        width: 80%;
        margin-bottom:2vh;
        background-color: rgb(234, 246, 248);;
        border-radius: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
        .userNews{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .margin-top{
                width: 90%;
                border-radius: 3vh;
                background-color: #fff;
                padding: 2%;
                margin-top: 1%;
                margin-bottom: 1%;
                box-sizing: border-box;
                .el-col{
                    margin: 1vw;
                    font-size: 1.2vw;
                    text-align: center;
                    .avatar{
                        width: 100%;
                        .el-avatar{
                            width:10vw;
                            height:10vw;
                        }
                    }
                    
                }
            }
        }
    }
    .BannerAllUser{
        width: 80%;
        margin-bottom:2vh;
        background-color: rgb(234, 246, 248);;
        border-radius: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
        .userNews{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            h1{
                font-size: 2.5vw;
                margin-top: 1vh;
                margin-bottom: 1vh;
                color: #97b774;
                .el-icon{
                    line-height:100%;
                    font-size: 2vw;
                    margin-left: 0.5vw;
                }
            }
            .margin-top{
                width: 90%;
                border-radius: 3vh;
                background-color: #fff;
                padding: 2%;
                margin-top: 1%;
                margin-bottom: 1%;
                box-sizing: border-box;
                .el-col{
                    margin: 1vw;
                    font-size: 1.2vw;
                    text-align: center;
                    .User{
                        background-color: #f7e5dc;
                        padding: 1vw;
                        border-radius: 3vh;
                        .avatar{
                            width: 100%;
                            .el-avatar{
                                width:8vw;
                                height:8vw;
                            }
                        }
                    }
                    
                    
                }
            }
        }
    }
    :deep(.el-dialog){
        border-radius:2vw;
        padding: 2%;
        .Userhead{
            display: flex;
            flex-direction: column; /* 垂直排列 */
            justify-content: center; 
            align-items: center;
            padding-bottom: 5%;
        }
        .avatar-uploader .avatar {
            width:  12vw;
            height: 12vw;
            display: block;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 50%;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .avatar-uploader .el-upload:hover {
            border-color: #a3c576;
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width:  12vw;
            height: 12vw;
            text-align: center;
        }

        .center{
            display: flex;
            flex-direction: column; /* 垂直排列 */
            justify-content: center; 
            align-items: center;
        }
    }
}
</style>
