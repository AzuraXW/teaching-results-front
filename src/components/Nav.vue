<template>
  <div class="navbar">
    <Content>
      <nav class="navbar__nav">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/">申报书</RouterLink>
        <RouterLink to="/">成果报告</RouterLink>
        <RouterLink to="/">成果视频</RouterLink>
        <RouterLink to="/">成果应用</RouterLink>
        <RouterLink to="/">支撑材料</RouterLink>
      </nav>
    </Content>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Content from './Content.vue'
</script>

<style lang="scss" scoped>
@include b(navbar) {
  background-color: $color-primary;

  @include e(nav) {
    display: flex;

    a {
      display: block;
      font-size: $nav-link-size;
      color: #fff;
      line-height: 50px;
      height: 50px;
      flex: 1;
      text-align: center;
      position: relative;
      margin: 0 6px;

      &:not(:last-child)::after {
        content: '';
        border-left: 1px solid #fff;
        height: 50%;
        background: #fff;
        position: absolute;
        right: -6px;
        top: 14px;
      }

      &:hover {
        background-color: $color-hover;
      }
    }
  }
}
</style>
