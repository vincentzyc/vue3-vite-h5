import { isAndroid, isIOS } from '../../validate/system';

// mock window 对象多种方式
describe('Platform detection', () => {
  it('should isAndroid return false if not in browser', () => {
    expect(isAndroid()).toBe(false);
  });
  it('should correctly detect Android', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Linux; Android 11; SM-A125F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Mobile Safari/537.36',
      writable: true,
    });

    expect(isAndroid()).toBe(true);
  });

  it('should isIOS eturn false if not in browser', () => {
    expect(isIOS()).toBe(false);
  });
  it('should correctly detect iOS', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
      writable: true,
    });

    expect(isIOS()).toBe(true);
  });

  it('should detect iOS user agent', () => {
    global.navigator = {
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    } as Navigator;
    expect(isIOS()).toBe(true);
  });
});

// spyOn() 方法无法直接 mock 只读属性，以下方式会报错
// describe('Device Detection', () => {
//   describe('isAndroid', () => {
//     it('should return true for Android user agent', () => {
//       vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
//         'Mozilla/5.0 (Linux; Android 9; Pixel 2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Mobile Safari/537.36'
//       );
//       expect(isAndroid()).toBe(true);
//     });
//     it('should return false for non-Android user agent', () => {
//       vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
//         'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
//       );
//       expect(isAndroid()).toBe(false);
//     });

//     it('should return false if not in browser', () => {
//       expect(isAndroid()).toBe(false);
//     });
//   });
