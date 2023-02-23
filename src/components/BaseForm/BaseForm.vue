<template>
  <div class="form-wrap">
    <FormName id="custName" v-model="formData.custName"></FormName>
    <FormPhone id="contactNumber" v-model="formData.contactNumber"></FormPhone>
    <div v-show="showOtherForm && formData.showForm">
      <FormIDCard id="idCardNo" v-model="formData.idCardNo"></FormIDCard>
      <FormCity v-model="formData.addressArr" id="addressArr" :locationCity="mainStore.locationCity"></FormCity>
      <FormAddress id="address" v-model="formData.address"></FormAddress>
    </div>
    <img
      v-if="animteBtn"
      src="@/assets/img/home/button.png"
      alt="提交按钮"
      class="breathlamp widthfull"
      @click="submitOrder()"
    />
    <van-button
      @click="submitOrder()"
      type="primary"
      block
      round
      class="submit-button"
      color="linear-gradient(#eb4e4b,#e30023)"
      v-else
      >立即领取</van-button
    >
    <Agreement title="填写并提交视为阅读并同意" :agrList="agrList" v-model:checked="checked" />
  </div>
</template>

<script lang="ts" setup>
import Check from "@/utils/business/form-check";
import { useMainStore } from "@/pinia";
import { showToast } from "vant";
import { closeLoading, openLoading } from "@/utils/loading";
import { CommonApi } from "@/api";
import { checkOut } from "@/composition/business/useVerifyData";
import { reportMatomo } from "@/utils/report";
import "./style.less";

const FormCity = defineAsyncComponent(() => import("@/components/FormItem/FormCity.vue"));

const toutiaoDefaultLink = "https://h5.lipush.com/h5/index.html?id=2021080216415100047"; // M001

const gdtDefaultLink = "https://h5.lipush.com/h5/index.html?id=3804505262428528861"; // M002

defineProps<{
  animteBtn?: boolean;
}>();

const emits = defineEmits<{
  (e: "submit"): void;
}>();

const mainStore = useMainStore();

const formData = reactive({
  addressArr: [],
  showForm: false,
  custName: "",
  city: "",
  district: "",
  province: "",
  address: "",
  contactNumber: "",
  idCardNo: "",
});

let checked = ref(true),
  agrList = ref([
    {
      title: "《个人信息保护政策》",
      text: "https://h5.lipush.com/h5/index.html?id=5523261663728019648",
    },
    {
      title: "《入网许可协议》",
      text: "https://h5.lipush.com/h5/index.html?id=4554931263728179465",
    },
    {
      title: "《单独同意书》",
      text: "https://h5.lipush.com/h5/index.html?id=7883210563728253535",
    },
  ]);

const showOtherForm = computed(() => {
  if (formData.showForm) return true;
  if (Check.checkPhone(formData.contactNumber) === true) {
    formData.showForm = true;
    return true;
  }
  return false;
});

watch(
  () => formData.addressArr,
  newValue => {
    if (Array.isArray(newValue) && newValue.length === 3) {
      formData.city = newValue[1];
      formData.district = newValue[2];
      formData.province = newValue[0];
    }
  }
);

const submitOrder = async () => {
  var tip = checkOut(formData); //校验页面信息
  if (tip !== true) {
    showToast(tip);
    return false;
  }
  checked.value = true;

  openLoading("正在提交");
  const params = {
    url: window.location.href || "",
    pageId: mainStore.cjData?.pageId || "",
    pid: mainStore.pid || "",
    productCode: mainStore.cjData?.productCode || "",
    ...formData,
  };
  reportMatomo("点击提交按钮");
  emits("submit");
  // 调接口提交
  let res = await CommonApi.submitForm<Record<string, any>>(params);
  reportMatomo("提交接口返回", JSON.stringify(res));
  if (res.responseCode === "0") {
    successCallback({ resData: res, mediaCode: mainStore.cjData?.mediaCode });
  } else {
    const newParam = { pid: params.pid, url: window.location.href };
    let newRes = await CommonApi.pageIdLocation(newParam);
    mainStore.setCjData(newRes);
    closeLoading();
    showToast(res.msg);
  }
};

async function successCallback(resData: Record<string, any>) {
  let realLink = "";
  setTimeout(() => {
    closeLoading();
    if (resData?.url) {
      realLink = resData.url;
    } else if (resData.mediaCode === "M002") {
      realLink = gdtDefaultLink;
    } else {
      realLink = toutiaoDefaultLink;
    }
    window.location.href = realLink;
  }, 300);
}
</script>
