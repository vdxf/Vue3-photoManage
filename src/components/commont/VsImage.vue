<template>
  <img :src="url" :alt="props.alt" @error="handleError" />
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { ref } from 'vue'
const IMAGE_BASE_URL = ref('https://img.daysnap.cn/')
const props = defineProps({
  alt: {
    default: ''
  },
  src: {
    default: ''
  },
  wr: {
    default: ''
  },
  hr: {
    default: ''
  }
})
const handleError = (e: any) => {
  e.target.src = '@/assets/images/imageUpload.jpg'
}
const url = ref()
onBeforeMount(() => {
  computedUrl()
})
const computedUrl = () => {
  const { src, wr, hr } = props
  url.value = src.startsWith('http') ? src : `${IMAGE_BASE_URL.value}${src}`
  if (wr) {
    url.value += `${url.value.includes('?') ? '&' : '?'}w=${wr}`
  }
  if (hr) {
    url.value += `${url.value.includes('?') ? '&' : '?'}h=${hr}`
  }
}
</script>
