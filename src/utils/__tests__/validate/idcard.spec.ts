import { isValidIDCard } from '../../validate/idcard';

describe('isValidIDCard', () => {
  it('应当对有效的15位身份证号码返回true', () => {
    expect(isValidIDCard('110101891111123')).toBe(true);
  });

  it('应当对有效的18位身份证号码返回true', () => {
    expect(isValidIDCard('362426197610014321')).toBe(true);
  });

  it('应当对有效的18位身份证号码最后一位为X返回true', () => {
    expect(isValidIDCard('34052419800101001X')).toBe(true);
  });

  it('应当对区域码不正确的身份证号码返回false', () => {
    expect(isValidIDCard('990101198901010012')).toBe(false);
  });

  it('应当对出生日期超过范围的身份证号码返回false', () => {
    expect(isValidIDCard('110101201001018984')).toBe(false);
  });

  it('应当对校验码不正确的身份证号码返回false', () => {
    expect(isValidIDCard('110101198911111231')).toBe(false);
  });

  it('应当对指定允许的区域码正确的身份证号码返回true', () => {
    expect(isValidIDCard('310101199003077472', undefined, ['31'])).toBe(true);
  });

  it('应当对指定禁止的区域码错误的身份证号码返回false', () => {
    expect(isValidIDCard('410102199009106860', undefined, ['31'])).toBe(false);
  });

  it('应当对年龄范围内的身份证号码返回true', () => {
    expect(isValidIDCard('110101201008016217', { min: 10, max: 25 })).toBe(true);
  });

  it('应当对年龄范围下限以下的身份证号码返回false', () => {
    expect(isValidIDCard('110101200807075032', { min: 18, max: 25 })).toBe(false);
  });

  it('应当对年龄范围上限以上的身份证号码返回false', () => {
    expect(isValidIDCard('110101199510030540', { min: 10, max: 15 })).toBe(false);
  });
});
