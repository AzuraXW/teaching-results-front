<template>
  <div class="">
    <el-carousel height="400px">
      <el-carousel-item v-for="item in banners" :key="item">
        <img :src="item.url" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getBanner } from '../api/banner'
const banners = ref([])
getBanner().then(res => {
  banners.value = res.data
  console.log(banners)
})
</script>

<style lang="scss" scoped>

</style>
