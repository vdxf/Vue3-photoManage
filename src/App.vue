<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="KeepAlive.keepAliveList">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useKeepAiveStore } from '@/store/KeepAlive'
const KeepAlive: any = useKeepAiveStore()
</script>

<style lang="scss">
@import '@/assets/sass/global.scss';
body {
  box-sizing: border-box;
  background-color: #f1f1f1;
}
</style>
@/store/KeepAlive
