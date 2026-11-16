/** Maya numerals count in twenties: each level holds a digit from 0 to 19. */
export const BASE = 20;

/** Width of one level in viewBox units. */
export const LEVEL_WIDTH = 100;
/** Height of one level in viewBox units: room for three bars and a row of dots. */
export const LEVEL_HEIGHT = 80;

/** Bars and dots are filled; the shell for zero is drawn with lines. */
export type Shape =
  | { kind: 'bar'; x: number; y: number; width: number; height: number }
  | { kind: 'dot'; cx: number; cy: number; r: number }
  | { kind: 'shell'; d: string };

const BAR = { x: 6, width: 88, height: 14, gap: 7 };
const DOT = { r: 7.5, spacing: 22, gap: 7 };

/**
 * The shapes for one digit from 0 to 19, in a level `LEVEL_WIDTH` wide and
 * `LEVEL_HEIGHT` tall with its origin at the top left.
 *
 * A bar is five and a dot is one. Bars stack upwards and the dots sit on top, so 13 is
 * two bars with three dots above them. Each digit is centred in its level. Zero is a shell.
 */
export function digitShapes(digit: number): Shape[] {
  if (!Number.isInteger(digit) || digit < 0 || digit >= BASE) {
    throw new RangeError(`A Maya digit runs from 0 to 19, got ${digit}`);
  }
  if (digit === 0) return [{ kind: 'shell', d: SHELL }];

  const bars = Math.floor(digit / 5);
  const dots = digit % 5;
  const shapes: Shape[] = [];
  let top = LEVEL_HEIGHT;
  for (let i = 0; i < bars; i++) {
    top -= BAR.height + (i > 0 ? BAR.gap : 0);
    shapes.push({ kind: 'bar', x: BAR.x, y: top, width: BAR.width, height: BAR.height });
  }
  const cy = (bars > 0 ? top - DOT.gap : LEVEL_HEIGHT) - DOT.r;
  for (let i = 0; i < dots; i++) {
    const cx = LEVEL_WIDTH / 2 + (i - (dots - 1) / 2) * DOT.spacing;
    shapes.push({ kind: 'dot', cx, cy, r: DOT.r });
  }
  // Centre the digit in its level, so levels look evenly spaced whatever they hold.
  const contentTop = dots > 0 ? cy - DOT.r : top;
  const shift = contentTop / 2;
  return shapes.map((shape) =>
    shape.kind === 'bar'
      ? { ...shape, y: shape.y - shift }
      : shape.kind === 'dot'
        ? { ...shape, cy: shape.cy - shift }
        : shape,
  );
}

/** A stylised shell: its outline, the curve of the opening, and two ridges. */
const SHELL = [
  'M12 52C28 26 72 26 88 52C72 76 28 76 12 52Z',
  'M24 56C40 44 60 44 76 56',
  'M40 38L43 49',
  'M60 38L57 49',
].join('');
