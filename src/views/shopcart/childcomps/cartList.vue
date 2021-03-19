<template>
  <!-- 可滚动的内容 -->

  <div class="cart-list">
    <scroll
      class="scroll"
      :probe-type="3"
      :pull-up-load="true"
      ref="scroll"
    >
      <div class="scroll-content">
        <cart-list-item
          v-for="(item, index) in cartList"
          :key="index"
          :products="item"
        >
        </cart-list-item>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/Scroll/Scroll.vue";
import { mapGetters } from "vuex";
import CartListItem from "./cartListItem.vue";
export default {
  components: {
    Scroll,
    CartListItem,
  },
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  mounted() {
    this.$refs.scroll.refresh();
  },
  updated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 40px - 49px - 44px);
}
.scroll {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 89px;
  overflow: hidden;
}
</style>
