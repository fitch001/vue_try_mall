<template>
  <div class="bottom-bar">
    <!-- 全选按钮 -->
    <div class="check-all">
      <check-button
        class="check-button"
        :isChecked="isCheckedAll"
        @click="clickAll"
      ></check-button>
      <span>全选</span>
    </div>
    <!-- 合计 -->
    <div class="totle-price">合计:{{ totlePrice }}</div>
    <!-- 去结算 -->
    <div class="buy">去结算({{ itemCount }})</div>
  </div>
</template>

<script>
import checkButton from "components/content/checkButton/checkButton.vue";
export default {
  components: { checkButton },
  name: "CartBottomBar",
  methods: {
    // 点击全选
    clickAll() {
      if (this.isCheckedAll) {
        this.$store.commit("CHECKED_ALL_FALSE");
        // this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.commit("CHECKED_ALL_TRUE");
        // this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
  computed: {
    // 判断全选状态
    isCheckedAll() {
      // 当没有数据时不选中
      if (this.$store.state.cartList.length == 0) {
        return false;
      }
      // 查找是否有未选中的商品
      // 1.   filter()
      // return (
      //   this.$store.state.cartList.filter((item) => {
      //     return !item.checked;
      //   }).length === 0
      // );
      // 2.find()查找是否有未选中的，有则find()返回true，再取反返回false
      // return !this.$store.state.cartList.find(item => !item.checked)
      // 3. every()查找对象数组中是否所有元素都被选中，是则返回true
      return this.$store.state.cartList.every((item) => item.checked);
    },
    // 计算总价格
    totlePrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },

    // 计算总共有多少个商品
    itemCount() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  display: flex;
}
.check-all {
  display: flex;
  align-items: center;
}
.check-button {
  width: 18px;
  height: 18px;
  line-height: 20px;
}
.totle-price {
  margin-left: 50px;
  flex: 1;
}
.buy {
  text-align: center;
  width: 90px;
  background: var(--color-tint);
  color: white;
}
</style>
