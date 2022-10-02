<template>
  <div
    class="pdf-preview"
    v-loading="loading"
    element-loading-background="rgba(122, 122, 122, 0.8)"
    element-loading-text="pdf加载中..."
    ref="pdfRef"
  >
    <template v-if="!isPdfLoadFailed">
      <div class="pdf-preview__wrapper">
        <el-scrollbar>
          <vue-pdf-embed
            :source="props.pdfUrl"
            :page="pdfState.pageNum"
            :style="scaleStyle"
            @loading-failed="pdfLoadingFailed"
            @loaded="pdfLoaded"
            ref="pdfEmbedRef"
            class="vue-pdf-embed"
          ></vue-pdf-embed>
        </el-scrollbar>
      </div>

      <div class="pdf-preview__tools">
        <Tool
          v-model:pageNum="pdfState.pageNum"
          v-model:scale="pdfState.scale"
          :total="pdfState.numPages"
          :suspend="isFullscreen"
        ></Tool>
      </div>
    </template>

    <div class="pdf-preview__result" v-else>
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
    <div class="pdf-preview__tools-button">
      <el-button circle @click="download">
        <el-icon><Download /></el-icon>
      </el-button>
      <el-button circle @click="toggle">
        <el-icon>
          <FullScreen></FullScreen>
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import VuePdfEmbed from "vue-pdf-embed";
import { ref, watch, computed, onMounted } from "vue";
import Tool from "./tool.vue";
import usePdf from "./usePdf";
import { FullScreen, Download } from "@element-plus/icons-vue";
import { useFullscreen } from "@vueuse/core";

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

const pdfRef = ref(); // 外层包裹元素
const pdfEmbedRef = ref(); // pdf组件实例
const { isFullscreen, toggle } = useFullscreen(pdfRef);

onMounted(() => {
  pdfRef.value.addEventListener("fullscreenchange", () => {
    // 切换全屏模式时重新渲染pdf
    pdfEmbedRef.value.render();
    pdfState.scale = 1;
  });
});

function download() {
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = props.pdfUrl;
  link.setAttribute("download", "testfile.pdf");
  document.body.appendChild(link);
  link.click();
}
</script>

<style lang="scss" scoped>
@include b(pdf-preview) {
  position: relative;
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
  height: 1200px;
  padding-bottom: 50px;
  overflow: hidden;
  /* padding: 20px 50px 120px 50px; */
  box-sizing: border-box;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  :deep(.el-loading-text) {
    color: #fff;
  }
  @include e(tools) {
  }
  @include e(result) {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
  }
  @include e(wrapper) {
    margin: 50px;
    flex: 1;
    overflow: auto;
  }
  @include e(tools-button) {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
@include b(vue-pdf-embed) {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  transform-origin: 0 0;
}
</style>
