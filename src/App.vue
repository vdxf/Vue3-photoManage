<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
@import '@/assets/sass/global.scss';
body {
  box-sizing: border-box;
  background-color: #f1f1f1;
}
</style>
