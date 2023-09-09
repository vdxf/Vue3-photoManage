<template>
  <div class="retrieve-view">
    <van-nav-bar title="找回密码" left-arrow @click-left="handleBack" />
    <div class="bind-email">
      <label>邮箱：<input type="email" v-model="email" placeholder="请输入绑定的邮箱" /></label>
    </div>

    <div class="form-item">
      邮箱验证码：<input
        type="text"
        placeholder="请输入邮箱验证码"
        v-model.trim="captcha"
        required
        maxlength="6"
      />
      <button @click="handleCode" v-if="!sendCode">发送验证码</button>
      <van-count-down :time="time" format="ss" @finish="handleFinish" class="send-code" v-else />
    </div>

    <label class="reset-password"
      >新密码：<input type="text" v-model="resetPassword" placeholder="请输入新的密码"
    /></label>
    <button
      @click.stop="handleReset"
      class="retrieve-next"
      :class="{ 'retrieve-next-active': email && captcha && resetPassword }"
    >
      提交
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { doEmailSend, doResetPassword } from '@/api'

const email = ref('2532499815@qq.com')
const resetPassword = ref()
const captcha = ref('')
let sendCode = ref(false)
const time = ref(60 * 1000)
//返回
const handleBack = () => {
  router.go(-1)
}
//邮箱验证
const isEmail = (val: string) => {
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)
}
//发送验证码
const handleCode = () => {
  if (isEmail(email.value)) {
    sendCode.value = true
    doEmailSend({ email: email.value, type: 'register' })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        alert(error.data.msg)
      })
  } else {
    alert('邮箱格式错误')
  }
}
//重置密码
const handleReset = () => {
  if (email.value && resetPassword.value && captcha.value) {
    if (isEmail(email.value)) {
      doResetPassword({
        email: email.value,
        captcha: captcha.value,
        resetPassword: resetPassword.value
      })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.dir(error)
        })
    } else {
      alert('邮箱格式错误')
    }
  }
}
//倒计时
const handleFinish = () => {
  sendCode.value = false
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/define.scss';
.retrieve-view {
  height: 100vh;
  background-color: #ddd;
}
.bind-email {
  margin: j(10) 0;
  height: j(40);
  background-color: #fff;
  padding-left: j(10);
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: j(16);
  span {
    margin-right: j(20);
  }
}
.retrieve-next {
  height: j(40);
  margin: j(10);
  width: 94%;
  background-color: #ffb2d0;
  border: none;
  color: #fff;
  font-size: j(16);
}
.retrieve-next-active {
  background-color: #ff80af;
}
.form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 0 j(10);
  height: j(50);
  font-size: j(16);
  input {
    flex: 1;
  }
  button {
    height: j(40);
    border-radius: j(10);
    font-size: j(14);
    background-color: #ccc;
    color: #fafafa;
    border: none;
  }
}
.reset-password {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: j(20);
  font-size: j(16);
  height: j(40);
  background-color: #fff;
  padding: 0 j(10);
  input {
    flex: 1;
  }
}
</style>
