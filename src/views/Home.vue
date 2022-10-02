<template>
  <content style="padding: 30px 0">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-skeleton
          style="width: 100%; height: 100%"
          :loading="!banners.length"
          animated
        >
          <template #template>
            <el-skeleton-item
              variant="image"
              style="width: 100%; height: 100%"
            />
          </template>
          <template #default>
            <el-carousel height="100%">
              <el-carousel-item v-for="item in banners" :key="item">
                <img :src="item.url" />
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-skeleton>
      </el-col>
      <el-col :span="16">
        <ColumnContainer
          title="成果简介"
          :title-style="{
            background: 'rgb(0, 155, 46)',
          }"
        >
          <el-skeleton
            :throttle="500"
            :loading="!introduction.content"
            animated
          >
            <template #template>
              <div style="display: flex; justify-content: flex-end">
                <el-skeleton-item
                  variant="text"
                  style="margin-bottom: 10px; width: 95%"
                />
              </div>

              <el-skeleton-item variant="text" style="margin-bottom: 10px" />
              <el-skeleton-item variant="text" style="margin-bottom: 10px" />
              <el-skeleton-item variant="text" style="margin-bottom: 10px" />
              <el-skeleton-item variant="text" style="width: 80%" />
            </template>
            <template #default>
              <div class="introduction">
                {{ introduction.content }}
              </div>
            </template>
          </el-skeleton>
        </ColumnContainer>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 25px">
      <el-col :span="6">
        <ColumnContainer
          title="科学总结"
          :title-style="{
            background: 'rgb(0, 155, 46)',
          }"
        >
          <ColumnList :list-data="articles"></ColumnList>
        </ColumnContainer>
      </el-col>
      <el-col :span="6">
        <ColumnContainer
          title="成果视频"
          :title-style="{
            background: 'rgb(238, 155, 0)',
          }"
        >
          <ColumnList :list-data="articles"></ColumnList>
        </ColumnContainer>
      </el-col>
      <el-col :span="6">
        <ColumnContainer
          title="申请书"
          :title-style="{
            background: 'rgb(195, 0, 202)',
          }"
        >
          <ColumnList :list-data="articles"></ColumnList>
        </ColumnContainer>
      </el-col>
      <el-col :span="6">
        <ColumnContainer
          title="申请书"
          :title-style="{
            background: 'rgb(0, 84, 240)',
          }"
        >
          <ColumnList :list-data="articles"></ColumnList>
        </ColumnContainer>
      </el-col>
    </el-row>
    <el-row style="margin-top: 25px">
      <el-col :span="24">
        <h2 style="margin-bottom: 10px">获奖荣誉</h2>
        <PictureScroll :images="honors" :time="1500"></PictureScroll>
      </el-col>
    </el-row>
  </content>
</template>

<script setup>
import { ref } from "vue";
import { getBanner } from "../api/banner";
import { getIntroduction } from "@/api/introduction";
import { getArticle } from "@/api/article";
import { getHonors } from "@/api/honors";
import ColumnContainer from "../components/ColumnContainer.vue";
import ColumnList from "../components/ColumnList.vue";
import PictureScroll from "../components/PictureScroll.vue";
const banners = ref([]);
getBanner().then((res) => {
  banners.value = res.data;
});
let articles = ref([]);
getArticle().then((res) => {
  articles.value = res.data;
});
// 获取成果简介
let introduction = ref("");
getIntroduction().then((res) => {
  introduction.value = res.data;
});
let honors = ref([]);
getHonors().then((res) => {
  honors.value = res.data;
});
</script>

<style lang="scss" scoped>
:deep .el-carousel {
  height: 100%;
}
// 成果简介
@include b(introduction) {
  line-height: 2em;
  text-indent: 2em;
  font-size: 14px;
}
</style>
