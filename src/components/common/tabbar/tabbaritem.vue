<template>
  <div @click="itemClick" class="tab-bar-item">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

    <!-- <img src="../../assets/img/tabbar/home.svg" alt="" />
    <div>首页</div> -->
  </div>
</template>

<script scoped>
export default {
  name: "tabbaritem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: false,
    };
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
  computed: {
    isActive() {
      return !this.$route.path.indexOf(this.path);
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  font-size: 14px;
}

.tab-bar-item img {
  margin-top: 3px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
}

.active {
  color: activeColor;
}
</style>
