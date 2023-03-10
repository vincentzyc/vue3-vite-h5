export function setSessionStorage(key: string, value: any): void {
  let str = window.JSON.stringify(value);
  window.sessionStorage.setItem(key, str);
}

export function getSessionStorage(key: string): any {
  let str: string | null;
  str = window.sessionStorage.getItem(key);
  if (!str) return '';
  try {
    return window.JSON.parse(str);
  } catch (error) {
    window.sessionStorage.removeItem(key);
    window.location.reload();
  }
}

export function setLocalStorage(key: string, value: any): void {
  let str = window.JSON.stringify(value);
  window.localStorage.setItem(key, str);
}

export function getLocalStorage(key: string): any {
  let str: string | null;
  str = window.localStorage.getItem(key);
  if (!str) return '';
  try {
    return window.JSON.parse(str);
  } catch (error) {
    window.localStorage.removeItem(key);
    window.location.reload();
  }
}
