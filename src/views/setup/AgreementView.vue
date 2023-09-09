<template>
  <div class="user-agree">
    <van-nav-bar title="用户协议" left-arrow @click-left="handleBack" />
    <div class="info">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab debitis rerum, odio suscipit
      mollitia deserunt laboriosam voluptatem magnam perspiciatis facilis quam, beatae rem illo quo,
      possimus cupiditate inventore recusandae repellat? Nisi, similique? Quibusdam temporibus
      aliquid similique enim quaerat libero repellendus veritatis et nobis itaque reprehenderit
      saepe ut debitis, iure vitae commodi atque, ipsum eius architecto ea expedita error odit at
      numquam? Aut, neque? Id temporibus laborum aspernatur vitae. Adipisci modi neque autem!
      Dolores consequuntur non cum delectus dolorem exercitationem alias commodi at eos itaque,
      porro numquam dolor obcaecati et repellendus ipsum placeat laboriosam fugiat, deleniti,
      consectetur molestias cumque sapiente? Ut perferendis voluptates esse iste vero architecto
      dolores porro animi? Voluptas nesciunt eligendi soluta? Ut nobis harum consectetur eligendi
      autem mollitia odio magni! Quos facere quas cumque amet debitis perspiciatis doloribus, qui
      libero voluptates fugiat aperiam nihil necessitatibus labore voluptas dolore laudantium ipsum
      corrupti illo eligendi molestias nemo laudantium odit. Maiores soluta veritatis iusto aperiam
      provident earum distinctio labore et deserunt repudiandae ex omnis vero libero alias earum ad
      dolore sequi fuga. Voluptas exercitationem voluptatem eligendi nostrum deleniti culpa
      temporibus, maxime quas. Distinctio mollitia tempora nulla voluptate aspernatur adipisci omnis
      temporibus minima, assumenda rerum eius dolorum placeat ad cumque quam consequuntur a, earum
      voluptates sapiente? Reprehenderit corrupti impedit deleniti accusantium. Est ratione corrupti
      quasi quos vero deserunt consequuntur quae itaque optio vitae unde natus architecto
      temporibus, ipsam voluptates asperiores distinctio harum! Nisi et fugit temporibus incidunt
      laudantium modi eius voluptas necessitatibus at, distinctio commodi minus facere culpa placeat
      a quod cumque unde saepe quam atque minima ipsam. Dolore quo vitae eum voluptatem soluta odio,
      labore ea dolorem necessitatibus adipisci eius saepe asperiores iste quibusdam. Quis,
      cupiditate obcaecati delectus animi vero nam suscipit laborum nobis impedit eaque consectetur
      assumenda excepturi dignissimos doloribus dolor tempora voluptate quam accusamus dicta
      veritatis. Expedita nam cupiditate debitis eum adipisci velit maxime eveniet enim repudiandae
      voluptatum amet quas atque, magnam voluptatem quaerat nostrum voluptatibus laborum quasi et
      excepturi quo nulla facere qui ullam. Explicabo reprehenderit excepturi delectus harum id
      sapiente cumque eius voluptas quaerat ipsum nemo placeat sit, sunt quia eum officia. Neque,
      libero! Facilis, sit necessitatibus? Expedita autem ullam, atque vitae nesciunt voluptates
      libero blanditiis asperiores aliquam accusamus aut maiores enim fugit officia. Delectus
      tenetur quasi officiis aspernatur placeat aut, id, hic deleniti eius ad dolor sed accusamus
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const handleBack = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/define.scss';
.user-agree {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.info {
  margin: j(10);
}
</style>
