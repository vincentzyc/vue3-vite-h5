import { PageIdLocation } from '@/api/types/common';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    counter: 0,
    pid: '',
    cjData: null as PageIdLocation | null,
  }),
  getters: {
    doubleCount: state => state.counter * 2,
    doubleCountPlusOne(): number {
      return this.doubleCount * 2 + 1;
    },
    locationCity: state => [state.cjData?.province || '', state.cjData?.city || ''],
  },
  actions: {
    setPid(payload: string) {
      this.pid = payload;
    },
    setCjData(payload: PageIdLocation | null) {
      this.cjData = payload;
    },
    reset() {
      this.counter = 0;
    },
  },
});
