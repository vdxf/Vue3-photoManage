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
  e.target.src = '@/assets/images/null.png'
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

<!-- <template>
  <img :src="computedSrc" :alt="alt" @error="handleError" />
</template>

<script>
const IMAGE_BASE_URL = 'https://img.daysnap.cn/'
export default {
  props: {
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
  },
  computed: {
    computedSrc() {
      const { src, wr, hr } = this
      let url = src.startsWith('http') ? src : `${IMAGE_BASE_URL}${src}`
      if (wr) {
        url += `${url.includes('?') ? '&' : '?'}w=${wr}`
      }
      if (hr) {
        url += `${url.includes('?') ? '&' : '?'}h=${hr}`
      }
      return url
    }
  },
  methods: {
    handleError(e) {
      e.target.src = require('@/assets/images/null.png')
    }
  }
}
</script> -->
