<template>
  <div class="detail">
    <!-- 导航栏 -->
    <detail-navbar
      class="detail-nav"
      @navClick="navClick"
      ref="nav"
    ></detail-navbar>
    <!-- betterscroll 滚动条 -->
    <scroll
      class="scroll"
      :probe-type="3"
      :pull-up-load="true"
      ref="scroll"
      @position="scrollPosition"
    >
      <!-- 顶部轮播图 -->
      <detail-swiper :imgSrc="topImgs"></detail-swiper>
      <!-- 商品简介 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺详情 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详情 -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <!-- 商品参数 -->
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <!-- 商品评论 -->
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <!-- 推荐商品 -->
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <!-- 回到顶部组件 -->
    <back-top @click="backClick" v-show="showBackTop"></back-top>
    <!-- 底部菜单 -->
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

    <!-- 购物车加入弹窗 -->
    <toast :msg="msg" :showMsg="showMsg" ref="toast"></toast>
  </div>
</template>

<script>
import DetailNavbar from "./childComps/DetailNavbar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommends,
} from "network/detail.js";
import { debounce } from "common/utils.js";
import Scroll from "components/common/Scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/backTop.vue";
import Toast from "../../components/common/toast/Toast.vue";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImgs: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      navTopY: [],
      getNavTopY: null,
      currentIndex: 0,
      showBackTop: false,
      msg: "",
      showMsg: false,
    };
  },
  mixins: [],
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast,
  },

  created() {
    // 请求 单个商品的id
    this.iid = this.$route.params.iid;

    // 根据iid请求商品数据
    getDetail(this.iid).then((res) => {
      const data = res.data.result;
      // console.log(data);
      // 1. 获取顶部的图片轮播数据
      this.topImgs = res.data.result.itemInfo.topImages;
      // console.log(this.topImgs);

      // 2. 获取商品详细信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3. 创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4. 获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 5. 保存商品的参数数据
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6. 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 请求推荐数据
    getRecommends().then((res) => {
      // console.log(res);
      this.recommends = res.data.data.list;
    });

    // 设置封装的请求navbar各个位置的函数
    // 对给navtop赋值的操作进行防抖
    this.getNavTopY = debounce(() => {
      this.navTopY = [];
      // 商品信息
      this.navTopY.push(0);
      // 参数信息
      this.navTopY.push(this.$refs.params.$el.offsetTop);
      // 评论信息
      this.navTopY.push(this.$refs.comment.$el.offsetTop);
      // 推荐信息
      this.navTopY.push(this.$refs.recommend.$el.offsetTop);
      // 为方便判断，在位置数组最后加入一个最大值
      this.navTopY.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50);

    // bus总线   有bug
    // this.bus.$on("itemImageLoad", () => {
    //   refresh();
    // });
  },
  methods: {
    // 点击添加到购物车
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImgs[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 2. 将商品添加到购物车里面
      this.$store
        .dispatch("addCart", product)
        // 回调promise函数,添加之后返回值
        .then((res) => {
          // console.log(res);
          // 显示添加完成的信息
          this.showMsg = true;
          this.msg = res;
          // 延迟1秒后隐藏
          setTimeout(() => {
            this.showMsg = false;
            this.msg = "";
          }, 1000);
        });
    },
    // 返回顶部函数
    backClick() {
      // 通过$refs.scroll直接拿到scroll组件中的data.scroll
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 图片监控
    imageLoad() {
      // 图片加载完成后刷新当前页面
      debounce(this.$refs.scroll.refresh());
      // console.log(this.$refs.scroll);
      // 当图片加载完成后获取导航栏各部分跳转的位置
      this.getNavTopY();
    },
    // 导航栏点击跳转
    navClick(index) {
      this.$refs.scroll.scrollTo(0, -this.navTopY[index], 200);
    },
    // scroll的滚动位置
    scrollPosition(position) {
      // 判断是否显示返回顶部按钮
      this.showBackTop = Math.abs(position.y) > 1000;
      // 定义当前滚动的位置
      const positionY = Math.abs(position.y);
      // 判断条件：
      // 当positionY 在0和index1 之间  使currentIndex = 0
      // 当positionY 大于等于index1且小于index2  使currentIndex = 1
      // 当positionY 大于等于index2且小于index3  使currentIndex = 2
      // 当positionY 大于等于index3  使currentIndex = 3

      // for (let i = 0; i < this.navTopY.length; i++) {
      // if (
      //   this.currentIndex !== i &&
      //   ((i < this.navTopY.length - 1 &&
      //     positionY >= this.navTopY[i] &&
      //     positionY < this.navTopY[i + 1]) ||
      //     (i === this.navTopY.length - 1 && positionY >= this.navTopY[i]))
      // ) {
      //   this.currentIndex = i;
      //   this.$refs.nav.currentIndex = this.currentIndex;
      // }
      // }

      // 逆for循环
      // for (let i = this.navTopY.length - 1; i >= 0; i--) {
      //   if (
      //     this.currentIndex !== i - 1 &&
      //     positionY < this.navTopY[i] &&
      //     positionY >= this.navTopY[i - 1]
      //   ) {
      //     this.currentIndex = i - 1;
      //     console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      // 正for循环
      for (let i = 0; i < this.navTopY.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.navTopY[i] &&
          positionY < this.navTopY[i + 1]
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
  },
};
</script>

<style scoped>
.detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}

.scroll {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
</style>
