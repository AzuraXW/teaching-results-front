<template>
  <div class="column-show">
    <div class="column-show__header">
      <div class="column-show__header__title" :style="titleStyle">
        <span>{{ props.title }}</span>
      </div>
      <div class="column-show__header__more">
        <el-button link
          >更多<el-icon><DArrowRight /></el-icon
        ></el-button>
      </div>
    </div>
    <div class="column-show__main">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  titleStyle: {
    required: true,
    type: String,
  },
});
</script>

<style lang="scss" scoped>
@include b(column-show) {
  border: 1px solid rgb(223, 223, 223);

  @include e(header) {
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include e(title) {
      padding: 12px 20px;
      color: #fff;
      font-size: 19px;
    }
    @include e(more) {
      display: flex;
      align-items: center;
    }
  }
  @include e(main) {
    padding: 20px;
    color: $color-gray;
  }
}
</style>
