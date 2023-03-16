import { isNumeric, isNaN } from '../../validate/number';

// test('isNumeric', () => {
//   expect(isNumeric('1')).toBeTruthy();
//   expect(isNumeric('1.2')).toBeTruthy();
//   expect(isNumeric('1..2')).toBeFalsy();
//   expect(isNumeric('abc')).toBeFalsy();
//   expect(isNumeric('1b2')).toBeFalsy();
// });

// test('isNaN', () => {
//   expect(isNaN(1)).toBeFalsy();
//   expect(isNaN(Number('a'))).toBeTruthy();
// });

// 下面是使用chatCPT编写的单元测试
test('isNumeric function', () => {
  expect(isNumeric('123')).toBe(true);
  expect(isNumeric('123.45')).toBe(true);
  expect(isNumeric('0.123')).toBe(true);

  expect(isNumeric('.123')).toBe(false);
  expect(isNumeric('abc')).toBe(false);
  expect(isNumeric('123a')).toBe(false);
  expect(isNumeric('12.3.4')).toBe(false);
  expect(isNumeric('123.')).toBe(false);
  expect(isNumeric('.')).toBe(false);
});

test('isNaN returns true for NaN', () => {
  expect(isNaN(NaN)).toBe(true);
});

test('isNaN returns false for numbers', () => {
  expect(isNaN(0)).toBe(false);
  expect(isNaN(42)).toBe(false);
  expect(isNaN(-1.5)).toBe(false);
});
