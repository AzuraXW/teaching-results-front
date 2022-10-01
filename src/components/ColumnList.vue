<template>
  <el-skeleton
    :rows="5"
    :throttle="500"
    :loading="listData.length === 0"
    animated
  >
    <template #template>
      <el-skeleton-item variant="text" style="margin-bottom: 10px" />
      <el-skeleton-item variant="text" style="margin-bottom: 10px" />
      <el-skeleton-item variant="text" style="margin-bottom: 10px" />
      <el-skeleton-item variant="text" style="margin-bottom: 10px" />
      <el-skeleton-item variant="text" />
    </template>
    <template #default>
      <ul class="column-list">
        <li class="column-list__item" v-for="item in listData" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </template>
  </el-skeleton>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  listData: {
    required: true,
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
@include b(column-list) {
  @include e(item) {
    margin: 10px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 10px;
    position: relative;
    font-size: 14px;
    &::after {
      content: "";
      position: absolute;
      width: 2px;
      height: 8px;
      background: rgb(0, 155, 46);
      left: 0;
      top: 5px;
    }
  }
}
</style>
