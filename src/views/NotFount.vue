<template>
  <div class="c-view">
    <div class="c-card">
      <div class="content-wrap">
        <h1>404</h1>
        <p>抱歉，页面无法访问</p>
      </div>
      <div class="button-group">
        <button @click="handleBack">返回</button>
        <button @click="handleRefresh">刷新</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleBack = () => {
  router.go(-1)
}
const handleRefresh = () => {
  window.location.reload()
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/define.scss';
.c-card {
  margin-top: j(40);
  padding: j(40);
}
.content-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: j(40);
  h1 {
    font-size: j(40);
    font-weight: 700;
    height: j(40);
    line-height: j(40);
    letter-spacing: j(10);
    margin-bottom: j(20);
    text-shadow: 10px 10px 10px #ccc;
  }
  p {
    font-size: j(20);
  }
}
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  button {
    border: none;
    background-color: transparent;
    color: #de900b;
  }
}
</style>
