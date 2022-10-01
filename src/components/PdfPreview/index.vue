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
        <Tool
          v-model:pageNum="pdfState.pageNum"
          v-model:scale="pdfState.scale"
          :total="pdfState.numPages"
        ></Tool>
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
import { ref, watch, computed } from "vue";
import Tool from "./tool.vue";
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
const scaleStyle = computed(() => `transform: scale(${pdfState.scale});`);
function refreshPage() {
  location.reload();
}
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
  :deep .el-loading-text {
    color: #fff;
  }
  @include e(tools) {
    position: absolute;
    bottom: 30px;
    left: 50%;
    width: 70%;
    transform: translateX(-50%);
  }
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
}
@include b(vue-pdf-embed) {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  transform-origin: 0 0;
}
</style>
