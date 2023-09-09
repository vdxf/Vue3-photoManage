<template>
  <div class="myhome-view">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
      @load="handleLoad"
    >
      <div class="image-list">
        <van-cell v-for="item in list" :key="item.id" class="image-item">
          <div class="image-detail">
            <vs-image :src="item.file.filepath" alt="img" />
            <div class="detail-content" v-if="!authorId || authorId === id">
              <button @click.stop="handleUpdataImage(item)">更新</button>
              <button @click.stop="handleDeleteImage(item.id)">删除</button>
            </div>
          </div>
        </van-cell>
      </div>
    </van-list>
  </div>
</template>
<script setup lang="ts">
import VsImage from '@/components/commont/VsImage.vue'
import { doDelete, doTabulation } from '@/api'
import { showConfirmDialog } from 'vant'
import { ref, onBeforeMount, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const imageList = ref<any>([])
const list = ref(toRaw(imageList))
let current1 = 0
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const refreshing = ref(false)
const authorId = ref()
const id = ref()
onBeforeMount(() => {
  if (route.query.id) {
    id.value = route.query.id
  } else {
    id.value = window.localStorage.getItem('userId') || ''
  }
  reqDataList(1)
})
const reqDataList = (current: number) => {
  doTabulation({
    current: current,
    length: 10,
    userId: id.value
  })
    .then((result) => {
      const { list, count } = result
      imageList.value = current === 1 ? list : [...imageList.value, ...list]
      finished.value = imageList.value.length >= count
      current1 = current
    })
    .catch((error) => {
      console.log(error)
      error.value = true
    })
    .finally(() => {
      loading.value = false
      refreshing.value = false
    })
}
const handleLoad = () => {
  reqDataList(current1 + 1)
}
//更新
const handleUpdataImage = (item: any) => {
  const data = toRaw(item)
  router.push({
    path: '/imagecreate',
    query: {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      fileId: data.file.id,
      imgUrl: data.file.filepath
    }
  })
}
//删除
const handleDeleteImage = (id: any) => {
  showConfirmDialog({
    title: '温馨提示',
    message: '确认要删除吗'
  })
    .then(() => {
      doDelete(id)
        .then(() => {
          reqDataList(1)
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch(() => {
      // on cancel
    })
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/define.scss';
.myhome-view {
  height: 100vh;
  overflow-y: auto;
}
.image-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: j(100);
}
.image-item {
  width: 48%;
  margin: j(3);
  padding: 0;
  border: 1px solid #000;
}
.image-detail {
  display: flex;
  flex-direction: column;
  img {
    display: block;
    width: 100%;
    height: j(200);
  }
}

.detail-content {
  margin-top: j(10);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button {
    width: 48%;
    height: j(30);
  }
}
</style>
