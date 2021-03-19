<template>
  <div id="home">
    <!-- 导航栏组件 -->
    <navbar class="nav-bar">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </navbar>
    <!-- 分页按钮  吸顶用 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @clickTab="getTab"
      ref="tabControl1"
      class="tabControlTop"
      v-show="isTabFixed"
    ></tab-control>
    <!-- 为首页设置better scroll -->
    <!-- better-scroll 插件必须设置父元素的高度 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @position="scrollPosition"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图组件 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!-- 分页按钮 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @clickTab="getTab"
        ref="tabControl2"
      ></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 回到顶部组件 -->
    <back-top @click="backClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendView from "./childcomps/RecommendView.vue";
import FeatureView from "./childcomps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import navbar from "components/common/navbar/navbar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/Scroll/Scroll.vue";
import backTop from "components/content/backTop/backTop.vue";
import { debounce } from "common/utils";

export default {
  components: {
    navbar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    backTop,
  },
  name: "home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      tab: "pop",
      showBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  // 当页面创建时调用这个函数
  created() {
    // 请求基本数据
    this.getHomeMultidata1();

    // 请求商品数据
    this.getHomeGoods1("pop");
    this.getHomeGoods1("new");
    this.getHomeGoods1("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.tab].list;
    },
  },
  methods: {
    // 调用Create函数
    getHomeMultidata1() {
      // 1. 请求基本数据
      getHomeMultidata().then((res) => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        // console.log(this.banners);
        // console.log(this.recommends);
      });
    },
    // 调用create函数中
    getHomeGoods1(type) {
      // 请求商品数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type, 1).then((res) => {
        // console.log(res.data.data);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        // console.log(this.goods);
      });
    },
    // 根据点击tab切换tab数据
    getTab(index) {
      switch (index) {
        case 1:
          this.tab = "new";
          break;
        case 0:
          this.tab = "pop";
          break;
        case 2:
          this.tab = "sell";
          break;
      }
      // 同步两个不同的tab样式
      this.$refs.tabControl1.currentindex = index;
      this.$refs.tabControl2.currentindex = index;
    },
    // 返回顶部函数
    backClick() {
      // 通过$refs.scroll直接拿到scroll组件中的data.scroll
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 通过监听位置属性来设置是否显示返回顶部按钮
    scrollPosition(position) {
      // console.log(position);
      // 判断是否显示返回顶部按钮
      this.showBackTop = Math.abs(position.y) > 1000;

      // 决定tabControl 是否吸顶，采用position: fixed
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
    },

    // 监听上拉加载事件 加载更多数据
    loadMore() {
      this.getHomeGoods1(this.tab);
      // 上拉加载结束
      this.$refs.scroll.finishPullUp();
    },
    // 监听轮播图是否加载完成
    swiperImageLoad() {
      // 获取tab-bar的位置数据，offsetTop
      // 所有的组件都有一个属性  $el  用于获取组件中的元素
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500);

    // 事件总线bug
    // this.$bus.$on("itemImageLoad", () => {
    //   refresh();
    // });
  },
  // 缓存页面激活后调用
  activated() {
    // 将页面跳转到离开时的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 1);
    this.$refs.scroll.refresh();
  },
  // 离开当前缓存页面后调用
  deactivated() {
    // 保存离开时的位置
    this.saveY = this.$refs.scroll.scroll.y;
  },
};
</script>


<style scoped>
#home {
  height: calc(100vh - 49px);
  position: relative;
  /* padding-top: 44px;
  padding-bottom: 50px; */
}
.nav-bar {
  color: white;
  background: var(--color-tint);
}
.tabControlTop {
  position: relative;
  z-index: 9;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
