import { isMobile } from '../../validate/mobile';

test('isMobile', () => {
  // valid mobile numbers with different formats
  expect(isMobile('13000000000')).toBeTruthy();
  expect(isMobile('+8613000000000')).toBeTruthy();
  expect(isMobile('8613000000000')).toBeTruthy();
  expect(isMobile('+8613234567890')).toBe(true);
  expect(isMobile('8613245678901')).toBe(true);
  expect(isMobile('13234567890')).toBe(true);

  // invalid mobile numbers
  expect(isMobile('abc')).toBeFalsy();
  expect(isMobile('1300000000')).toBeFalsy();
  expect(isMobile('12345678901')).toBe(false);
  expect(isMobile('0123456789')).toBe(false);
  expect(isMobile('1234')).toBe(false);
  expect(isMobile('123456789012345')).toBe(false);
  expect(isMobile('+86123456789012')).toBe(false);
  expect(isMobile('86123456789012')).toBe(false);
  expect(isMobile('123456789012')).toBe(false);
  expect(isMobile('123-45-67890')).toBe(false);
  expect(isMobile('123.45.67890')).toBe(false);
  expect(isMobile('123 45 67890')).toBe(false);
  expect(isMobile('(123)4567890')).toBe(false);
  expect(isMobile('(123)456-7890')).toBe(false);
});
