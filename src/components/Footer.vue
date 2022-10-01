<template>
  <div class="footer">
    <Content>
      <div class="footer__info">
        <div class="footer__info__item">
          <p>
            <span>单位名称：</span>
            <span>{{ data.organization }}</span>
          </p>
          <p>
            <span>单位地址：</span>
            <span>{{ data.address }}</span>
          </p>
          <p>
            <span>邮编：</span>
            <span>{{ data.zip }}</span>
          </p>
        </div>
        <div class="footer__info__item">
          <p>
            <span>联系方式：</span>
            <span>{{ data.contact }}</span>
          </p>
          <p>
            <span>备案号：</span>
            <span>{{ data.recordnumber }}</span>
          </p>
        </div>
      </div>
    </Content>
    <div class="footer__info__copyright">
      <content>
        <p>
          Copyright © 2016. Graduate student enrollment of University of
          Electronic Science and Technology of China
        </p>
        <p>版权所有 © 2016 电子科技大学研究生招生办</p>
      </content>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import Content from "./Content.vue";
import { getFooterData } from "../api/footer";
const data = ref({});
getFooterData().then((res) => {
  data.value = res.data;
});
</script>

<style lang="scss" scoped>
@include b(footer) {
  background-color: #185ea6;
  background-image: linear-gradient(to right, #5e0289, #185ea6);

  @include e(info) {
    display: flex;
    padding: 25px 0;
    font-size: 14px;

    @include e(item) {
      flex: 1;

      p {
        &:nth-child(2) {
          margin: 20px 0;
        }

        color: #fff;
      }
    }

    @include e(copyright) {
      padding: 22px 0;
      border-top: 1px solid #7a64b5;

      p {
        color: #bfbfbf;
        text-align: center;
      }
    }
  }
}
</style>
