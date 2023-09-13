<template>
  <div class="c-view">
    <div class="header-content" @click="handleLogin">
      <div class="login-view" v-if="!isToken">
        <img src="@/assets/images/imageUpload.jpg" alt="img" />
        <span>点击登录</span>
        <i>></i>
      </div>
      <div class="user-avatar" v-else>
        <vs-image :src="avatarUrl" wr="50" alt="img" v-if="avatarUrl" class="avatar-info" />
        <img src="@/assets/images/imageUpload.jpg" alt="img" v-else />
        <span>{{ nickname }} <i class="iconfont">&#xe6e2;</i> </span>
        <p>空间<i class="iconfont">&#xe606;</i></p>
      </div>
      <div class="user-info" @click.stop="handleTrand">
        <div class="user-trend">
          <span>{{ trend }}</span>
          <p>动态</p>
        </div>
        <div class="user-follow" @click.stop="handleFollow">
          <span>{{ follow }}</span>
          <p>关注</p>
        </div>
        <div class="user-fans" @click.stop="handleFans">
          <span>{{ fans }}</span>
          <p>粉丝</p>
        </div>
      </div>
    </div>
    <div class="user-content">
      <div class="info-group">
        <div class="my-download" @click.stop="$emit('null')">
          <i></i>
          <span>离线下载</span>
        </div>
        <div class="my-history" @click.stop="$emit('null')">
          <i></i>
          <span>历史记录</span>
        </div>
        <div class="my-collect" @click.stop="handleCollect">
          <i></i>
          <span>我的收藏</span>
        </div>
        <div class="my-next" @click.stop="$emit('null')">
          <i></i>
          <span>稍后再看</span>
        </div>
      </div>
      <div class="recommen-srevice">
        <p>推荐服务</p>
        <div class="recommen-group">
          <div class="recommen-item">
            <i class="iconfont">&#xe60b;</i>
            <span @click="$emit('null')">我的课程</span>
          </div>
          <div class="recommen-item">
            <i class="iconfont">&#xe6bd;</i>
            <span @click="$emit('null')">免流量服务</span>
          </div>
          <div class="recommen-item">
            <i class="iconfont">&#xe653;</i>
            <span @click="$emit('null')">个性装扮</span>
          </div>
          <div class="recommen-item">
            <i class="iconfont">&#xe72f;</i>
            <span @click="$emit('null')">邀好友赚红包</span>
          </div>
          <div class="recommen-item">
            <i class="iconfont">&#xe63f;</i>
            <span @click="$emit('null')">我的钱包</span>
          </div>
          <div class="recommen-item">
            <i class="iconfont">&#xe60b;</i>
            <span @click="$emit('null')">我的课程</span>
          </div>
          <div class="recommen-item">
            <i class="iconfont">&#xe6bd;</i>
            <span @click="$emit('null')">免流量服务</span>
          </div>
          <div class="recommen-item">
            <i class="iconfont">&#xe653;</i>
            <span @click="$emit('null')">个性装扮</span>
          </div>
          <div class="recommen-item">
            <i class="iconfont">&#xe72f;</i>
            <span @click="$emit('null')">邀好友赚红包</span>
          </div>
          <div class="recommen-item">
            <i class="iconfont">&#xe63f;</i>
            <span @click="$emit('null')">我的钱包</span>
          </div>
        </div>
      </div>
      <div class="more-srevice">
        <p>更多服务</p>
        <div class="set-up">
          <i class="iconfont">&#xe603;</i>
          <span @click="$emit('null')">联系客服</span>
          <i>></i>
        </div>
        <div class="set-up">
          <i class="iconfont">&#xe602;</i>
          <span @click="$emit('null')">听视频</span>
          <i>></i>
        </div>
        <div class="set-up">
          <i class="iconfont">&#xe60a;</i>
          <span @click="$emit('null')">青少年守护</span>
          <i>></i>
        </div>
        <div class="set-up">
          <i class="iconfont">&#x10101;</i>
          <span @click="handleSetup">设置</span>
          <i>></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VsImage from '@/components/commont/VsImage.vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const trend = ref('-')
