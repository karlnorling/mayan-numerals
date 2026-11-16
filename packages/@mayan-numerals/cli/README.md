# @mayan-numerals/cli

Draw any number as [Maya numerals](https://en.wikipedia.org/wiki/Maya_numerals) from the command line: SVG, PNG, JPEG or WebP.

```sh
npx @mayan-numerals/cli 1993 > 1993.svg
npx @mayan-numerals/cli 3.14159 -o pi.webp --size 200
npx @mayan-numerals/cli -42 -o minus.png
```

Installed globally with `npm install -g @mayan-numerals/cli`, the command is `mayan`.

```
Usage: mayan <number> [options]

Draws a number as Maya numerals. Prints SVG to stdout unless --output is given.

Options:
  -o, --output <file>      Write to a .svg, .png, .jpg, .jpeg or .webp file
  -s, --size <px>          Image width in pixels (default 100)
  -c, --color <color>      Colour or CSS gradient (default currentColor for SVG,
                           black for images)
  -b, --background <color> Background colour or CSS gradient (default transparent,
                           white for JPEG)
  -g, --gap <n>            Space between levels in viewBox units (default 24)
  -q, --quality <1-100>    JPEG and WebP quality
  -h, --help               Show this help
  -v, --version            Show the version

Examples:
  mayan 1993 > 1993.svg
  mayan 3.14159 -o pi.webp --size 200
  mayan -42 -o minus.png
  mayan 1993 -o 1993.png -c 'linear-gradient(to bottom, red, blue)'
```

## License

MIT
