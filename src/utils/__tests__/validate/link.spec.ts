import { isLink } from '../../validate/link';

// test('isEmail', () => {
//   expect(isLink('weixin://xxx')).toBeTruthy();
//   expect(isLink('abc@gmail.com')).toBeFalsy();
//   expect(isLink('192.168.1.1')).toBeTruthy();
//   expect(isLink('https://www.baidu.com')).toBeTruthy();
//   expect(isLink('//www.baidu.com')).toBeFalsy();
//   expect(isLink('www.baidu.com')).toBeTruthy();
//   expect(isLink('http:xxx.abc')).toBeFalsy();
//   expect(isLink('http://xxx.abc')).toBeTruthy();
//   expect(isLink('ftp://xxx.abc')).toBeTruthy();
// });

// 下面是使用chatCPT编写的单元测试
test('isLink returns true for weixin links', () => {
  const link = 'weixin://example';
  expect(isLink(link)).toBe(true);
});

test('isLink returns true for valid links', () => {
  const link = 'https://www.example.com';
  expect(isLink(link)).toBe(true);
});

test('isLink returns false for invalid links', () => {
  const link = 'invalid link';
  expect(isLink(link)).toBe(false);
});

test('isLink returns false for empty string', () => {
  const link = '';
  expect(isLink(link)).toBe(false);
});

test('isLink returns false for invalid URLs', () => {
  const link = 'http://.com';
  expect(isLink(link)).toBe(false);
});

test('isLink returns true for URLs with query parameters', () => {
  const link = 'https://www.example.com/?param=value';
  expect(isLink(link)).toBe(true);
});

test('isLink returns true for URLs with hash', () => {
  const link = 'https://www.example.com/#hash';
  expect(isLink(link)).toBe(true);
});

test('isLink returns false for phone numbers', () => {
  const link = 'tel:1234567890';
  expect(isLink(link)).toBe(false);
});

test('isLink returns false for email addresses', () => {
  const link = 'mailto:john@example.com';
  expect(isLink(link)).toBe(false);
});
