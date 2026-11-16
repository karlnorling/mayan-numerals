// Settings the docs components share: presets, looks and the options this system adds.
export interface Extra {
  key: string;
  label: string;
  flag: string;
  type: 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  default: string | boolean;
}

export interface Look {
  value: string;
  color?: string;
  background?: string;
}

export const system = {
  name: 'Maya numerals',
  base: 20,
  sizeLabel: 'Width',
  sizeDefault: 120,
  gapDefault: 24,
  miniSize: 40,
  chartSize: 56,
  exampleSize: 80,
  randomMax: 200000,
  presets: ['1993', '20', '400', '2026', '3.14159', '-42', '0', '12.5'],
  extras: [] as Extra[],
  looks: {
    plain: { value: '1993' } as Look,
    rainbow: {
      value: '123456789',
      color:
        'linear-gradient(to bottom, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)',
    } as Look,
    christmas: {
      value: '2026.1225',
      color: 'repeating-linear-gradient(135deg, #e03131 0 3%, #ffffff 3% 6%)',
      background: 'radial-gradient(#2b8a3e, #0b3d20)',
    } as Look,
  },
};
