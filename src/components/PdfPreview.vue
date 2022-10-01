<template>
  <div class="pdf-preview">
    <div class="pdf-preview__wrapper">
      <el-scrollbar>
        <vue-pdf-embed
          :source="state.source"
          :page="state.pageNum"
          :style="scaleStyle"
          class="vue-pdf-embed"
        ></vue-pdf-embed>
      </el-scrollbar>
    </div>

    <div class="pdf-preview__tools">
      <div class="pdf-preview__tools__item">
        <span @click="toPrev">上一页</span>
      </div>
      <div class="pdf-preview__tools__item">
        <span @click="toNext">下一页</span>
      </div>
      <div class="pdf-preview__tools__item pdf-preview__tools__item--center">
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
        <div>/ {{ state.numPages }}</div>
      </div>
      <div class="pdf-preview__tools__item">
        <span @click="zoomIn">放大</span>
      </div>
      <div class="pdf-preview__tools__item">
        <span @click="zoomOut">缩小</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs";
import { reactive, onMounted, computed, ref, watch, watchEffect } from "vue";
const props = defineProps({
  pdfUrl: {
    required: true,
    type: String,
  },
});

const state = reactive({
  source: props.pdfUrl,
  pageNum: 1,
  scale: 1,
  numPages: 0,
});

const loadingTask = createLoadingTask(state.source);
loadingTask.promise.then((pdf) => {
  state.numPages = pdf.numPages;
});

// 跳转上一页
function toPrev() {
  if (state.pageNum === 1) return;
  state.pageNum--;
}

// 跳转下一页
function toNext() {
  if (state.pageNum >= state.numPages) return;
  state.pageNum++;
}
const scaleStyle = computed(() => `transform: scale(${state.scale})`);
// 放大
function zoomIn() {
  if (state.scale < 2) {
    state.scale += 0.1;
  }
}

// 缩小
function zoomOut() {
  if (state.scale > 1) {
    state.scale -= 0.1;
  }
}

let inputPage = ref(state.pageNum);
function changePage() {
  if (
    !/^\d+$/.test(inputPage.value) ||
    inputPage.value < 1 ||
    inputPage.value > state.numPages
  ) {
    inputPage.value = 1;
    state.pageNum = 1;
    return;
  }
  state.pageNum = parseInt(inputPage.value);
}
watchEffect(() => {
  console.log("effect");
  inputPage.value = state.pageNum;
});
</script>

<style lang="scss" scoped>
@include b(pdf-preview) {
  position: relative;
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
  height: 1200px;
  overflow: hidden;
  /* padding: 20px 50px 120px 50px; */
  box-sizing: border-box;
  background: #f7f7f7;
  @include e(wrapper) {
    margin: 50px;
    overflow: auto;
  }
  @include e(tools) {
    position: absolute;
    bottom: 30px;
    width: 70%;
    height: 60px;
    background-color: #000;
    left: 50%;
    border-radius: 30px;
    background-color: rgb(66, 66, 66);
    transform: translateX(-50%);
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
@include b(vue-pdf-embed) {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  transform-origin: 0 0;
}
</style>
