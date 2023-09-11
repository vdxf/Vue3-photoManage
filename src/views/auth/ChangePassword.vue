<template>
  <div class="changepassword-view">
    <van-nav-bar title="修改密码" left-arrow @click-left="handleBack" />
    <label class="reset-password"
      >旧密码：<input type="text" v-model="oldPassword" placeholder="请输入旧密码"
    /></label>
    <label class="reset-password"
      >新密码：<input type="text" v-model="password" placeholder="请输入新的密码"
    /></label>
    <div class="forgot-password" @click.stop="handleRetrievePassword">忘记密码？</div>
    <button
      @click.stop="handleSubmit"
      class="retrieve-next"
      :class="{ 'retrieve-next-active': oldPassword && password }"
    >
      提交
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { doUpdatePassword } from '@/api'
import { showToast } from 'vant'

const oldPassword = ref<string>()
const password = ref<string>()
//返回
const handleBack = () => {
  router.go(-1)
}
//修改密码
const handleSubmit = () => {
  if (oldPassword.value && password.value) {
    if (oldPassword.value !== password.value) {
      doUpdatePassword({
        oldPassword: oldPassword.value,
        password: password.value
      })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.dir(error)
        })
    } else {
      showToast('新密码不能与旧密码相同')
    }
  }
}
// 忘记密码
const handleRetrievePassword = () => {
  router.push('/retrieve')
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/define.scss';
.changepassword-view {
  height: 100vh;
  background-color: #ddd;
  position: relative;
}

.forgot-password {
  position: absolute;
  top: j(18);
  right: j(20);
  width: j(60);
  height: j(20);
  font-size: j(12);
  color: #ff80af;
  z-index: 3;
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
.retrieve-next {
  width: 80%;
  height: j(40);
  border-radius: j(20);
  margin: j(40) 10% j(20);
  background-color: #ffb2d0;
  border: none;
  color: #fff;
  font-size: j(16);
}

.retrieve-next-active {
  background-color: #ff80af;
}
</style>
