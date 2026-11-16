import { BASE } from './glyph.js';
import { formatInBase, parseInBase, type NumberInput, type ParsedNumber } from './parse.js';

/** Splits a number into base-20 digits, one per level. `0.5` is the fraction digit 10. */
export function parse(value: NumberInput): ParsedNumber {
  return parseInBase(value, BASE);
}

/** Writes parsed digits back as a canonical decimal string, e.g. `-12.5`. */
export function format(number: ParsedNumber): string {
  return formatInBase(number, BASE);
}
