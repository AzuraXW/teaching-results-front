<template>
  <div
    class="pdf-preview"
    v-loading="loading"
    element-loading-background="rgba(122, 122, 122, 0.8)"
    element-loading-text="pdf加载中..."
  >
    <div v-show="!isPdfLoadFailed">
      <div class="pdf-preview__wrapper">
        <el-scrollbar>
          <vue-pdf-embed
            :source="props.pdfUrl"
            :page="pdfState.pageNum"
            :style="scaleStyle"
            @loading-failed="pdfLoadingFailed"
            @loaded="pdfLoaded"
            ref="pdfRef"
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
          <div>/ {{ pdfState.numPages }}</div>
        </div>
        <div class="pdf-preview__tools__item">
          <span @click="zoomIn">放大</span>
        </div>
        <div class="pdf-preview__tools__item">
          <span @click="zoomOut">缩小</span>
        </div>
      </div>
    </div>

    <div class="pdf-preview__result" v-show="isPdfLoadFailed">
      <el-result
        icon="error"
        title="PDF 加载失败"
        sub-title="这可能是网络问题或者服务器错误所导致的"
      >
        <template #extra>
          <el-button type="primary" @click="refreshPage">刷新</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup>
import VuePdfEmbed from "vue-pdf-embed";
import { computed, ref, watch, watchEffect } from "vue";
import usePdf from "./usePdf";
const props = defineProps({
  pdfUrl: {
    required: true,
    type: String,
  },
});

const pdfUrl = ref(props.pdfUrl);
watch(
  () => props.pdfUrl,
  (newVal) => {
    pdfUrl.value = newVal;
  }
);
const { pdfLoaded, pdfLoadingFailed, loading, isPdfLoadFailed, pdfState } =
  usePdf(pdfUrl);

// 跳转上一页
function toPrev() {
  if (pdfState.pageNum === 1) return;
  pdfState.pageNum--;
}

// 跳转下一页
function toNext() {
  if (pdfState.pageNum >= pdfState.numPages) return;
  pdfState.pageNum++;
}
const scaleStyle = computed(() => `transform: scale(${pdfState.scale})`);
// 放大
function zoomIn() {
  if (pdfState.scale < 2) {
    pdfState.scale += 0.1;
  }
}

// 缩小
function zoomOut() {
  if (pdfState.scale > 1) {
    pdfState.scale -= 0.1;
  }
}

let inputPage = ref(pdfState.pageNum);
function changePage() {
  if (
    !/^\d+$/.test(inputPage.value) ||
    inputPage.value < 1 ||
    inputPage.value > pdfState.numPages
  ) {
    inputPage.value = 1;
    pdfState.pageNum = 1;
    return;
  }
  pdfState.pageNum = parseInt(inputPage.value);
}
watchEffect(() => {
  inputPage.value = pdfState.pageNum;
});

function refreshPage() {
  location.reload();
}
</script>

<style lang="scss" scoped>
@include b(pdf-preview) {
  :deep .el-loading-text {
    color: #fff;
  }
  position: relative;
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
  height: 1200px;
  overflow: hidden;
  /* padding: 20px 50px 120px 50px; */
  box-sizing: border-box;
  background: #f7f7f7;
  @include e(result) {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
  }
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
