import { isIDCardNum } from '../../validate/idcard';

describe('身份证号验证函数测试', () => {
  it('身份证号长度不对应该返回错误', () => {
    const result = isIDCardNum('123456');
    if (result !== '输入的身份证号长度不对，或者号码不符合规定！') {
      throw new Error(`期望输出'输入的身份证号长度不对，或者号码不符合规定！'，实际输出${result}`);
    }
  });

  it('输入的身份证号里出生日期码不正确应该返回错误', () => {
    const result = isIDCardNum('110105200006014114');
    if (result !== '18位身份证的校验码不正确！') {
      throw new Error(`期望输出'18位身份证的校验码不正确！'，实际输出${result}`);
    }
  });

  it('18位身份证的校验码不正确应该返回错误', () => {
    const result = isIDCardNum('110105200006010116');
    if (result !== '18位身份证的校验码不正确！') {
      throw new Error(`期望输出'18位身份证的校验码不正确！'，实际输出${result}`);
    }
  });

  it('正确的身份证号应该返回true', () => {
    const result = isIDCardNum('110101199003078777');
    if (result !== true) {
      throw new Error(`期望输出true，实际输出${result}`);
    }
  });
});
