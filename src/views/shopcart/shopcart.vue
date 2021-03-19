<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <navbar class="cart-navbar">
      <template v-slot:center>
        <div>购物车({{ cartLength }})</div>
      </template>
    </navbar>

    <!-- 商品的列表 -->
    <cart-list></cart-list>

    <!-- 底部的汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import { mapGetters } from "vuex";
import CartList from "./childcomps/cartList.vue";
import CartBottomBar from "./childcomps/CartBottomBar.vue";
export default {
  components: {
    navbar,
    CartList,
    CartBottomBar,
  },
  name: "shopcart",
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>
<style scoped>
.cart-navbar {
  color: white;
  background: var(--color-tint);
}
</style>
