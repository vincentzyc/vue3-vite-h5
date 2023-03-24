interface AgeRange {
  min: number;
  max: number;
}

type AreaCodes = { [index: string]: string };

// 地区编码表
const areaCodes: AreaCodes = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外',
};

function isAreaCodeValid(areaCode: string, areaCodes: AreaCodes, allowedAreas?: string[]): boolean {
  if (allowedAreas) {
    return areaCodes.hasOwnProperty(areaCode) && allowedAreas.includes(areaCode);
  } else {
    return areaCodes.hasOwnProperty(areaCode);
  }
}

function isBirthDateValid(year: number, month: number, day: number, ageRange?: AgeRange): boolean {
  const birthDate = new Date(year, month, day);
  const currentDate = new Date();

  if (ageRange) {
    const age =
      currentDate.getFullYear() -
      birthDate.getFullYear() -
      (currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
        ? 1
        : 0);

    if (age < ageRange.min || age > ageRange.max) {
      return false;
    }
  }

  return birthDate.getFullYear() === year && birthDate.getMonth() === month && birthDate.getDate() === day;
}

function isCheckCodeValid(idNumber: string): boolean {
  const weightCoefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCodeList = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idNumber.charAt(i), 10) * weightCoefficient[i];
  }

  const checkCode = checkCodeList[sum % 11];
  return checkCode === idNumber.charAt(17).toUpperCase();
}

/**
 * 校验身份证格式是否正确
 * @param idNumber 身份证
 * @param ageRange 年龄
 * @param allowedAreas 地区
 * @returns true 或 false
 */
function isValidIDCard(idNumber: string, ageRange?: AgeRange, allowedAreas?: string[]): boolean {
  const len = idNumber.length;
  if (len !== 15 && len !== 18) {
    return false;
  }

  const areaCode = idNumber.substring(0, 2);
  if (!isAreaCodeValid(areaCode, areaCodes, allowedAreas)) {
    return false;
  }

  const birthYear =
    len === 15 ? 1900 + parseInt(idNumber.substring(6, 8), 10) : parseInt(idNumber.substring(6, 10), 10);
  const birthMonth = parseInt(idNumber.substring(len === 15 ? 8 : 10, len === 15 ? 10 : 12), 10) - 1;
  const birthDay = parseInt(idNumber.substring(len === 15 ? 10 : 12, len === 15 ? 12 : 14), 10);

  if (!isBirthDateValid(birthYear, birthMonth, birthDay, ageRange)) {
    return false;
  }

  if (len === 15) {
    return true;
  }

  return isCheckCodeValid(idNumber);
}

export { isValidIDCard };
// 使用示例
// const testID1 = "44010619800101201X"; // 二代身份证
// const testID2 = "440106800101201";    // 一代身份证

// const ageRange: AgeRange = { min: 18, max: 60 }; // 校验年龄在 18 到 60 岁之间
// const allowedAreas: string[] = ['11', '12'];    // 只允许北京和天津的地区编码

// console.log(isValidIDCard(testID1, ageRange, allowedAreas)); // 输出：true 或 false
// console.log(isValidIDCard(testID2, ageRange, allowedAreas)); // 输出：true 或 false
