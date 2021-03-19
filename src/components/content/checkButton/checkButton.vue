<template>
  <div class="check-button" :class="{ checked: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "checkButton",
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 1px solid var(--color-tint);
}
.checked {
  background-color: var(--color-tint);
}
</style>
