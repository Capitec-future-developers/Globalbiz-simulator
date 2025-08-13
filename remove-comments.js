const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

const exts = new Set(['.js', '.css', '.html']);
const excludeDirs = new Set(['node_modules', '.git']);

function stripComments(content, ext) {
  if (ext === '.html') {
    
    content = content.replace(/<!--[\s\S]*?-->/g, '');
    return content;
  }
  if (ext === '.css' || ext === '.js') {
    
    content = content.replace(/\/\*[\s\S]*?\*\
  }
  if (ext === '.js') {
    
    
    content = content.replace(/(^|[^:])\/\/[^\n\r]*/g, '$1');
  }
  if (ext === '.css') {
    
  }
  return content;
}

function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!exts.has(ext)) return;
  try {
    const original = fs.readFileSync(filePath, 'utf8');
    const stripped = stripComments(original, ext);
    if (stripped !== original) {
      fs.writeFileSync(filePath, stripped, 'utf8');
      console.log(`Stripped comments: ${path.relative(ROOT, filePath)}`);
    }
  } catch (e) {
    console.error(`Failed to process ${filePath}:`, e.message);
  }
}

function walk(dir) {
  if (excludeDirs.has(path.basename(dir))) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full);
    } else if (ent.isFile()) {
      processFile(full);
    }
  }
}

walk(ROOT);
console.log('Done stripping comments.');
