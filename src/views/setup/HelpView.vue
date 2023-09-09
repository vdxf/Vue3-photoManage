<template>
  <div class="user-agree">
    <van-nav-bar title="帮助" left-arrow @click-left="handleBack" />
    <div class="info">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab debitis rerum, odio suscipit
      mollitia deserunt laboriosam voluptatem magnam perspiciatis facilis quam, beatae rem illo quo,
      ea nam repudiandae. Praesentium facilis id mollitia repudiandae voluptatem aliquam optio
      autem, bea quis labore, quas nihil quos atque nemo voluptatum ex ratione esse sint neque
      itaque velit? Consequatur deserunt assumenda, ipsa adipisci, amet vel provident esse minus
      ducimus vero rem sit commodi dignissimos, recusandae accusantium eum consectetur odit quae
      temporibus. Accusamus adipisci doloremque, quos, qui itaque illum nesciunt, eius quasi id
      laboriosam ipsum atque tenetur mollitia accusantium ex aperiam impedit repellat. Asperiores
      quos molestias, ea impedit temporibus deserunt eius nihil iste doloremque deleniti quam fuga
      repellendus consectetur harum illum cupiditate praesentium enim magnam nemo, qui rem aliquid
      quibusdam ab! Officiis laudantium voluptates reiciendis neque, ex nisi aliquam molestiae
      maxime, facere praesentium temporibus molestias nemo voluptatem totam blanditiis consequuntur
      ipsa rerum adipisci consectetur corrupti veniam et. Consequatur consequuntur sapiente quas
      suscipit, nobis est perferendis. Reprehenderit ea velit delectus nihil, non fugit minus at
      quidem fugiat dolore eius cum quae itaque architecto, quibusdam sapiente voluptatem hic eaque
      in dolores temporibus est consectetur. Saepe exercitationem voluptatum quaerat sequi molestiae
      unde, doloribus ex dolores. Dignissimos aperiam nulla mollitia quaerat? Neque non id
      accusantium voluptatum maxime aliquid, libero natus reprehenderit error necessitatibus!
      Reprehenderit natus alias, quis expedita sunt quae!
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
