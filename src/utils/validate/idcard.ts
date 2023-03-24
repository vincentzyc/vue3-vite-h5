/**
 * 校验身份证格式是否正确
 * @param num 身份证
 * @returns true-校验通过，string-校验不通过信息
 */
export function isIDCardNum(num: string) {
  if (num.length != 18) return '输入的身份证号长度不对，或者号码不符合规定！';

  num = num.toUpperCase();
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
    return '输入的身份证号长度不对，或者号码不符合规定！';
  }
  //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  //下面分别分析出生日期和校验位
  const re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
  const arrSplit = num.match(re);
  let bGoodDay;
  if (arrSplit) {
    //检查生日日期是否正确
    const dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
    bGoodDay =
      dtmBirth.getFullYear() == Number(arrSplit[2]) &&
      dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
      dtmBirth.getDate() == Number(arrSplit[4]);
  }

  if (!bGoodDay) {
    return '输入的身份证号里出生日期不对！';
  } else {
    //检验18位身份证的校验码是否正确。
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let nTemp = 0,
      i;
    for (i = 0; i < 17; i++) {
      nTemp += parseFloat(num.slice(i, i + 1)) * arrInt[i];
    }
    const valnum = arrCh[nTemp % 11];
    if (valnum != num.slice(17, 18)) {
      return '18位身份证的校验码不正确！';
    }
    return true;
  }
}
