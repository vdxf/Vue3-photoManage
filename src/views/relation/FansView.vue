<template>
  <van-pull-refresh class="content" v-model="refreshing" @refresh="handleRefresh" ref="view">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
      @load="handleLoad"
    >
      <van-cell v-for="item in list" :key="item.id">
        <div class="image-detail" @click="handleFansDetail(item.follower.id)">
          <vs-image
            :src="item.follower.avatar.filepath"
            wr="50"
            alt="img"
            v-if="item.follower.avatar"
          />
          <img src="@/assets/images/imageUpload.jpg" alt="img" v-else />
          <div class="detail-content">
            <span>{{ item.follower.nickname }}</span>
          </div>
          <button v-if="!item.follower.isFollow" @click.stop="handleFollow(item.follower.id)">
            + 关注
          </button>
        </div>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>
<script setup lang="ts">
import VsImage from '@/components/commont/VsImage.vue'
import { doFansList, doTrand } from '@/api'
import { onBeforeMount, ref, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authorId = ref()

const keyword1 = ref('')
const imageList = ref<any>([])
const list = ref(toRaw(imageList))
let current1 = 0
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const refreshing = ref(false)
const view = ref()
onBeforeMount(() => {
  authorId.value = route.query.id
})
//关注
const handleFollow = (id: string) => {
  doTrand({ followUserId: id }).then(() => {
    handleRefresh()
  })
}
//获取粉丝列表
const handleFansList = (current: number) => {
  doFansList({
    current: current,
    length: 10,
    keyword: keyword1.value,
    userId: authorId.value
  })
    .then((result) => {
      console.log(result)
      const { list, count } = result
      imageList.value = current === 1 ? list : [...imageList.value, ...list]
      finished.value = imageList.value.length >= count
      current1 = current
    })
    .catch(() => {
      error.value = true
    })
    .finally(() => {
      loading.value = false
      refreshing.value = false
    })
}
const handleRefresh = () => {
  handleFansList(1)
}
const handleLoad = () => {
  handleFansList(current1 + 1)
}
//跳转粉丝详情
const handleFansDetail = (id: string) => {
  router.push({
    path: '/usercenter',
    query: {
      id: id
    }
  })
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/define.scss';
.image-detail {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: j(40);
    height: j(40);
    border-radius: 50%;
    margin-right: j(20);
  }
}
.detail-content {
  flex: 1;
  text-align: left;
}
</style>
