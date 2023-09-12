<template>
  <div class="login-view">
    <van-nav-bar title="密码登录" left-arrow @click-left="handleBack" />
    <img src="@/assets/images/desktop_1.jpg" alt="img" class="login-image" />
    <div class="login-input">
      <div class="account-input">
        <span>账号</span>
        <input type="email" placeholder="请输入邮箱" v-model="email" />
      </div>
      <div class="password-input">
        <span>密码</span>
        <input type="password" placeholder="请输入密码" v-model="password" />
        <i></i>
        <div class="forgot-password" @click.stop="handleRetrievePassword">忘记密码？</div>
      </div>
    </div>
    <div class="button-group">
      <button class="register-button" @click="handleRegister">注册</button>
      <button
        class="login-button"
        :class="{ 'login-button-active': email && password }"
        @click="handleLogin"
      >
        登录
      </button>
      <div class="help-info">
        <p>
          登录即代表你同意<span @click="UserAgreement">用户协议</span>和<span @click="PrivacyPolicy"
            >隐私政策</span
          >
        </p>
        <p>遇到问题？<span @click="handleHelp">查看帮助</span></p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { doGetUserInformation, doLogin } from '@/api/index'
import router from '@/router'
import { showFailToast } from 'vant'
import { ref } from 'vue'

const email = ref('2532499815@qq.com')
const password = ref('111111')
//邮箱验证
const isEmail = (val: string) => {
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)
}
//返回
const handleBack = () => {
  router.go(-1)
}
// 忘记密码
const handleRetrievePassword = () => {
  router.push('/retrieve')
}
// 注册
const handleRegister = () => {
  router.push('/register')
}
// 登录
const handleLogin = () => {
  if (email.value && password.value) {
    if (isEmail(email.value)) {
      doLogin({ email: email.value, password: password.value })
        .then((result) => {
          window.localStorage.setItem('token', result.token)
          handleUserDetail()
        })
        .catch(() => {})
    } else {
      showFailToast('邮箱格式错误')
    }
  }
} // 获取用户详情
const handleUserDetail = () => {
  doGetUserInformation()
    .then((result) => {
      window.localStorage.setItem('userInfo', JSON.stringify(result))
      window.localStorage.setItem('userId', result.id)
      router.replace('/home')
    })
    .catch((error) => {
      console.log(error)
    })
}
//用户协议
const UserAgreement = () => {
  router.push('agreement')
}
//隐私政策
const PrivacyPolicy = () => {
  router.push('privacy')
}
//查看帮助
const handleHelp = () => {
  router.push('help')
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/define.scss';
.login-view {
  height: 100vh;
}
.login-image {
  width: 100%;
  height: j(100);
}
.login-input {
  display: flex;
  flex-direction: column;
  padding-left: j(10);
}
.account-input,
.password-input {
  display: flex;
  padding: j(10) 0;
  span {
    margin-right: j(40);
    font-size: j(16);
    color: #666;
  }
  input {
    flex: 1;
    font-size: j(14);
    margin-right: j(30);
  }
}
.forgot-password {
  font-size: j(12);
  color: #ff80af;
}
.password-input {
  border-top: 1px solid #ddd;
}
.button-group {
  height: 100%;
  background-color: #ddd;
  padding: j(10);
  button {
    width: 48%;
    height: j(40);
    font-size: j(16);
  }
}
.register-button {
  border: #ff80af 1px solid;
  color: #ff80af;
  margin-right: j(10);
}
.login-button {
  background-color: #ffb2d0;
  color: #fff;
  border: none;
}
.login-button-active {
  background-color: #ff80af;
  color: #fff;
  border: none;
}
.help-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #888;
  p {
    margin-top: j(20);
  }
  span {
    color: #ff80af;
  }
}
</style>
