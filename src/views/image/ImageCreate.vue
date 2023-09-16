<template>
  <div class="section-content">
    <van-nav-bar title="上传图片" left-arrow @click-left="router.go(-1)" />
    <div class="upload-content">
      <div class="title-content item">
        <van-cell title="图片标题">
          <van-field v-model.trim="title" placeholder="请输入图片的标题" />
        </van-cell>
      </div>
      <div class="type-content item">
        <van-cell title="图片类型">
          <van-field v-model="fieldValue" is-link readonly @click="showPicker = true" />
          <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
          </van-popup>
        </van-cell>
      </div>
      <div class="image-descraption item">
        <van-cell title="图片详细信息">
          <van-field
            is-link
            readonly
            :placeholder="description"
            @click="router.replace('/detail')"
          />
        </van-cell>
      </div>
      <div class="image-content item">
        <van-cell title="上传文件" />
        <label class="image-box">
          <span v-if="!imgUrl">选择图片 +</span>
          <div class="image-choose">
            <vs-image :src="imgUrl" alt="img" v-if="imgUrl" />
          </div>
          <input type="file" @change="handleFiles" style="opacity: 0" />
        </label>
      </div>
      <div class="button-group">
        <button @click="handleDelate">取消</button>
        <button @click="handleUploadImage" v-if="!route.query.id">发布</button>
        <button @click="handleUploadImage" v-else>更新</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ImageCreate'
}
</script>
<script setup lang="ts">
import VsImage from '@/components/commont/VsImage.vue'
import { doFile, doGain, doUpdata } from '@/api'
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onActivated } from 'vue'

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
//上传图片
const handleFiles = async (event: any) => {
  files.value = event.target.files
  let formData = new FormData()
  formData.append('file', files.value[0])

  const res = await doFile(formData)
  await handleDelate()
  setTimeout(() => {
    fileId.value = res.id
    imgUrl.value = res.filepath
  })
}
//创建 / 更新
const handleUploadImage = async () => {
  if (route.query.id) {
    await doUpdata({
      title: title.value,
      description: description.value,
      fileId: fileId.value,
      type: type.value,
      id: route.query.id
    })
  } else {
    await doGain({
      title: title.value,
      description: description.value,
      fileId: fileId.value,
      type: type.value
    })
  }
  router.replace('/home')
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
onActivated(() => {
  if (route.query.description) {
    description.value = route.query.description
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/sass/define.scss';

.section-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.upload-content {
  margin-top: j(20);
  background-color: #fff;
  flex: 1;
  .item {
    border-top: 1px solid #ddd;
  }
}
.van-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    flex: 1;
  }
}
.type-content {
  display: flex;
  align-items: center;
}
.image-descraption {
  display: flex;
  align-items: center;
  textarea {
    border: 1px solid #ccc;
  }
}
.image-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: j(300);
}
.image-box {
  width: 90%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: j(10);
  position: relative;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: j(80);
    height: j(20);
    line-height: j(20);
    font-size: j(16);
    border-radius: j(8);
    background-color: #ff6cb3;
    color: #fff;
    padding: j(10);
  }
}
.image-choose {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 90%;
  }
}

.button-group {
  margin-top: j(20);
  display: flex;
  justify-content: space-around;
  width: 100%;
  button {
    width: j(80);
    padding: j(10);
    font-size: j(16);
    border-radius: j(10);
    &:first-child {
      color: #000;
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
