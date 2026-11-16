import { describe, expect, it } from 'vitest';
import { digitShapes } from '../src/index.js';

const count = (digit: number, kind: string) =>
  digitShapes(digit).filter((s) => s.kind === kind).length;

describe('digitShapes', () => {
  it('draws zero as a shell', () => {
    expect(digitShapes(0)).toEqual([expect.objectContaining({ kind: 'shell' })]);
  });

  it.each([
    [1, 0, 1],
    [4, 0, 4],
    [5, 1, 0],
    [13, 2, 3],
    [19, 3, 4],
  ])('draws %i as %i bars and %i dots', (digit, bars, dots) => {
    expect(count(digit, 'bar')).toBe(bars);
    expect(count(digit, 'dot')).toBe(dots);
  });

  it('puts the dots above the bars and centres the digit in its level', () => {
    // 7: one bar and two dots, 36 units tall in an 80-unit level.
    const shapes = digitShapes(7);
    const bar = shapes.find((s) => s.kind === 'bar');
    const dot = shapes.find((s) => s.kind === 'dot');
    expect(bar).toMatchObject({ y: 44, height: 14 });
    expect(dot).toMatchObject({ cy: 29.5 });
    expect(digitShapes(1)).toEqual([{ kind: 'dot', cx: 50, cy: 40, r: 7.5 }]);
  });

  it('centres the dots', () => {
    const xs = digitShapes(3).flatMap((s) => ('cx' in s ? [s.cx] : []));
    expect(xs).toEqual([28, 50, 72]);
  });

  it.each([-1, 20, 1.5])('rejects %s', (digit) => {
    expect(() => digitShapes(digit)).toThrow('0 to 19');
  });
});
