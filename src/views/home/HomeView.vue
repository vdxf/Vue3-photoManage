<template>
  <div class="home-view">
    <!-- 头部搜索 -->
    <div class="home-header">
      <router-link to="main">
        <vs-image :src="avatarUrl" wr="50" class="header-avatar" v-if="avatarUrl" />
        <img src="@/assets/images/imageUpload.jpg" alt="img" v-else />
      </router-link>
      <div class="search-form">
        <van-search
          v-model="keyword"
          placeholder="请输入搜索关键词"
          @focus="handleSearch"
          shape="round"
        >
        </van-search>
      </div>
    </div>
    <!-- 图片列表 -->
    <van-pull-refresh class="content" v-model="refreshing" @refresh="handleRefresh" ref="view">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        @load="handleLoad"
      >
        <ul class="image-content">
          <li id="left">
            <van-cell
              v-for="item in leftList"
              :key="item.id"
              @click="handleImageDetail(item.id)"
              class="image-item"
            >
              <div
                class="image-box"
                :style="{
                  paddingTop: (item.file.height / item.file.width) * 100 + `%`,
                  backgroundColor: item.file.color
                }"
              >
                <vs-image :src="item.file.filepath" wr="200" alt="img" />
              </div>
              <div class="detail-content">
                <span>{{ item.description }}</span>
                <span><i></i>{{ item.user.nickname }}</span>
              </div>
            </van-cell>
          </li>
          <li id="right">
            <van-cell
              v-for="item in rightList"
              :key="item.id"
              @click="handleImageDetail(item.id)"
              class="image-item"
            >
              <div
                class="image-box"
                :style="{
                  paddingTop: (item.file.height / item.file.width) * 100 + `%`,
                  backgroundColor: item.file.color
                }"
              >
                <vs-image :src="item.file.filepath" wr="200" alt="img" />
              </div>
              <div class="detail-content">
                <span>{{ item.description }}</span>
                <span><i></i>{{ item.user.nickname }}</span>
              </div>
            </van-cell>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { doTabulation } from '@/api/index'
import VsImage from '@/components/commont/VsImage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const keyword = ref('')
const keyword1 = ref('')
const imageList = ref<any>()
const leftList = ref<any>([])
const rightList = ref<any>([])
let current1 = 0
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const refreshing = ref(false)
const view = ref()
const avatarUrl = ref()
const userInfo = ref()
const leftHeight = ref<any>()
const rightHeight = ref<any>()
onBeforeMount(() => {
  const token = window.localStorage.getItem('token')
  if (token) {
    handleUserDetail()
  }
})
//获取用户头像
const handleUserDetail = () => {
  userInfo.value = JSON.parse(window.localStorage.getItem('userInfo') || '')
  if (userInfo.value.avatar) {
    avatarUrl.value = 'https://img.daysnap.cn/' + userInfo.value.avatar.filepath
  }
}
//跳转图片详情
const handleImageDetail = (id: any) => {
  router.push({
    path: '/imagedetail',
    query: {
      id
    }
  })
}
//获取图片列表
const reqDataList = (current: number) => {
  doTabulation({
    current: current,
    length: 10,
    keyword: keyword1.value
  })
    .then((result) => {
      const { list, count } = result
      imageList.value = current === 1 ? list : [...imageList.value, ...list]
      finished.value = imageList.value.length >= count
      current1 = current
      list.forEach((item: object) => {
        setTimeout(() => {
          leftHeight.value = document.getElementById('left')?.clientHeight
          rightHeight.value = document.getElementById('right')?.clientHeight
          if (leftHeight.value <= rightHeight.value) {
            leftList.value.push(item)
          } else {
            rightList.value.push(item)
          }
        }, 0)
      })
    })
    .catch((error) => {
      error.value = true
    })
    .finally(() => {
      loading.value = false
      refreshing.value = false
    })
}
//下拉刷新
const handleRefresh = () => {
  reqDataList(1)
  view.value.$el.scrollTop = 0
}
//上拉加载
const handleLoad = () => {
  reqDataList(current1 + 1)
}
//搜索
const handleSearch = () => {
  router.push('/search')
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/define.scss';
.home-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  padding-bottom: j(40);
}
.home-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: j(10);
  background-color: #fff;
  img {
    display: block;
    width: j(40);
    height: j(40);
    border-radius: 50%;
  }
}
.search-form {
  flex: 1;
}
.content {
  flex: 1;
  overflow-y: auto;
  background-color: #f1f1f1;
}
.image-content {
  display: flex;
  align-items: flex-start;
  padding: j(10);
  li {
    flex: 1;
    margin-right: j(10);
    &:last-child {
      margin-right: 0;
    }
  }
}
.image-box {
  width: 100%;
  position: relative;
  img {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
.image-item {
  padding: 0;
  margin-bottom: j(10);
}
.detail-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 j(4);
  span {
    font-size: j(16);
    color: #000;
    &:last-child {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #ccc;
      font-size: j(12);
    }
  }
  i {
    display: block;
    width: j(16);
    height: j(16);
    background: url(@/assets/images/UP.svg);
    background-size: 100% 100%;
    margin-right: j(4);
  }
}
</style>
