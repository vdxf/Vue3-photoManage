<template>
  <div class="changepassword-view">
    <van-nav-bar title="修改密码" left-arrow @click-left="handleBack" />
    <label class="reset-password"
      >旧密码：<input type="text" v-model="oldPassword" placeholder="请输入旧密码"
    /></label>
    <label class="reset-password"
      >新密码：<input type="text" v-model="password" placeholder="请输入新的密码"
    /></label>
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
</script>

<style scoped lang="scss">
@import '@/assets/sass/define.scss';
.changepassword-view {
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
