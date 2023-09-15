<template>
  <div class="c-view">
    <van-nav-bar
      left-arrow
      class="edit-header"
      :border="false"
      :clickable="true"
      @click-left="router.go(-1)"
      @click-right="handleSearch"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="view-content">
      <vs-image :src="avatarUrl" alt="img" v-if="avatarUrl" />
      <img src="@/assets/images/imageUpload.jpg" alt="img" v-else />
    </div>
    <div class="user-info" @click="handleHomepage">
      <div class="header-info">
        <vs-image :src="authoravatar" wr="50" alt="img" v-if="authoravatar" class="user-avatar" />
        <img src="@/assets/images/imageUpload.jpg" alt="img" v-else />
        <span>{{ authorNickname }}</span>
        <div class="trand-group" v-if="trandShow">
          <button class="trand" v-if="!isFollow" @click.stop="handleTrand">+ 关注</button>
          <button class="tranded" v-else @click.stop="handleTrand">已关注</button>
        </div>
      </div>
      <p>{{ description }}</p>
    </div>
    <div
      class="like-button group-item"
      @click="handleLike"
      :class="{ 'like-button-active': isLike }"
    >
      <i></i>
      <span>{{ likeCount }}</span>
    </div>
    <div
      class="collect-button group-item"
      @click="handleCollect"
      :class="{ 'collect-button-active': isCollect }"
    >
      <i></i>
      <span>{{ collectCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import VsImage from '@/components/commont/VsImage.vue'
import { ref, onBeforeMount } from 'vue'
import {
  doCancelTrand,
  doDetail,
  doTrand,
  doUserDetails,
  doLike,
  doCancellike,
  doCollect,
  doCancelCollect
} from '@/api'
import { useRoute } from 'vue-router'
import { showFailToast, showSuccessToast } from 'vant'
import router from '@/router'

const detailList = ref<any>('')
const avatarUrl = ref()
const authoravatar = ref()
const authorNickname = ref()
const authorId = ref()
const authorInfo = ref()
const description = ref()
const isLike = ref(false)
const likeCount = ref(0)
const collectCount = ref(0)
const isCollect = ref(false)
const isFollow = ref()
const pictureId = ref()
const route = useRoute()
const trandShow = ref()

onBeforeMount(() => {
  handleDetail()
})
//搜索
const handleSearch = () => {
  router.push('search')
}
//获取图片详情
const handleDetail = async () => {
  pictureId.value = route.query.id
  const result = await doDetail(pictureId.value)
  detailList.value = result
  description.value = detailList.value.description // 描述
  isLike.value = detailList.value.isLike // 是否点赞
  likeCount.value = detailList.value.likeCount // 点赞数
  isCollect.value = detailList.value.isCollect // 是否收藏
  collectCount.value = detailList.value.collectCount // 收藏数
  avatarUrl.value = 'https://img.daysnap.cn/' + detailList.value.file.filepath // 图片
  authoravatar.value = 'https://img.daysnap.cn/' + detailList.value.user.avatar.filepath // 作者头像
  authorNickname.value = detailList.value.user.nickname // 作者用户名
  authorId.value = detailList.value.user.id // 作者Id
  handleUserDetail()
}
//获取作者详情
const handleUserDetail = async () => {
  const id = window.localStorage.getItem('userId')
  if (authorId.value !== id) {
    const result = await doUserDetails(authorId.value)
    authorInfo.value = result
    trandShow.value = true
    isFollow.value = authorInfo.value.isFollow // 是否关注
  } else {
    trandShow.value = false
  }
}
//关注
const handleTrand = async () => {
  if (!isFollow.value) {
    await doTrand({
      followUserId: authorId.value
    })
  } else {
    await doCancelTrand({
      followUserId: authorId.value
    })
  }
  handleUserDetail()
}
//点赞
const handleLike = async () => {
  if (!isLike.value) {
    await doLike({
      pictureId: pictureId.value
    })
      .then(() => {
        handleDetail()
        showSuccessToast('点赞成功')
      })
      .catch(() => {
        showFailToast('点赞失败')
      })
  } else {
    doCancellike({
      pictureId: pictureId.value
    })
      .then(() => {
        handleDetail()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
//收藏
const handleCollect = () => {
  if (!isCollect.value) {
    doCollect({
      pictureId: pictureId.value
    })
      .then(() => {
        handleDetail()
        showSuccessToast('收藏成功')
      })
      .catch(() => {
        showFailToast('收藏失败')
      })
  } else {
    doCancelCollect({
      pictureId: pictureId.value
    })
      .then(() => {
        handleDetail()
      })
      .catch((error) => {
        console.dir(error)
      })
  }
}
//跳转个人中心
const handleHomepage = () => {
  router.push({
    path: '/usercenter',
    query: {
      id: authorId.value
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/define.scss';

.c-view {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #000;
}
.edit-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  color: #fff;
  .van-nav-bar,
  .van-icon {
    color: #fff;
  }
}
.view-content {
  width: 100vw;
  img {
    width: 100%;
  }
}
.user-info {
  position: fixed;
  bottom: j(40);
  left: j(20);
  width: 80vw;
  display: flex;
  flex-direction: column;
  p {
    font-size: j(16);
    color: #fff;
  }
}
.header-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: j(10);
  color: rgb(250, 114, 152);
  img {
    display: block;
    width: j(40);
    height: j(40);
    border-radius: 50%;
    margin-right: j(10);
  }
}
.trand,
.tranded {
  width: j(60);
  height: j(20);
  line-height: j(20);
  border-radius: j(15);
  font-size: j(12);
  margin-left: j(20);
}
.trand {
  background-color: rgb(250, 114, 152);
  color: #fff;
}
.tranded {
  background-color: #ccc;
  color: #000;
}
.button-group {
  display: flex;
  justify-content: space-around;
  span {
    display: flex;
    flex-direction: column;
  }
}
.group-item {
  position: fixed;
  right: j(20);
  display: flex;
  flex-direction: column;
  align-items: center;
  i {
    display: block;
    width: j(30);
    height: j(30);
    background-size: auto;
    margin-bottom: j(10);
  }
  span {
    color: #fff;
  }
}
.like-button {
  i {
    background: url(@/assets/images/like.svg);
  }
  bottom: j(180);
}
.like-button-active {
  i {
    background: url(@/assets/images/likeactive.svg);
  }
}
.collect-button {
  bottom: j(100);
  i {
    background: url(@/assets/images/collect.svg);
  }
}
.collect-button-active {
  i {
    background: url(@/assets/images/collectactive.svg);
  }
}
</style>
