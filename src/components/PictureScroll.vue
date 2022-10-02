<template>
    <div class="picture-scroll">
        <el-skeleton :loading="!imgsDate.length" animated>
            <template #template>
                <el-row gutter="6" class="imgs-list animach" style="flex-wrap: nowrap">
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
                        <img :src="img.url" :alt="img.alt" />
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
    time: {
        required: false,
        type: Number,
        default: 2000,
    }
});

// 滚动逻辑
let time;
let active = 1
let activeLim = 0
let interval = props.time > 700 ? props.time : 700
console.log(interval)
function initScroll() {
    if (!props.imgsDate.length) return
    activeLim = props.imgsDate.length
    let imgsListDom = document.querySelector('.imgs-list')
    let imgsItems = document.querySelectorAll('.imgs-list__item')
    if (props.imgsDate.length >= 4) {
        for (let i = 0; i < 4; i++) {
            let imgsItem = imgsItems[i].cloneNode(true)
            console.log(imgsItem)
            imgsListDom.appendChild(imgsItem)
        }
    } else if (props.imgsDate.length >= 2) {
        for (let v = 0; v < 3; v++) {
            for (let i = 0; i < activeLim; i++) {
                let imgsItem = imgsItems[i].cloneNode(true)
                imgsListDom.appendChild(imgsItem)
            }
        }
    } else {
        for (let i = 0; i < 5; i++) {
            let imgsItem = imgsItems[0].cloneNode(true)
            imgsListDom.appendChild(imgsItem)
        }
    }
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
        if (active > activeLim) {
            active = 1
        }
        let left = (active * 100) / 4
        Dom.classList.add('animach')
        Dom.style.transform = `translateX(-${left}%)`
        if (active >= activeLim) {
            setTimeout(() => {
                Dom.classList.remove('animach')
                Dom.style.transform = `translateX(-${0}%)`
            }, 700);
        }
        active++
    }, interval)
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

.animach {
    transition: transform 0.7s ease-in-out;
}

@include b(imgs-list) {
    @include e(item) {

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
  