<template>
  <div class="c-aside">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include b(c-aside) {
  overflow: auto;
  width: 100px;
  height: 100%;
}
</style>
