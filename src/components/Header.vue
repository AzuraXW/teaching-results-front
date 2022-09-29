<template>
  <header class="header">
    <div class="header__content">
      <div class="header__content__logo">logo</div>
      <div class="header__content__name">name</div>
    </div>
  </header>
  <Nav></Nav>
</template>

<script setup>
import Nav from './Nav.vue'
</script>

<style lang="scss" scoped>
@include b(header) {
  background-color: #1189de;

  @include e(content) {
    height: 179px;
    max-width: $content-width;
    display: flex;
    align-items: center;
    margin: 0 auto;
    font-size: 36px;

    @include e(logo) {
      margin-right: 26px;
    }

    @include e(name) {}
  }
}
</style>
