<template>
  <div class="bootom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="service">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="shop">店铺</span>
      </div>
      <div>
        <i class="icon collect"></i>
        <span class="collec">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    // 点击添加到购物车
    addToCart(){
      // 发送事件到父组件
      this.$emit('addToCart')
    }
  },
};
</script>

<style scoped>
.bootom-bar {
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  text-align: center;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
}
.bar-left {
  font-size: 12px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 5px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0 /100%;
}
.bar-left .service {
  background-position: 0 -52px;
}
.bar-left .shop {
  background-position: 0 -98px;
}
.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 50px;
}
.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}
.bar-right .buy {
  background-color: #f69;
}
</style>
