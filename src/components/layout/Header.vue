<template>
  <div class="c-header">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include b(c-header) {
  background-color: #000;
  @include m(fixed) {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
