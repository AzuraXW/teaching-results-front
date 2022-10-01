<template>
  <div class="pdf-preview__tools-inner">
    <div class="pdf-preview__tools-inner__item">
      <span @click="toPrev">上一页</span>
    </div>
    <div class="pdf-preview__tools-inner__item">
      <span @click="toNext">下一页</span>
    </div>
    <div
      class="pdf-preview__tools-inner__item pdf-preview__tools-inner__item--center"
    >
      <div style="margin-right: 25px">
        <el-input
          v-model="inputPage"
          size="small"
          @blur="changePage"
          :input-style="{
            width: '20px',
            textAlign: 'center',
            fontSize: '16px',
          }"
        />
      </div>
      <div>/ {{ props.total }}</div>
    </div>
    <div class="pdf-preview__tools-inner__item">
      <span @click="zoomIn">放大</span>
    </div>
    <div class="pdf-preview__tools-inner__item">
      <span @click="zoomOut">缩小</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const props = defineProps({
  pageNum: {
    required: true,
    type: Number,
  },
  scale: {
    required: true,
    type: Number,
  },
  total: {
    required: true,
    type: Number,
  },
});

const emits = defineEmits(["update:pageNum", "update:scale"]);

// 跳转上一页
function toPrev() {
  if (props.pageNum === 1) return;
  emits("update:pageNum", props.pageNum - 1);
}

// 跳转下一页
function toNext() {
  if (props.pageNum >= props.total) return;
  emits("update:pageNum", props.pageNum + 1);
}
// 放大
function zoomIn() {
  if (props.scale < 2) {
    emits("update:scale", props.scale + 0.1);
  }
}

// 缩小
function zoomOut() {
  if (props.scale > 1) {
    emits("update:scale", props.scale - 0.1);
  }
}

let inputPage = ref(props.pageNum);
function changePage() {
  if (
    !/^\d+$/.test(inputPage.value) ||
    inputPage.value < 1 ||
    inputPage.value > props.total
  ) {
    inputPage.value = 1;
    emits("update:pageNum", 1);
    return;
  }
  emits("update:pageNum", parseInt(inputPage.value));
}
watchEffect(() => {
  inputPage.value = props.pageNum;
});
</script>

<style lang="scss" scoped>
@include b(pdf-preview) {
  @include e(tools-inner) {
    height: 60px;
    background-color: #000;
    border-radius: 30px;
    background-color: rgb(66, 66, 66);
    padding: 0 40px;
    display: flex;
    align-items: center;
    color: #fff;
    @include e(item) {
      flex: 1;
      display: flex;
      justify-content: center;
      @include m(center) {
        display: flex;
        align-items: center;
      }
      span {
        display: block;
        color: #fff;
        padding: 10px;
        transition: all 0.4s;
        cursor: pointer;
        user-select: none;
        &:hover {
          color: #c6c6c6;
        }
      }
    }
  }
}
</style>
