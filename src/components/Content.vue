<template>
  <div class="page-content">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include b(page-content) {
  max-width: $content-width;
  margin: 0 auto;
}
</style>
