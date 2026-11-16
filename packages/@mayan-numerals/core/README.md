# @mayan-numerals/core

Render any number as [Maya numerals](https://en.wikipedia.org/wiki/Maya_numerals) in SVG. No dependencies; works in Node and the browser.

<img src="https://raw.githubusercontent.com/karlnorling/mayan-numerals/main/examples/1993.svg" alt="1993" height="80"> <img src="https://raw.githubusercontent.com/karlnorling/mayan-numerals/main/examples/400.svg" alt="400" height="80"> <img src="https://raw.githubusercontent.com/karlnorling/mayan-numerals/main/examples/rainbow.svg" alt="123456789 in rainbow colours" height="80">

```sh
npm install @mayan-numerals/core
```

```js
import { toSvg } from '@mayan-numerals/core';

document.body.innerHTML = toSvg(1993, { size: 200 });

// Colours and backgrounds take CSS gradients too.
toSvg('123456789', {
  color:
    'linear-gradient(to bottom, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)',
});
```

Levels stack in base 20, fractions continue below a dashed line, and negatives get a minus mark. For PNG, JPEG or WebP, use [`@mayan-numerals/raster`](https://www.npmjs.com/package/@mayan-numerals/raster).

See the [docs and playground](https://karlnorling.github.io/mayan-numerals/) for every option and how numbers are drawn.

## License

MIT
