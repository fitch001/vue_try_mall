<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="" @load="imgLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImg() {
      //  ||两边交换位置会报错，原因不明
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    // 监听图片的加载情况

    // 事件总线有bug
    // imgLoad() {
    //   // 通过事件总线$bus提交
    //   this.$bus.$emit("itemImgLoad");
    // },

    itemClick() {
      // console.log(123);
      // if ("iid" in this.goodsItem ) {
        this.$router.push("/Detail/" + this.goodsItem.iid);
      // } else if ("item_id" in this.goodsItem) {
      //   this.$router.push("/Detail/" + this.goodsItem.item_id);
      // }
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
