import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://hustler512.github.io/DICTATOR';
const locales = ['en', 'pt', 'fr', 'es', 'de', 'it', 'ru'];
const articles = ['browser-text-to-speech-reader', 'read-pdf-aloud-online', 'read-notes-aloud', 'student-dictation-tool'];
const publicRoutes = ['', 'blogs', ...articles.map(slug => `blogs/${slug}`)];

function staticPath(locale, route) {
  const localePath = locale === 'en' ? [] : [locale];
  const routePath = route ? route.split('/') : [];
  return path.join(root, ...localePath, ...routePath, 'index.html');
}

function routeUrl(locale, route) {
  const prefix = locale === 'en' ? '' : `${locale}/`;
  return `${origin}/${prefix}${route}`.replace(/([^:])\/\/+/g, '$1/');
}

function links(html, pattern) {
  return [...html.matchAll(pattern)].map(match => match.slice(1));
}

for (const locale of locales) {
  for (const route of publicRoutes) {
    test(`static metadata: ${locale || 'en'} ${route || '/'}`, async () => {
      const html = await fs.readFile(staticPath(locale, route), 'utf8');
      assert.match(html, new RegExp(`<html[^>]*lang=["']${locale}["']`));
      assert.deepEqual(
        links(html, /<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi),
        [[routeUrl(locale, route)]]
      );
      assert.equal(
        links(html, /<link\b(?=[^>]*\brel=["']alternate["'])(?=[^>]*\bhreflang=["']([^"']+)["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi).length,
        8
      );
      assert.doesNotMatch(html, /dictator\.app/i);
    });
  }
}

test('sitemap and robots use the active canonical host', async () => {
  const sitemap = await fs.readFile(path.join(root, 'sitemap.xml'), 'utf8');
  const robots = await fs.readFile(path.join(root, 'robots.txt'), 'utf8');
  assert.doesNotMatch(sitemap, /dictator\.app/i);
  assert.doesNotMatch(robots, /dictator\.app/i);
  assert.match(robots, /Sitemap:\s*https:\/\/hustler512\.github\.io\/DICTATOR\/sitemap\.xml/);
  assert.doesNotMatch(sitemap, /\/projects(?:<|\/)/i);
});

test('locale route matrix is reciprocal', async () => {
  for (const route of publicRoutes) {
    for (const locale of locales) {
      const html = await fs.readFile(staticPath(locale, route), 'utf8');
      const hrefs = links(html, /<link\b(?=[^>]*\brel=["']alternate["'])(?=[^>]*\bhreflang=["']([^"']+)["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi);
      assert.equal(hrefs.length, 8);
      const hrefMap = new Map(hrefs);
      for (const targetLocale of locales) {
        assert.equal(hrefMap.get(targetLocale), routeUrl(targetLocale, route));
        await fs.access(staticPath(targetLocale, route));
      }
      assert.equal(hrefMap.get('x-default'), routeUrl('en', route));
    }
  }
});

test('localized loaders use the active index version', async () => {
  for (const locale of locales.filter(locale => locale !== 'en')) {
    const localeRoot = path.join(root, locale);
    const entries = await fs.readdir(localeRoot, { recursive: true, withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || entry.name !== 'index.html') continue;
      const filePath = path.join(entry.parentPath, entry.name);
      const html = await fs.readFile(filePath, 'utf8');
      if (html.includes('fetch(')) assert.match(html, /index\.html\?v=31/);
    }
  }
});

 test('runtime source has no public Arabic selector or Russian grammar defect', async () => {
  const ui = await fs.readFile(path.join(root, 'ui.js'), 'utf8');
  const app = await fs.readFile(path.join(root, 'app.js'), 'utf8');
  assert.doesNotMatch(ui, /\['en','pt','es','fr','de','it','ar','ru'\]/);
  assert.match(app, /Голосовая лаборатория/);
});
