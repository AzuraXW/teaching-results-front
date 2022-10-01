<template>
    <div class="picture-scroll">
        <el-skeleton :loading="!imgsDate.length" animated>
            <template #template>
                <el-row gutter="6" class="imgs-list" style="flex-wrap: nowrap">
                    <el-col :span="6">
                        <el-skeleton-item variant="image" style="width: 100%; height: 210px" />
                    </el-col>
                    <el-col :span="6">
                        <el-skeleton-item variant="image" style="width: 100%; height: 210px" />
                    </el-col>
                    <el-col :span="6">
                        <el-skeleton-item variant="image" style="width: 100%; height: 210px" />
                    </el-col>
                    <el-col :span="6">
                        <el-skeleton-item variant="image" style="width: 100%; height: 210px" />
                    </el-col>
                </el-row>
            </template>
            <template #default>
                <el-row gutter="6" class="imgs-list" style="flex-wrap: nowrap">
                    <el-col :span="6" v-for="(img,index) in imgsDate" class="imgs-list__item" :key="index">
                        <img :src="img.url" alt="img.alt" />
                    </el-col>
                </el-row>
            </template>

        </el-skeleton>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
const props = defineProps({
    imgsDate: {
        required: true,
        type: Array,
    },
});

// 滚动逻辑
let time;
let active = 1
let activeLim = 0
function initScroll() {
    if (!props.imgsDate.length) return
    activeLim = Math.floor(props.imgsDate.length / 4) * 4
    let imgsListDom = document.querySelector('.imgs-list')
    Scroll(imgsListDom)

    // 鼠标移入停止
    imgsListDom.addEventListener("mouseenter", () => {
        clearInterval(time);
    });
    imgsListDom.addEventListener("mouseleave", () => {
        Scroll(imgsListDom)
    });
}

// 滚动
function Scroll(Dom) {
    time = setInterval(() => {
        if (active >= activeLim - 1) {
            active = 0
        }
        let left = (active * 100) / 4
        Dom.style.transform = `translateX(-${left}%)`
        active++
    }, 2000)
}
watch(() => props.imgsDate, async () => {
    clearTimeout(time)
    await nextTick()
    initScroll()
})
onMounted(() => {
    clearInterval(time)
    initScroll()
})
onUnmounted(() => {
    clearInterval(time)
}) 
</script>
  
<style lang="scss" scoped>
.picture-scroll {
    max-width: 100%;
    overflow: hidden;
}

@include b(imgs-list) {
    transition: transform 0.7s ease-in-out;

    @include e(item) {

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
  