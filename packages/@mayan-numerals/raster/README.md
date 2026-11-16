# @mayan-numerals/raster

Render any number as [Maya numerals](https://en.wikipedia.org/wiki/Maya_numerals) in PNG, JPEG or WebP, using [sharp](https://sharp.pixelplumbing.com/).

```sh
npm install @mayan-numerals/raster
```

```js
import { toImage } from '@mayan-numerals/raster';
import { writeFile } from 'node:fs/promises';

await writeFile('1993.png', await toImage(1993));
await writeFile('pi.webp', await toImage('3.14159', { format: 'webp', size: 400 }));
```

`toImage` takes every option of `toSvg` from [`@mayan-numerals/core`](https://www.npmjs.com/package/@mayan-numerals/core), plus `format` (`png`, `jpeg`, `jpg` or `webp`; default `png`) and `quality` (1–100). Colours default to black, and JPEG gets a white background unless you pass one.

See the [docs](https://karlnorling.github.io/mayan-numerals/packages/raster/).

## License

MIT
