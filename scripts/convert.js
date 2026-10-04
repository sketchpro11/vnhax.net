// Migration helper script to convert HTML files to Next.js App Router TSX pages
const fs = require('fs');
const path = require('path');

function styleStringToObj(styleStr) {
  if (!styleStr) return {};
  const rules = styleStr.split(';').filter(r => r.trim());
  const obj = {};
  for (const rule of rules) {
    const [prop, ...valParts] = rule.split(':');
    if (!prop || valParts.length === 0) continue;
    const val = valParts.join(':').trim();
    const camelProp = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    obj[camelProp] = val;
  }
  return obj;
}

function convertHtmlToJsx(html) {
  let jsx = html;

  // Replace class= with className=
  jsx = jsx.replace(/\bclass="/g, 'className="');
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
  jsx = jsx.replace(/\bautocomplete="/g, 'autoComplete="');
  jsx = jsx.replace(/\btabindex="/g, 'tabIndex="');
  jsx = jsx.replace(/\bitemscope\b/g, 'itemScope');
  jsx = jsx.replace(/\bitemtype="/g, 'itemType="');
  jsx = jsx.replace(/\bitemprop="/g, 'itemProp="');
  jsx = jsx.replace(/\bcolor-interpolation-filters="/g, 'colorInterpolationFilters="');

  // Convert SVG attributes
  const svgAttrs = [
    'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit',
    'stroke-dasharray', 'stroke-dashoffset', 'stroke-opacity',
    'fill-rule', 'clip-rule', 'fill-opacity', 'clip-path'
  ];
  for (const attr of svgAttrs) {
    const camel = attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const reg = new RegExp(`\\b${attr}="`, 'g');
    jsx = jsx.replace(reg, `${camel}="`);
  }

  // Convert void tags to self-closing
  const voidTags = ['input', 'img', 'br', 'hr', 'meta'];
  for (const tag of voidTags) {
    const reg = new RegExp(`<${tag}([^>]*?)(?<!\\/)>`, 'gi');
    jsx = jsx.replace(reg, `<${tag}$1 />`);
  }

  // Convert style="..." attributes
  jsx = jsx.replace(/\bstyle="([^"]*)"/g, (match, styleContent) => {
    const styleObj = styleStringToObj(styleContent);
    return `style={${JSON.stringify(styleObj)}}`;
  });

  // Convert HTML entities that ESLint/JSX might complain about if naked
  // but keep inside quotes as is.

  return jsx;
}

module.exports = { convertHtmlToJsx };
console.log('Converter loaded successfully');
