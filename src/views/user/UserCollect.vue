<template>
  <div class="mycollect-view">
    <van-search
      v-model="keyword"
      show-action
      placeholder="搜索我的收藏"
      @search="handleSearch"
      shape="round"
    >
      <template #action>
        <div @click="handleSearch">搜索</div>
      </template>
    </van-search>

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
      @load="handleLoad"
    >
      <div class="image-list">
        <van-cell v-for="item in collectList" :key="item.id" class="image-item">
          <div class="image-detail">
            <vs-image :src="item.picture.file.filepath" alt="img" />
            <div class="detail-content">
              <span>标题：{{ item.picture.title }}</span>
              <span>详情：{{ item.picture.description }}</span>
            </div>
          </div>
        </van-cell>
      </div>
    </van-list>
  </div>
</template>
<script setup lang="ts">
import VsImage from '@/components/commont/VsImage.vue'
import { doCollectList } from '@/api'
import { ref } from 'vue'

const keyword = ref('')
const keyword1 = ref('')
const collectList = ref()
let current1 = 0
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const refreshing = ref(false)
const view = ref()

const reqDataList = (current: number) => {
  doCollectList({
    current: current,
    length: 10,
    keyword: keyword1.value
  })
    .then((result) => {
      const { list, count } = result
      collectList.value = current === 1 ? list : [...collectList.value, ...list]
      finished.value = collectList.value.length >= count
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
const handleRefresh = () => {
  reqDataList(1)
  view.value.$el.scrollTop = 0
}
const handleLoad = () => {
  reqDataList(current1 + 1)
}
const handleSearch = () => {
  keyword1.value = keyword.value
  handleRefresh()
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/define.scss';
.mycollect-view {
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
  display: flex;
  flex-direction: column;
  text-align: left;
  white-space: nowrap;
}
</style>
