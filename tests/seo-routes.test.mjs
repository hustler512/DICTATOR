import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://hustler512.github.io/DICTATOR';

function staticPath(locale, route) {
  const localePath = locale === 'en' ? [] : [locale];
  const routePath = route ? route.split('/') : [];
  return path.join(root, ...localePath, ...routePath, 'index.html');
}

test('root SEO shell and canonical metadata are valid', async () => {
  const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /<link rel="canonical" href="https:\/\/hustler512\.github\.io\/DICTATOR\/"/);
  assert.match(html, /<meta property="og:url" content="https:\/\/hustler512\.github\.io\/DICTATOR\/"/);
  assert.doesNotMatch(html, /dictator\.app/i);
});

test('localized index pages resolve the active canonical host', async () => {
  const locales = ['pt', 'fr', 'es', 'de', 'it', 'ru'];
  for (const locale of locales) {
    const html = await fs.readFile(staticPath(locale, ''), 'utf8');
    assert.match(html, new RegExp(`<link rel="canonical" href="${origin}/${locale}/"`));
  }
});

test('robots and sitemap use the active deployment host', async () => {
  const robots = await fs.readFile(path.join(root, 'robots.txt'), 'utf8');
  const sitemap = await fs.readFile(path.join(root, 'sitemap.xml'), 'utf8');
  assert.match(robots, /Sitemap:\s*https:\/\/hustler512\.github\.io\/DICTATOR\/sitemap\.xml/);
  assert.doesNotMatch(robots, /dictator\.app/i);
  assert.doesNotMatch(sitemap, /dictator\.app/i);
});

