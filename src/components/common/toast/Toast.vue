<template>
  <div class="toast" v-show="showMsg">
    <div>{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    msg: {
      type: String,
      default() {
        return "";
      },
    },
    showMsg: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  color: #fff;
  padding: 10px;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
