<template>
  <div class="picture-scroll">
    <el-skeleton :loading="!images.length" animated>
      <template #template>
        <el-row :gutter="6" class="imgs-list animach" style="flex-wrap: nowrap">
          <el-col :span="24 / count" v-for="(img, index) in 4" :key="index">
            <el-skeleton-item
              variant="image"
              style="width: 100%; height: 210px"
            />
          </el-col>
        </el-row>
      </template>
      <template #default>
        <el-row
          :gutter="6"
          class="imgs-list"
          :style="moveStyle"
          @transitionend="transitionend"
          @mouseover="stopMove"
          @mouseout="startMove"
        >
          <el-col
            :span="24 / count"
            v-for="(img, index) in images"
            class="imgs-list__item"
            :key="index"
          >
            <img :src="img.url" :alt="img.alt" />
          </el-col>
          <el-col
            :span="24 / count"
            v-for="(img, index) in images"
            class="imgs-list__item"
            :key="index"
          >
            <img :src="img.url" :alt="img.alt" />
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, computed } from "vue";
const props = defineProps({
  images: {
    required: true,
    type: Array,
  },
  count: {
    type: Number,
    default: 4,
  },
});

const index = ref(0);
const isTransition = ref(true);
const moveStyle = computed(() => ({
  transform: `translateX(-${index.value * (100 / props.count)}%)`,
  transition: isTransition.value ? "transform 0.7s ease-in-out" : "none",
}));
let timer = null;
watch(
  () => props.images,
  () => {
    startMove();
  }
);
// 移动
function move() {
  isTransition.value = true;
  index.value++;
}
function transitionend() {
  // 移动到最后一张图片时，复位到第一张
  if (index.value + 1 > props.images.length) {
    isTransition.value = false;
    index.value = 0;
  }
}

// 停止滚动
function stopMove() {
  clearInterval(timer);
}

// 重新开始滚动
function startMove() {
  timer = setInterval(move, 1000);
}

onUnmounted(() => {
  stopMove();
});
</script>

<style lang="scss" scoped>
.picture-scroll {
  max-width: 100%;
  overflow: hidden;
}

@include b(imgs-list) {
  flex-wrap: nowrap;
  @include e(item) {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
