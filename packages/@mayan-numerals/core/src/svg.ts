import { digitShapes, LEVEL_HEIGHT, LEVEL_WIDTH, type Shape } from './glyph.js';
import { escapeAttr as escape, num, resolvePaint, type Paint } from './paint.js';
import { format, parse } from './number.js';
import type { NumberInput } from './parse.js';

export interface SvgOptions {
  /** Width of the image in pixels. The height follows from the number of levels. Default 100. */
  size?: number;
  /**
   * Colour of the dots, bars and shells. Default `currentColor`, so the SVG takes the
   * surrounding text colour. Also takes a CSS gradient such as
   * `linear-gradient(to bottom, gold, crimson)`, or a gradient object.
   */
  color?: Paint;
  /** Fills the image behind the numeral: a colour or a gradient. Default: transparent. */
  background?: Paint;
  /** Space between levels in viewBox units, where a level is 100 wide and 80 tall. Default 24. */
  gap?: number;
  /** Space around the numeral in viewBox units. Default 10. */
  padding?: number;
  /**
   * Accessible name, rendered as `<title>`. Defaults to the number written in decimal.
   * Pass `false` to leave it out and hide the image from assistive technology.
   */
  title?: string | false;
}

/** Line width of the shell, the minus mark and the fraction line, in viewBox units. */
const LINE = 5;
/** Room the minus mark takes to the left of the first level. */
const MINUS_WIDTH = 44;

/**
 * Renders a number as an SVG string of Maya numerals.
 *
 * Levels stack from the top, most significant first, each worth twenty times the one below.
 * A fraction continues below a dashed line in the same way, each level worth a twentieth
 * of the one above. A negative number gets a minus mark beside its first level.
 */
export function toSvg(value: NumberInput, options: SvgOptions = {}): string {
  const number = parse(value);
  const { gap = 24 } = options;
  const levels: { shapes: Shape[]; y: number }[] = [];
  let y = 0;
  let rule: number | undefined;
  for (const digit of number.integer) {
    if (levels.length > 0) y += gap;
    levels.push({ shapes: digitShapes(digit), y });
    y += LEVEL_HEIGHT;
  }
  if (number.fraction.length > 0) {
    rule = y + gap;
    y = rule + gap;
    number.fraction.forEach((digit, i) => {
      if (i > 0) y += gap;
      levels.push({ shapes: digitShapes(digit), y });
      y += LEVEL_HEIGHT;
    });
  }
  return render(levels, y, number.negative, rule, options, format(number));
}

/** One digit from 0 to 19 on its own, for keys and breakdowns. `place` is unused here. */
export function digitSvg(digit: number, _place = 0, options: SvgOptions = {}): string {
  return render(
    [{ shapes: digitShapes(digit), y: 0 }],
    LEVEL_HEIGHT,
    false,
    undefined,
    options,
    String(digit),
  );
}

function render(
  levels: { shapes: Shape[]; y: number }[],
  height: number,
  negative: boolean,
  rule: number | undefined,
  options: SvgOptions,
  defaultTitle: string,
): string {
  const { size = 100, color = 'currentColor', background, padding = 10 } = options;
  if (!(size > 0)) throw new RangeError(`size must be positive, got ${size}`);
  const title = options.title ?? defaultTitle;

  const left = negative ? MINUS_WIDTH : 0;
  const box = {
    x: -padding - left,
    y: -padding,
    width: LEVEL_WIDTH + left + 2 * padding,
    height: height + 2 * padding,
  };
  const paint = resolvePaint(color, box, 'maya-color');
  const fill =
    background === undefined ? undefined : resolvePaint(background, box, 'maya-background');
  const defs = [...new Set([fill?.def, paint.def].filter(Boolean))].join('');
  const p = escape(paint.value);

  const filled: string[] = [];
  const lines: string[] = [];
  for (const level of levels) {
    for (const shape of level.shapes) {
      if (shape.kind === 'bar') {
        filled.push(
          `<rect x="${num(shape.x)}" y="${num(level.y + shape.y)}" width="${num(shape.width)}" height="${num(shape.height)}" rx="${num(shape.height / 2)}"/>`,
        );
      } else if (shape.kind === 'dot') {
        filled.push(
          `<circle cx="${num(shape.cx)}" cy="${num(level.y + shape.cy)}" r="${num(shape.r)}"/>`,
        );
      } else {
        lines.push(`<path transform="translate(0 ${num(level.y)})" d="${shape.d}"/>`);
      }
    }
  }
  if (negative) lines.push(`<path d="M${-MINUS_WIDTH + 6} ${LEVEL_HEIGHT / 2}H-12"/>`);
  if (rule !== undefined) {
    lines.push(`<path d="M0 ${num(rule)}H${LEVEL_WIDTH}" stroke-dasharray="10 8"/>`);
  }

  const pixelHeight = (size * box.height) / box.width;
  const label = title === false ? 'aria-hidden="true"' : `role="img" aria-label="${escape(title)}"`;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${[box.x, box.y, box.width, box.height].map(num).join(' ')}" width="${num(size)}" height="${num(pixelHeight)}" ${label}>`,
    title === false ? '' : `<title>${escape(title)}</title>`,
    defs ? `<defs>${defs}</defs>` : '',
    fill === undefined
      ? ''
      : `<rect x="${num(box.x)}" y="${num(box.y)}" width="${num(box.width)}" height="${num(box.height)}" fill="${escape(fill.value)}"/>`,
    filled.length ? `<g fill="${p}">${filled.join('')}</g>` : '',
    lines.length
      ? `<g fill="none" stroke="${p}" stroke-width="${LINE}" stroke-linecap="round" stroke-linejoin="round">${lines.join('')}</g>`
      : '',
    '</svg>',
  ].join('');
}
