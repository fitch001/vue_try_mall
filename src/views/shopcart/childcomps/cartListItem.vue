<template>
  <div class="list-item">
    <div class="item-selector">
      <check-button
        :isChecked="products.checked"
        @click="checkClick"
      ></check-button>
    </div>
    <div class="item-img">
      <img :src="products.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ products.title }}</div>
      <div class="item-desc">{{ products.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">{{ "￥" + products.price }}</div>
        <div class="item-count right">x{{ products.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/checkButton.vue";
export default {
  name: "cartListItem",
  props: {
    products: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    checkClick() {
      this.$store.commit("CHANGE_CHECK", this.products.iid);
    },
  },
  components: {
    CheckButton,
  },
};
</script>
<style scoped>
.list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
}
</style>
