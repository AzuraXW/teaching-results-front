<template>
  <div class="c-main">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include b(c-main) {
  flex: 1;
}
</style>
