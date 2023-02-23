<template>
  <div class="marquee-single flex">
    <ul class="scroll-wrapper">
      <li
        v-for="(text, i) in scrollList"
        :class="['flex', 'align-middle', 'scroll-item', { anim: animate && i === 0 }]"
        :style="{ marginTop: animate && i === 0 ? '-1rem' : '' }"
      >
        <span :class="['userimg', 'flex-none', text.sex === 'man' ? 'man' : 'woman']"></span>
        <span class="scroll-text txtover">{{ text.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import "./style.less";
let animate = ref(false);

let animateTimeId: NodeJS.Timeout;
let scrollTimeId: NodeJS.Timeout;

const scrollList = ref([
  {
    text: "李**抢得靓号 1305678****",
    sex: "man",
  },
  {
    text: "蔡**抢得靓号 1308288****",
    sex: "man",
  },
  {
    text: "张**抢得靓号 1326668****",
    sex: "woman",
  },
  {
    text: "罗**抢得靓号 1665688****",
    sex: "woman",
  },
  {
    text: "林**抢得靓号 1556688****",
    sex: "man",
  },
  {
    text: "周**抢得靓号 1306566****",
    sex: "woman",
  },
]);

const scroll = () => {
  if (animate.value) return;
  clearTimeout(animateTimeId);
  animate.value = true;
  animateTimeId = setTimeout(() => {
    scrollList.value.push(scrollList.value[0]);
    scrollList.value.shift();
    animate.value = false;
  }, 500);
};

onBeforeUnmount(() => {
  clearInterval(scrollTimeId);
  clearTimeout(animateTimeId);
});

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    scrollTimeId = setInterval(scroll, 2000);
  }, 10);
});
</script>
