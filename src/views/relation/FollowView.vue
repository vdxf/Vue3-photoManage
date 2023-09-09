<template>
  <div class="follow-view">
    <van-search
      v-model="keyword"
      show-action
      placeholder="搜索我的关注"
      @search="handleSearch"
      shape="round"
    >
      <template #action>
        <div @click="handleSearch">搜索</div>
      </template>
    </van-search>

    <van-pull-refresh class="content" v-model="refreshing" @refresh="handleRefresh" ref="view">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        @load="handleLoad"
      >
        <van-cell v-for="item in userList" :key="item.id">
          <div class="item" @click="handleFollowDetail(item.following.id)">
            <vs-image
              :src="item.following.avatar.filepath"
              wr="200"
              alt="img"
              v-if="item.following.avatar"
            />
            <img src="@/assets/images/imageUpload.jpg" alt="img" v-else />
            <div class="item-info">
              <span>{{ item.following.nickname }}</span>
              <span>{{ item.following.signature }}</span>
            </div>
            <div
              class="trand-button"
              @click="handleCancelFollow(item.following.id, item.following.isFollow)"
            >
              <button v-if="item.following.isFollow">取消关注</button>
              <button v-else>+ 关注</button>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts">
import VsImage from '@/components/commont/VsImage.vue'
import { doFollowList, doTrand, doCancelTrand } from '@/api'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authorId = ref()

const keyword = ref('')
const keyword1 = ref('')
const userList = ref<any>()
let current1 = 0
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const refreshing = ref(false)
const view = ref()
onBeforeMount(() => {
  authorId.value = route.query.id
})
//获取关注列表
const handleFollowList = (current: number) => {
  doFollowList({
    current: current,
    length: 10,
    keyword: keyword1.value,
    userId: authorId.value
  })
    .then((result) => {
      const { list, count } = result
      userList.value = current === 1 ? list : [...userList.value, ...list]
      finished.value = userList.value.length >= count
      current1 = current
      console.log(userList.value)
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
//取消关注 / 关注
const handleCancelFollow = (id: string, isFollow: boolean) => {
  if (isFollow) {
    doCancelTrand({ followUserId: id }).then(() => {
      handleRefresh()
    })
  } else {
    doTrand({
      followUserId: id
    }).then(() => {
      handleRefresh()
    })
  }
}
//跳转关注者详情
const handleFollowDetail = (id) => {
  router.push({
    path: '/usercenter',
    query: {
      id: id
    }
  })
}
const handleRefresh = () => {
  handleFollowList(1)
  view.value.$el.scrollTop = 0
}
const handleLoad = () => {
  handleFollowList(current1 + 1)
}
const handleSearch = () => {
  keyword1.value = keyword.value
  handleRefresh()
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/define.scss';
.content {
  overflow-y: auto;
  height: 100vh;
}
.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    display: block;
    width: j(40);
    height: j(40);
    border-radius: 50%;
    margin-right: j(20);
  }
}
.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  span:first-child {
    font-size: j(18);
    color: #000;
  }
}
</style>
