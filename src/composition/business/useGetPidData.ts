import { CommonApi } from "@/api";
import { getUrlParam } from "@/utils";
import { useMainStore } from "@/pinia";

export function getBaseData() {
  const pid = getUrlParam("pid");
  if (!pid) return;
  return new Promise(async resolve => {
    const mainStore = useMainStore();
    mainStore.setPid(pid);
    const param = { pid: pid, url: window.location.href, ipLocation: "1" };
    let res = await CommonApi.pageIdLocation(param);
    mainStore.setCjData(res);
    resolve(res)
  })
}