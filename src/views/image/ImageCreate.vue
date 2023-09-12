<template>
  <div class="section-content">
    <van-nav-bar title="上传图片" left-arrow @click-left="handleColse" />
    <div class="upload-image">
      <div class="title-content">
        <p>图片标题</p>
        <input type="text" placeholder="请输入图片的标题" v-model="title" />
      </div>
      <div class="type-content">
        <van-field
          v-model="fieldValue"
          is-link
          readonly
          label="图片类型"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
      </div>
      <div class="image-descraption">
        <p>图片详细信息：</p>
        <textarea class="picture-detail" style="resize: none" rows="6" v-model="description">
        </textarea>
      </div>
      <label class="image-content">
        <span v-if="!imgUrl">选择图片 +</span>
        <div class="image-box">
          <vs-image :src="imgUrl" alt="img" v-if="imgUrl" />
        </div>
        <input type="file" @change="handleFiles" style="opacity: 0" />
      </label>
      <div class="button-group">
        <button @click="handleDelate">取消</button>
        <button @click="handleUploadImage">发布</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VsImage from '@/components/commont/VsImage.vue'
import { doFile, doGain, doUpdata } from '@/api'
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const title = ref()
const description = ref()
const type = ref()
const fileId = ref()
const files = ref('')
const imgUrl = ref('')

const fieldValue = ref('')
const showPicker = ref(false)
const columns = [
  { text: '公开的', value: 'public' },
  { text: '私密的', value: 'private' }
]
const onConfirm = ({ selectedOptions }: any) => {
  showPicker.value = false
  fieldValue.value = selectedOptions[0].text
  type.value = selectedOptions[0].value
}

const handleColse = () => {
  router.go(-1)
}
//上传图片
const handleFiles = (event: any) => {
  files.value = event.target.files
  let formData = new FormData()
  formData.append('file', files.value[0])

  doFile(formData)
    .then((result) => {
      handleDelate()
      setTimeout(() => {
        fileId.value = result.id
        imgUrl.value = result.filepath
      })
    })
    .catch(() => {})
}
//创建 / 更新
const handleUploadImage = () => {
  if (route.query.id) {
    doUpdata({
      title: title.value,
      description: description.value,
      fileId: fileId.value,
      type: type.value,
      id: route.query.id
    })
      .then((result) => {
        console.log(result)
        router.replace('/home')
      })
      .catch(() => {})
  } else {
    doGain({
      title: title.value,
      description: description.value,
      fileId: fileId.value,
      type: type.value
    })
      .then((result) => {
        console.log(result)
        router.replace('/home')
      })
      .catch(() => {})
  }
}
const handleDelate = () => {
  imgUrl.value = ''
}
const route = useRoute()
onBeforeMount(() => {
  if (route.query.id) {
    let datas = route.query
    title.value = datas.title
    description.value = datas.description
    type.value = datas.type
    fileId.value = datas.fileId
    imgUrl.value = 'https://img.daysnap.cn/' + datas.imgUrl
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/sass/define.scss';

.section-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: url(@/assets/images/imagecreate.jpg);
  background-size: auto;
}
.upload-image {
  background-color: #f1f1f1;
  margin: j(30) j(20);
  padding: j(20) j(20) j(40);
  border-radius: j(20);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-content {
  height: j(40);
  border: 1px solid #ccc;
  border-radius: j(10);
  background-color: #fff;
  padding: 0 j(10);
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: j(14);
    margin-right: j(20);
  }
}
.type-content {
  white-space: nowrap;
  margin: j(20);
  .van-cell--clickable {
    border-radius: j(12);
  }
}
.image-descraption {
  margin-top: j(10);
  width: 80%;
  position: relative;
  display: flex;
  flex-direction: row;
  p {
    position: absolute;
    left: 0;
    top: j(-10);
    font-size: j(14);
  }
  textarea {
    width: 100%;
  }
}
.picture-detail {
  margin: j(20) 0;
  border-radius: j(8);
  outline: none;
  color: #000;
  font-size: j(14);
}
.image-content {
  margin-top: j(10);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: j(200);
  position: relative;
  span {
    position: absolute;
    left: j(60);
    top: j(60);
    width: j(80);
    height: j(20);
    line-height: j(20);
    font-size: j(16);
    border-radius: j(8);
    background-color: rgb(205, 198, 234);
    padding: j(10);
  }
  .image-box {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: j(10);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 90%;
    }
  }
}

.image-title {
  margin: j(10);
  display: flex;
  flex-direction: column;
  margin-top: j(20);
  p {
    font-size: j(14);
    color: #fff;
    padding-bottom: j(20);
  }
  input {
    padding: j(10);
    flex: 1;
    outline: none;
    background-color: #fff;
    color: #000000;
    border-radius: j(6);
  }
}

.button-group {
  margin-top: j(10);
  display: flex;
  justify-content: space-around;
  width: 100%;
  button {
    width: j(80);
    padding: j(10);
    font-size: j(16);
    border-radius: j(10);
    &:first-child {
      background-color: #ccc;
    }
    &:last-child {
      background-color: #ff6cb3;
      color: #fff;
    }
  }
}
.image-type {
  margin-top: j(20);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  label {
    padding-bottom: j(10);
  }
}
</style>
