import { isValidIDCard } from '@/utils/validate/idcard';
import { isMobile } from '@/utils/validate/mobile';

const Check = {
  checkName(value: string) {
    if (!value) return '请输入领卡姓名';
    if (/^[\u4e00-\u9fa5\\·]{2,20}$/.test(value)) return true;
    if (value.length < 2 || value.length > 20) return '姓名长度不能小于2或超过20';
    return '姓名必须为汉字';
  },
  checkPhone(value: string) {
    if (!value) return '请输入联系电话';
    if (isMobile(value)) return true;
    return '请输入正确的手机号码';
  },
  checkIDCard(value: string) {
    if (!value) return '请输入身份证号';
    if (isValidIDCard(value)) return true;
    return '请输入正确的身份证号码';
  },
  checkAddress(value: string) {
    if (!value) return '请输入详细地址';
    //地址信息不得含特殊字符
    const roadReg = /^[\u4E00-\u9FA5A-Za-z0-9/\\_—()（）-]+$/gi;
    if (!roadReg.test(value)) return '地址信息不得含特殊字符哟';
    const roadReg2 = /^[A-Za-z0-9]+$/gi;
    if (roadReg2.test(value)) return '地址信息不得纯为英文字母或数字哟';
    if (value.length < 4) return '地址不能太短哟';
    return true;
  },
};
export default Check;
