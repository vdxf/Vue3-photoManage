<template>
  <div class="edit-view">
    <van-nav-bar title="账号资料" left-arrow @click-left="handleBack" class="edit-header" />
    <div class="edit-content">
      <!-- 修改头像 -->
      <label>
        <van-cell title="头像" is-link>
          <template #right-icon>
            <div class="avator-content">
              <vs-image :src="avatarUrl" wr="50" class="avatar-info" v-if="avatarUrl" />
              <img src="@/assets/images/imageUpload.jpg" alt="img" v-else class="avatar-info" />
              <i>></i>
            </div>
          </template>
        </van-cell>
        <input type="file" @change="handleFiles" />
      </label>
      <!-- 修改昵称 -->
      <van-cell title="昵称" is-link :value="nickname" @click="nicknameDialog = !nicknameDialog" />
      <van-dialog
        v-model:show="nicknameDialog"
        title="修改昵称"
        :value="nickname"
        show-cancel-button
        @confirm="updata"
        @cancel="newnickname = nickname"
      >
        <van-field v-model.trim="newnickname" placeholder="请输入昵称" />
      </van-dialog>
      <!-- 修改性别 -->
      <van-cell title="性别" is-link :value="sex" @click="sexDialog = !sexDialog" />
      <van-dialog
        v-model:show="sexDialog"
        title="修改性别"
        show-cancel-button
        @confirm="updata"
        @cancel="newsex = choose"
      >
        <van-radio-group v-model="newsex" direction="horizontal" class="sex-choose">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>
      </van-dialog>
      <!-- 修改签名 -->
      <van-cell
        title="个性签名"
        is-link
        :value="signature"
        @click="signatureDialog = !signatureDialog"
        @cancel="newsignature = signature"
      />
      <van-dialog
        v-model:show="signatureDialog"
        title="修改个性签名"
        show-cancel-button
        @confirm="updata"
      >
        <van-field v-model.trim="newsignature" />
      </van-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import VsImage from '@/components/commont/VsImage.vue'
import { onBeforeMount, ref } from 'vue'
import router from '@/router'
import { doFile, doUpdateUserInformation, doUserDetails } from '@/api'

const fileId = ref<any>('')
const files = ref('')
const sex = ref()
const choose = ref()
const nickname = ref()
const signature = ref('')
const newnickname = ref('')
const newsex = ref('')
const newsignature = ref('')
const avatarUrl = ref()
const userInfo = ref()
const nicknameDialog = ref()
const sexDialog = ref()
const signatureDialog = ref()
//返回
const handleBack = () => {
  router.go(-1)
}
//选择头像
const handleFiles = (event: any) => {
  files.value = event.target.files
  let formData = new FormData()
  formData.append('file', files.value[0])

  doFile(formData)
    .then((result) => {
      fileId.value = result.id
      avatarUrl.value = 'https://img.daysnap.cn/' + result.filepath
      updata()
    })
    .catch((error) => {
      alert(error.data.msg)
    })
}

//更新用户信息
const updata = () => {
  doUpdateUserInformation({
    nickname: newnickname.value,
    signature: newsignature.value,
    sex: newsex.value,
    avatarId: fileId.value
  })
    .then(() => {
      const id = window.localStorage.getItem('userId') || ''
      doUserDetails(id)
        .then((result) => {
          window.localStorage.setItem('userInfo', JSON.stringify(result))
          getInfo()
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
}
//获取用户信息
const getInfo = () => {
  userInfo.value = JSON.parse(window.localStorage.getItem('userInfo') || '')
  if (userInfo.value.avatar) {
    avatarUrl.value = 'https://img.daysnap.cn/' + userInfo.value.avatar.filepath
  }
  nickname.value = userInfo.value.nickname
  signature.value = userInfo.value.signature || '个性签名'
  newsignature.value = userInfo.value.signature
  newsex.value = userInfo.value.sex
  choose.value = userInfo.value.sex
  sex.value = userInfo.value.sex === 1 ? '女' : '男'
}
onBeforeMount(() => {
  getInfo()
})
</script>
<style lang="scss" scoped>
@import '@/assets/sass/define.scss';
.edit-view {
  height: 100vh;
  background-color: #f1f1f1;
}
.edit-header {
  box-shadow: -2px 2px 2px #ccc;
}
.edit-content {
  margin-top: j(20);
  &:nth-child {
    padding: j(20) 0;
  }
  input {
    display: none;
  }
}
.avatar-info {
  display: block;
  width: j(50);
  height: j(50);
  border-radius: 50%;
}
.van-radio-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: j(20);
}
.van-field {
  padding: j(20);
}
.van-cell {
  padding: j(20);
}
.avator-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  i {
    font-size: j(20);
    color: #ccc;
    margin-left: j(10);
  }
}
</style>
