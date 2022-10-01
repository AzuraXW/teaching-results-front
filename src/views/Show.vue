<template>
  <content style="padding: 30px 0">
    <el-row :gutter="35">
      <el-col :span="5">
        <div class="content">
          <div class="content__title">申报书</div>
          <ul class="content__list">
            <li v-for="item in contentData" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>
      </el-col>

      <el-col :span="19">
        <div class="article">
          <div class="article__header">
            <h2 class="article__header__title">成果介绍</h2>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">申报书</a></el-breadcrumb-item>
              <el-breadcrumb-item>成果介绍</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="article__content">
            <PdfPreview :pdf-url="url"></PdfPreview>
          </div>
        </div>
      </el-col>
    </el-row>
  </content>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { getColumnContent } from "../api/column";
import PdfPreview from "../components/PdfPreview.vue";
import url from "../assets/test.pdf";
const contentData = ref([]); // 目录
getColumnContent().then((res) => {
  console.log(res.data);
  contentData.value = res.data;
});
</script>

<style lang="scss" scoped>
@include b(content) {
  @include e(title) {
    color: #fff;
    background-color: $color-primary;
    height: 75px;
    line-height: 75px;
    font-weight: bold;
    padding-left: 25px;
    font-size: 22px;
    color: #fff;
  }
  @include e(list) {
    background-color: #f7f7f7;
    padding: 15px;
    li {
      height: 50px;
      line-height: 50px;
      color: $text-color;
      font-size: 14px;
      margin: 0 10px;
    }
  }
}
@include b(article) {
  @include e(header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
  }
}
</style>
