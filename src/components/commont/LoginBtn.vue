<template>
  <div class="button-box">
    <button>{{ props.btntext }}</button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['btntext'])
</script>
<style lang="scss" scoped>
@import '@/assets/sass/global.scss';
.button-box {
  padding: j(15) j(20);
  button {
    background-color: rgb(252, 133, 166);
    color: #fff;
    height: j(40);
    width: 100%;
    border-radius: j(20);
    font-size: j(16);
  }
}
</style>
