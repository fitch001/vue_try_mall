<template>
  <main-tabbar></main-tabbar>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Detail">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import mainTabbar from "components/content/mainTabbar/mainTabbar.vue";
export default {
  components: { mainTabbar },
  name: "App",
};
</script>
<style>
@import url("./assets/css/base.css");
</style>
