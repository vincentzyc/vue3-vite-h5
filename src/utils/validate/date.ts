import { isNaN } from './number';
import { getType } from './data-type';

export function isDate(val: Date): val is Date {
  return getType(val) === 'Date' && !isNaN(val.getTime());
}
