import { describe, expect, it } from 'vitest';
import { digitSvg, toSvg } from '../src/index.js';

const attr = (svg: string, name: string) => new RegExp(` ${name}="([^"]*)"`).exec(svg)?.[1];

describe('toSvg', () => {
  it('renders one level 100px wide by default', () => {
    const svg = toSvg(13);
    expect(attr(svg, 'viewBox')).toBe('-10 -10 120 100');
    expect(attr(svg, 'width')).toBe('100');
    expect(attr(svg, 'height')).toBe('83.333');
    expect(svg).toContain('<title>13</title>');
    expect(svg.match(/<rect /g)).toHaveLength(2);
    expect(svg.match(/<circle /g)).toHaveLength(3);
  });

  it('stacks levels with the most significant on top', () => {
    // 1993 = 4·400 + 19·20 + 13
    const svg = toSvg(1993);
    expect(attr(svg, 'viewBox')).toBe('-10 -10 120 308');
    // The top level holds four dots, centred in it.
    expect(svg).toContain('<circle cx="17" cy="40" r="7.5"/>');
  });

  it('draws zero as a shell, including inside a number', () => {
    expect(toSvg(0)).toContain('stroke-linejoin="round"><path transform="translate(0 0)"');
    expect(toSvg(400).match(/transform=/g)).toHaveLength(2);
  });

  it('puts the fraction below a dashed line', () => {
    const svg = toSvg(12.5);
    expect(svg).toContain('stroke-dasharray="10 8"');
    expect(svg).toContain('<title>12.5</title>');
    // 12 · 10: two levels plus the rule's gaps.
    expect(attr(svg, 'viewBox')).toBe('-10 -10 120 228');
  });

  it('marks negative numbers beside the first level', () => {
    const svg = toSvg(-7);
    expect(attr(svg, 'viewBox')).toBe('-54 -10 164 100');
    expect(svg).toContain('<path d="M-38 40H-12"/>');
  });

  it('takes colours, backgrounds and gradients', () => {
    const svg = toSvg(5, { color: '#c00', background: 'linear-gradient(gold, white)' });
    expect(svg).toContain('<g fill="#c00">');
    expect(svg).toMatch(/<linearGradient id="maya-background-\w+"/);
  });

  it('can drop the title', () => {
    const svg = toSvg(1, { title: false });
    expect(svg).toContain('aria-hidden="true"');
    expect(svg).not.toContain('<title>');
  });

  it('rejects a bad size', () => {
    expect(() => toSvg(1, { size: 0 })).toThrow('size must be positive');
  });
});

describe('digitSvg', () => {
  it('draws one digit with its value as the title', () => {
    expect(digitSvg(19)).toContain('<title>19</title>');
    expect(digitSvg(19).match(/<rect /g)).toHaveLength(3);
  });
});
