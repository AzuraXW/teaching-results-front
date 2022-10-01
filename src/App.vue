<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header></Header>
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
  <Footer></Footer>
</template>

<style scoped lang="css">
.fade-enter-active {
  transition: all 1s ease-out;
  transition-delay: 0.2s;
}
.fade-leave-active {
  transition: all 0.2s ease-out;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
/* .fade-enter-to,
.fade-leave-from {
  opacity: 1;
} */
</style>
