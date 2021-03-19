<template>
  <tabbar>
    <tabbaritem path="/home">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/home.svg" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tabbaritem>

    <tabbaritem path="/category">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/category.svg" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/category_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tabbaritem>

    <tabbaritem path="/shopcart">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/shopcart.svg" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/shopcart_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tabbaritem>

    <tabbaritem path="/profile">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tabbaritem>
  </tabbar>
</template>

<script>
import tabbar from "components/common/tabbar/tabbar.vue";
import tabbaritem from "components/common/tabbar/tabbaritem.vue";
export default {
  name: "mainTabbar",
  components: {
    tabbar,
    tabbaritem,
  },
};
</script>

