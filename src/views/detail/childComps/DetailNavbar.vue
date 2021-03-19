<template>
  <div>
    <navbar>
      <template v-slot:left>
        <div class="nav-img" @click="back">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template v-slot:center>
        <div class="titles">
          <div
            v-for="(item, index) in titles"
            class="title-item"
            :class="{ color: index === currentIndex }"
            @click="itemClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </navbar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
export default {
  components: { navbar },
  name: "DetailNavbar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("navClick", index);
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.titles {
  display: flex;
}

.title-item {
  flex: 1;
}
.color {
  color: var(--color-high-text);
}
.nav-img img {
  margin-top: 11px;
}
</style>
