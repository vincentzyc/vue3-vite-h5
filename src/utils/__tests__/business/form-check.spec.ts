import Check from '../../business/form-check';

describe('checkName', () => {
  test('checkName: 输入为空值的情况', () => {
    expect(Check.checkName('')).toEqual('请输入领卡姓名');
  });
  test('checkName: 输入为英文的情况', () => {
    expect(Check.checkName('Tom')).toEqual('姓名必须为汉字');
  });
  test('checkName: 输入为数字的情况', () => {
    expect(Check.checkName('123')).toEqual('姓名必须为汉字');
  });
  test('checkName: 输入为包含英文、数字和汉字的情况', () => {
    expect(Check.checkName('张三abc123')).toEqual('姓名必须为汉字');
  });
  test('checkName: 输入为包含·的汉字的情况', () => {
    expect(Check.checkName('赵·钱孙')).toEqual(true);
  });

  test('checkName: 输入为特殊字符的情况', () => {
    expect(Check.checkName('!@#')).toEqual('姓名必须为汉字');
  });
  test('checkName: 输入长度小于2的情况', () => {
    expect(Check.checkName('张')).toEqual('姓名长度不能小于2或超过20');
  });
  test('checkName: 输入长度大于20的情况', () => {
    expect(Check.checkName('李四一二三四五六七八九十一二三四五六七八九十')).toEqual('姓名长度不能小于2或超过20');
  });
  test('checkName: 输入为不包含·的汉字的情况', () => {
    expect(Check.checkName('张三')).toEqual(true);
  });
});

describe('checkPhone', () => {
  test('checkPhone: 输入为空值的情况', () => {
    expect(Check.checkPhone('')).toEqual('请输入联系电话');
  });
  test('checkPhone: 输入格式不正确的手机号码的情况', () => {
    expect(Check.checkPhone('12345678910')).toEqual('请输入正确的手机号码');
  });
});

describe('checkIDCard', () => {
  test('checkIDCard: 输入为空值的情况', () => {
    expect(Check.checkIDCard('')).toEqual('请输入身份证号');
  });
  test('checkIDCard: 输入格式不正确的身份证号的情况', () => {
    expect(Check.checkIDCard('12345678910')).toEqual('请输入正确的身份证号码');
  });
});

describe('checkAddress', () => {
  test('checkAddress: 输入为空值的情况', () => {
    expect(Check.checkAddress('')).toEqual('请输入详细地址');
  });
  test('checkAddress: 输入含有特殊字符的情况', () => {
    expect(Check.checkAddress('北京市海淀区中关村大街12号#3楼503室')).toEqual('地址信息不得含特殊字符哟');
  });
  test('checkAddress: 输入纯为英文字母或数字的情况', () => {
    expect(Check.checkAddress('1234567890abcdefg')).toEqual('地址信息不得纯为英文字母或数字哟');
  });
  test('checkAddress: 输入长度小于4的情况', () => {
    expect(Check.checkAddress('中关村')).toEqual('地址不能太短哟');
  });
  test('checkAddress: 输入只含汉字的情况', () => {
    expect(Check.checkAddress('北京市海淀区中关村大街12号3楼503室')).toEqual(true);
  });
  test('checkAddress: 输入只含英文字母和数字的情况', () => {
    expect(Check.checkAddress('Beijing12号RoadRoom503')).toEqual(true);
  });
  test('checkAddress: 输入含有反斜杠/和下划线_的情况', () => {
    expect(Check.checkAddress('No42Street_17\\')).toEqual(true);
  });
  test('checkAddress: 输入含有括号的情况', () => {
    expect(Check.checkAddress('医院名称（科室名称）3楼G座')).toEqual(true);
  });
});
