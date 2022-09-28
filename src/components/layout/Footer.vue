<template>
  <div class="c-footer">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include b(c-footer) {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
