<template>
  <div class="c-layout" :class="{ 'c-layout--horizontal': props.horizontal }">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  horizontal: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
@include b(c-layout) {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  @include m(horizontal) {
    flex-direction: row;
  }
}
</style>
