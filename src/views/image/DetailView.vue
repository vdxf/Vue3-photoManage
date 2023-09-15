<template>
  <van-nav-bar title="编辑图片详情" left-arrow @click-left="router.go(-1)" class="edit-header" />
  <span @click="handleSave">保存</span>
  <textarea
    placeholder="请编辑图片详细信息"
    rows="4"
    v-model="description"
    maxlength="70"
  ></textarea>
  <p>{{ description?.length || 70 }}</p>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const description = ref<string>()
const handleSave = () => {
  router.replace({
    path: '/imagecreate',
    query: {
      description: description.value
    }
  })
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/define.scss';
textarea {
  width: 100%;
  font-size: j(14);
  background-color: transparent;
  border: none;
  padding: j(10);
  border-bottom: 2px solid #ff6cb3;
}
span {
  position: fixed;
  right: j(10);
  top: j(18);
  z-index: 2;
}
p {
  text-align: right;
  margin: j(10);
}
</style>
