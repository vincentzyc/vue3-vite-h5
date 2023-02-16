import { createApp } from 'vue'
import App from './App.vue'
import '@vant/touch-emulator' //vant 桌面端适配
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import '@/assets/css/base.css'
import '@/assets/css/main.less'

createApp(App).mount('#app')