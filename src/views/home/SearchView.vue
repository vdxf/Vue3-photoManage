<template>
  <div class="search-view">
    <div class="search-header">
      <i class="iconfont left" @click="router.go(-1)">&#xe60c;</i>
      <van-search
        v-model="keyword"
        show-action
        placeholder="搜索"
        @search="handleSearch"
        shape="round"
      >
        <template #action>
          <div @click="handleSearch" class="search-button">搜索</div>
        </template>
      </van-search>
    </div>

    <van-pull-refresh class="content" v-model="refreshing" @refresh="handleRefresh" v-if="isShow">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        @load="handleLoad"
      >
        <van-cell v-for="item in list" :key="item.id">
          <div class="image-detail" @click="handleImageDetail(item.id)">
            <vs-image :src="item.file.filepath" alt="img" />
            <div class="detail-content">
              <span>标题：{{ item.title }}</span>
              <span>详情：{{ item.description }}</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <div class="search-null" v-else>
      <p>搜索历史</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import VsImage from '@/components/commont/VsImage.vue'
import { onBeforeMount, ref, toRaw, watch } from 'vue'
import { doTabulation } from '@/api/index'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const keyword = ref('')
const keyword1 = ref('')
const imageList = ref<any>([])
const list = ref(toRaw(imageList))
let current1 = 0
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const refreshing = ref(false)
const isShow = ref(false)
const id = ref()
onBeforeMount(() => {
  if (route.query.id) {
    id.value = route.query.id
  }
})
//跳转图片详情
const handleImageDetail = (id: any) => {
  router.push({
    path: '/imagedetail',
    query: {
      id
    }
  })
}
const reqDataList = (current: number) => {
  doTabulation({
    current: current,
    length: 10,
    keyword: keyword1.value,
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
const handleRefresh = () => {
  reqDataList(1)
}
const handleLoad = () => {
  reqDataList(current1 + 1)
}
const handleSearch = () => {
  keyword1.value = keyword.value
  handleRefresh()
}
watch(keyword, (nv) => {
  if (nv) {
    keyword1.value = nv
    isShow.value = true
    handleSearch()
  } else {
    isShow.value = false
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/define.scss';
.search-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.search-header {
  display: flex;
  align-items: center;
  i {
    margin-left: j(10);
    font-size: j(20);
  }
}
.van-search {
  flex: 1;
  background-color: transparent;
}
.search-button {
  margin-left: j(10);
  color: #ff009d;
}
.content {
  flex: 1;
  overflow-y: auto;
  margin: j(5);
}
.van-list {
  background-color: transparent;
}
.van-cell {
  margin-bottom: j(10);
  border-radius: j(10);
  padding: j(10);
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
}
.search-null {
  margin: auto;
}
</style>
