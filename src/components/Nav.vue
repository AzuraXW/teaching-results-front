<template>
  <div class="navbar">
    <content>
      <nav class="navbar__nav">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink
          :to="{
            name: 'show',
            params: {
              id: nav.id,
            },
          }"
          v-for="nav in columns"
          :key="nav.id"
          >{{ nav.name }}</RouterLink
        >
      </nav>
    </content>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { getColumn } from "../api/column";
import { ref } from "vue";
const columns = ref([]);
getColumn().then((res) => {
  columns.value = res.data;
});
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
        content: "";
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
      &.router-link-exact-active {
        background-color: $color-hover;
      }
    }
  }
}
</style>
