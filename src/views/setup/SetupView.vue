<template>
  <div class="setup-view">
    <van-nav-bar title="设置" left-arrow @click-left="handleBack" />
    <van-cell title="用户协议" is-link to="agreement" class="first" />
    <van-cell title="隐私政策" is-link to="privacy" />
    <van-cell title="帮助" is-link to="help" />
    <van-cell title="修改密码" is-link to="change" />
    <button @click="handleExit" class="exit" v-if="isToken">退出登录</button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const isToken = window.localStorage.getItem('token')
//返回
const handleBack = () => {
  router.go(-1)
}
//退出登录
const handleExit = () => {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('userId')
  window.localStorage.removeItem('userInfo')
  router.replace('/login')
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/define.scss';
.exit {
  display: block;
  height: j(40);
  width: 50%;
  margin: j(20) auto;
  background-color: #ff80af;
  border: none;
  color: #fff;
  font-size: j(16);
}
.first {
  margin-top: j(10);
}
</style>
