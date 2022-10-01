import { ref, reactive, watch } from "vue";
import { createLoadingTask } from "vue3-pdfjs";
export default function (pdfUrl) {
  const loading = ref(true);
  const isPdfLoadFailed = ref(false);

  const pdfState = reactive({
    source: pdfUrl.value,
    pageNum: 1,
    scale: 1,
    numPages: 0,
  });

  // pdf 加载失败
  function pdfLoadingFailed() {
    isPdfLoadFailed.value = true;
    loading.value = false;
  }
  // pdf加载成功
  function pdfLoaded() {
    const loadingTask = createLoadingTask(pdfUrl.value);
    loadingTask.promise
      .then((pdf) => {
        pdfState.numPages = pdf.numPages;
      })
      .catch((err) => {
        console.log(err);
      });
    loading.value = false;
  }

  return {
    pdfLoaded,
    pdfLoadingFailed,
    loading,
    isPdfLoadFailed,
    pdfState,
  };
}
