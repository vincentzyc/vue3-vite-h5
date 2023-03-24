import { isIDCardNum } from '@/utils/validate/idcard';

function validateIDCard(v: string) {
  //判断身份证号格式
  if (isIDCardNum(v) !== true) return '请输入正确的身份证号码';
  // const year = new Date().getFullYear();
  // const month = new Date().getMonth() + 1;
  // const day = new Date().getDate();
  // const birYear = parseInt(v.substr(6, 4));
  // const birMonth = parseInt(v.substr(10, 2));
  // const birDay = parseInt(v.substr(12, 2));
  // const age = year - birYear;

  // if (age < 16) return '年龄需大于等于16周岁才可办理';
  // if (age === 16) {
  //   if (month < birMonth) return '年龄需大于等于16周岁才可办理';
  //   if (month === birMonth && day < birDay) return '年龄需大于等于16周岁才可办理';
  // }
  // if (age > 51) return '年龄需小于等于51周岁才可办理';
  // if (age === 51) {
  //   if (month > birMonth) return '年龄需小于等于51周岁才可办理';
  //   if (month === birMonth && day > birDay) return '年龄需小于等于51周岁才可办理';
  // }
  return true;
}

const Check = {
  checkName(value: string) {
    if (!value) return '请输入领卡姓名';
    if (/^[\u4e00-\u9fa5\\·]{2,20}$/.test(value)) return true;
    if (value.length < 2 || value.length > 20) return '姓名长度不能小于2或超过20';
    return '姓名必须为汉字';
  },
  checkPhone(value: string) {
    if (!value) return '请输入联系电话';
    if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) return true;
    return '请输入正确的手机号码';
  },
  checkIDCard(value: string) {
    if (!value) return '请输入身份证号';
    return validateIDCard(value);
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
  city(value: string) {
    if (!value) return '请选择收货城市';
    return true;
  },
};
export default Check;
