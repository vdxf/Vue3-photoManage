<template>
  <div class="main-view">
    <RouterView class="main-content" />
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <router-link class="image-add" to="/imagecreate">+</router-link>
      <van-tabbar-item replace to="/main" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>

<style lang="scss" scoped>
@import '@/assets/sass/define.scss';
.main-view {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-content {
  flex: 1;
}
.image-add {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 50vw;
  transform: translate(50%);
  bottom: j(5);
  width: j(40);
  height: j(40);
  background-color: #ff009d;
  border-radius: j(16);
  color: #fff;
  font-size: j(20);
}
</style>
