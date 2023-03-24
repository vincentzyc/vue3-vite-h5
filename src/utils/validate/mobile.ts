export function isMobile(value: string): boolean {
  value = value.replace(/[^-|\d]/g, '');
  return /^((\+86)|(86))?1[3-9]\d{9}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}
