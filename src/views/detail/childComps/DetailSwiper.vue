<template>
  <swiper class="myswiper">
    <swiper-item v-for="item in imgSrc">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  props: {
    imgSrc: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperItem,
  },
  name: "DetailSwiper",
};
</script>

<style scoped>
.myswiper {
  height: 300px;
  overflow: hidden;
}
</style>
