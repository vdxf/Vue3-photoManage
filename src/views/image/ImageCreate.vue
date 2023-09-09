<template>
  <div class="section-content">
    <van-nav-bar title="上传图片" left-arrow @click-left="handleColse" />
    <div class="upload-image">
      <label class="image-content">
        <vs-image :src="imgUrl" alt="img" v-if="imgUrl" />
        <div class="image-null" v-else>
          <p>请选择要上传的图片</p>
          <img src="@/assets/images/imageUpload.jpg" alt="img" />
        </div>
        <input type="file" @change="handleFiles" style="opacity: 0" />
      </label>
      <div class="title-content" v-if="imgUrl">
        <p>图片标题</p>
        <input type="text" placeholder="请输入图片的标题" v-model="title" />
      </div>
      <div class="type-content" v-if="title">
        <van-field
          v-model="fieldValue"
          is-link
          readonly
          label="选择图片类型"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
      </div>
      <div class="image-descraption" v-if="fieldValue">
        <p>请填写对图片的描述：</p>
        <textarea class="picture-detail" style="resize: none" rows="6" v-model="description">
        </textarea>
      </div>
      <button type="submit" class="c-button" @click="handleUploadImage" v-if="description">
        发布
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { doFile, doGain, doUpdata } from '@/api'
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const title = ref<any>('')
const description = ref<any>('')
const type = ref<any>('')
const fileId = ref<any>('')
const files = ref('')
const imgUrl = ref('')

const fieldValue = ref('')
const showPicker = ref(false)
const columns = [
  { text: '公开的', value: 'public' },
  { text: '私密的', value: 'private' }
]
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false
  fieldValue.value = selectedOptions[0].text
  type.value = selectedOptions[0].value
}

const handleColse = () => {
  router.go(-1)
}
const handleFiles = (event: any) => {
  files.value = event.target.files
  let formData = new FormData()
  formData.append('file', files.value[0])

  doFile(formData)
    .then((result) => {
      fileId.value = result.id
      imgUrl.value = 'https://img.daysnap.cn/' + result.filepath
    })
    .catch((error) => {
      alert(error.data.msg)
    })
}
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
      .catch((error) => {
        alert(error.data.msg)
      })
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
      .catch((error) => {
        alert(error.data.msg)
      })
  }
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
  margin-top: j(30);
  padding: j(10);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
}
.image-null {
  width: 100%;
  p {
    font-size: j(14);
    margin-bottom: j(20);
  }
}
.title-content {
  margin: j(20);
  padding: j(10);
  width: 100%;
  display: flex;
  flex-direction: row;
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

.choose-image {
  margin-top: j(50);
  padding: j(10);
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    color: #fff;
    font-size: j(14);
    white-space: nowrap;
  }
  img {
    margin-left: j(30);
    display: block;
    width: 100%;
    height: 100%;
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

.image-button-group {
  display: flex;
  flex-direction: column;
  margin: j(10);
  p {
    font-size: j(14);
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
.image-descraption {
  display: flex;
  flex-direction: column;
  margin: j(10);
  p {
    font-size: j(14);
  }
}
.picture-detail {
  margin: j(20) 0;
  border-radius: j(8);
  outline: none;
  color: #000;
  font-size: j(14);
}
</style>
