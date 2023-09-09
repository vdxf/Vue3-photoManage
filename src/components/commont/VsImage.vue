<template>
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
</script>
