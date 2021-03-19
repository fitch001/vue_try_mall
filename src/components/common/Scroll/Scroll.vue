<template>
  <div class="wrapper" ref="scroll_wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      scroll: null,
      pagePosition: {},
    };
  },
  mounted() {
    // 创建better scroll对象
    this.scroll = new BScroll(this.$refs.scroll_wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
      observeDOM: true,
      observeImage: true,
      mouseWheel: true,
    });
    // this.scroll.refresh();

    // 监听滚动位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.pagePosition = position;
      this.$emit("position", position);
    });
    // 监听上拉到底事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  updated() {
    // 保证在每一次更新时刷新滚动高度
    this.scroll.refresh();
  },
  methods: {
    // 滚动事件
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    },
    // 上拉加载结束事件
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    // 刷新scroll高度事件
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style>
</style>