const follow = ref('-')
const fans = ref('-')
const isToken = ref<any>('')
const userDetail = ref()
const avatarUrl = ref()
const nickname = ref('')
const id = ref('')
onBeforeMount(() => {
  isToken.value = window.localStorage.getItem('token')
  if (isToken.value) {
    handleUserDetail()
  }
})
//个人中心
const handleLogin = () => {
  router.push('usercenter')
}
// 获取用户详情
const handleUserDetail = () => {
  userDetail.value = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
  nickname.value = userDetail.value.nickname
  trend.value = userDetail.value.pictureCount
  follow.value = userDetail.value.followingCount
  fans.value = userDetail.value.followerCount
  id.value = userDetail.value.id
  if (userDetail.value.avatar) {
    avatarUrl.value = 'https://img.daysnap.cn/' + userDetail.value.avatar.filepath
  }
}
//设置
const handleSetup = () => {
  router.push('/setup')
}
//动态
const handleTrand = () => {
  router.push('/usercenter/usertrand')
}
//关注
const handleFollow = () => {
  router.push({
    path: '/friend/follow',
    query: {
      id: id.value
    }
  })
}
//粉丝
const handleFans = () => {
  router.push({
    path: '/friend/fans',
    query: {
      id: id.value
    }
  })
}
//我的收藏
const handleCollect = () => {
  router.push('/usercenter/usercollect')
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/define.scss';

.c-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: j(40) j(10);
  background-color: #fafafa;
  overflow: hidden;
}
.user-avatar,
.login-view {
  height: j(50);
  display: flex;
  align-items: center;
  img,
  .avatar-info {
    display: block;
    width: j(50);
    height: j(50);
    border-radius: 50%;
    margin-right: j(10);
  }
  span {
    font-size: j(20);
    color: #333;
    flex: 1;
  }
  i {
    font-size: j(20);
    color: #ccc;
  }
}
.user-avatar {
  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    i {
      font-size: j(20);
      margin-left: j(10);
    }
  }
  p {
    font-size: j(14);
    color: #ccc;
    i {
      font-size: j(14);
      margin-left: j(10);
    }
  }
}
.user-info {
  margin-top: j(10);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: j(50);
}
.user-trend,
.user-follow,
.user-fans {
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: j(16);
    color: #333;
    margin-bottom: j(5);
  }
  p {
    font-size: j(12);
    color: #aaa;
  }
}
.user-follow {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 0 j(50);
}
.info-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 j(20);
}
.my-download,
.my-collect,
.my-history,
.my-next {
  margin-top: j(10);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  i {
    display: block;
    width: j(25);
    height: j(25);
    margin-bottom: j(6);
  }
}
.my-download {
  i {
    background: url(@/assets/images/mydownload.svg) center center no-repeat;
    background-size: j(40) j(40);
  }
}
.my-collect {
  i {
    background: url(@/assets/images/trand.svg) center center no-repeat;
    background-size: j(25) j(25);
  }
}
.my-history {
  i {
    background: url(@/assets/images/myhistory.svg) center center no-repeat;
    background-size: j(30) j(30);
  }
}
.my-next {
  i {
    background: url(@/assets/images/mynext.svg) center center no-repeat;
    background-size: j(25) j(25);
  }
}
.more-srevice,
.recommen-srevice {
  margin-top: j(20);
  display: flex;
  flex-direction: column;
  p {
    font-weight: 500;
    font-size: j(14);
    margin: j(20) 0;
  }
}
.recommen-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.recommen-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin-bottom: j(10);
  i {
    display: block;
    width: j(30);
    height: j(30);
    color: #e89abe;
    font-size: j(20);
    margin-bottom: j(4);
  }
}
.set-up {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: j(10) 0;
  margin-left: j(10);
  .iconfont {
    color: #e89abe;
    font-size: j(20);
    margin-right: j(10);
  }
  span {
    display: flex;
    flex-direction: row;
    font-size: j(14);
    height: j(20);
    line-height: j(20);
    flex: 1;
  }
  i {
    font-size: j(20);
    color: #ccc;
  }
}
.user-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: j(20);
}
</style>
