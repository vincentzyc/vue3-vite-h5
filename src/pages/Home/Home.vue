<template>
  <div class="wrapper">
    <img src="@/assets/img/home/header.jpg" alt="靓号抢购" class="widthfull" />
    <CountDown class="mg-b10" />
    <div class="form-wrapper">
      <BaseForm animteBtn />
    </div>
    <MarqueeSingle class="mg10" />
    <img src="@/assets/img/home/img1.jpg" alt="产品说明" class="widthfull" />
    <img src="@/assets/img/home/img2.jpg" alt="产品说明" class="widthfull" />
    <div class="text-center expenses-wrap">
      <span class="expenses-text" @click="showExpenses()">
        <img src="@/assets/img/home/img4.jpg" alt="资费详情说明" class="widthfull" />
      </span>
    </div>
    <van-popup class="agreement-popup" v-model:show="show" round>
      <div class="agreement-wrap">{{ expensesText }}</div>
      <div class="agreement-confirm" @click="close()">我知道了</div>
    </van-popup>
    <img alt="领卡流程" class="widthfull" v-lazy="img3" />
  </div>
</template>

<script setup lang="ts">
import { expensesText } from "./static-data";
import img3 from "@/assets/img/home/img3.jpg";
import { getBaseData } from "@/composition/business/useGetPidData";

let show = ref(false);
function showExpenses() {
  show.value = true;
}
function close() {
  show.value = false;
}
getBaseData();
</script>
