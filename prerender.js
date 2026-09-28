// Bakes the data-driven lists from site.js into index.html, so projects, the
// stack and the design grid are in the HTML itself — visible to search
// engines, link previews and no-JS visitors. Re-run after editing site.js:
//   node prerender.js
const fs = require('fs');
const path = require('path');

const LISTS = require('./site.js');
const file = path.join(__dirname, 'index.html');
let html = fs.readFileSync(file, 'utf8');

// Replaces the contents of the element with this id, counting nested tags of
// the same name so a <div> inside a <div> does not end the match early.
function fill(src, id, inner) {
  const open = new RegExp('<(\\w+)\\b[^>]*\\bid="' + id + '"[^>]*>').exec(src);
  if (!open) throw new Error('#' + id + ' not found in index.html');
  const tag = open[1];
  const start = open.index + open[0].length;
  const re = new RegExp('<(/?)' + tag + '\\b[^>]*>', 'g');
  re.lastIndex = start;
  let depth = 1, m;
  while ((m = re.exec(src))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return src.slice(0, start) + inner + src.slice(m.index);
  }
  throw new Error('#' + id + ' has no closing </' + tag + '>');
}

for (const [id, render] of Object.entries(LISTS)) html = fill(html, id, render());

fs.writeFileSync(file, html);
console.log('Prerendered ' + Object.keys(LISTS).length + ' lists into index.html');
