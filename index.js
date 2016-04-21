'use strict';

// CONFIG
const OUTPUTSVGDIR = './svgIcons';
const OUTPUTPNGDIR = './pngIcons';
const SOURCESVG = './icons.svg';
const DIMENSIONS = {
  width: 160,
  height: 160
};

const xmldoc = require('xmldoc');
const fs = require('fs');
const svg2png = require("svg2png");
let svgIcon = '';

if (!fs.existsSync(OUTPUTSVGDIR)){
  fs.mkdirSync(OUTPUTSVGDIR);
}
if (!fs.existsSync(OUTPUTPNGDIR)){
  fs.mkdirSync(OUTPUTPNGDIR);
}

const svg = (fs.readFileSync(SOURCESVG, 'utf-8'));

new xmldoc.XmlDocument(svg).childrenNamed('symbol').map((child, index) => {
  // create SVG
  svgIcon = `<?xml version="1.0" encoding="UTF-8"?>\n<svg viewBox="${child.attr.viewBox}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
\n${child.children.join('')}\n</svg>`;
  fs.writeFileSync(`${OUTPUTSVGDIR}/${child.attr.id}.svg`, svgIcon);

  // create PNG
  svg2png(new Buffer(svgIcon), DIMENSIONS)
    .then(buffer => fs.writeFile(`${OUTPUTPNGDIR}/${child.attr.id}.png`, buffer))
    .catch(e => console.error(e));
});
