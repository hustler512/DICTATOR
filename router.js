const ROUTER_UI = window.UI;
const ROUTE_META = {
  '': {
    title: 'DICTATOR | Free Text to Speech & Reader Tool',
    description: 'Turn notes, PDFs, and study material into listening sessions directly in your browser with private, local-first text-to-speech.',
    canonicalPath: '/'
  },
  projects: {
    title: 'Projects | DICTATOR',
    description: 'Manage your saved listening sessions, projects, and notes in a private browser workspace.',
    canonicalPath: '/projects'
  },
  about: {
    title: 'About DICTATOR | Privacy-first Voice Tool',
    description: 'Learn how DICTATOR helps students and learners turn writing into speech in a private, browser-based workflow.',
    canonicalPath: '/about'
  },
  'how-to-use': {
    title: 'How to Use DICTATOR',
    description: 'Start with your notes, upload a document, and build a listening session with simple browser-based dictation and playback controls.',
    canonicalPath: '/how-to-use'
  },
  privacy: {
    title: 'Privacy Policy | DICTATOR',
    description: 'Review how DICTATOR keeps notes on-device and avoids uploading your content to a server.',
    canonicalPath: '/privacy'
  },
  project: {
    title: 'Project Reader | DICTATOR',
    description: 'Open a saved project, follow each spoken group, and review your notes with browser-based voice playback.',
    canonicalPath: '/projects'
  },
  edit: {
    title: 'Edit Project | DICTATOR',
    description: 'Update an existing project, revise your content, and keep the same private local-first listening workflow.',
    canonicalPath: '/projects'
  }
};

window.Router = (() => {
  function path() {
    const raw = location.pathname.replace(/^\/+|\/+$/g, '');
    return raw;
  }
  function setMetaTag(name, value, attribute = 'name') {
    let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', value);
    return tag;
  }
  function updateMeta(routeKey = '') {
    const meta = ROUTE_META[routeKey] || ROUTE_META[''];
    document.title = meta.title;
    setMetaTag('description', meta.description, 'name');
    setMetaTag('og:title', meta.title, 'property');
    setMetaTag('og:description', meta.description, 'property');
    setMetaTag('twitter:title', meta.title, 'name');
    setMetaTag('twitter:description', meta.description, 'name');

    const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${location.origin}${meta.canonicalPath}`;
    if (!canonical.parentNode) document.head.appendChild(canonical);

    const ogUrl = document.head.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', `${location.origin}${meta.canonicalPath}`);
    if (!ogUrl.parentNode) document.head.appendChild(ogUrl);
  }
  function navigate(value) {
    const clean = String(value || '').replace(/^\/+/, '').replace(/\/+$/, '');
    const target = clean ? `/${clean}` : '/';
    if (location.pathname !== target) history.pushState({}, '', target);
    handle();
  }
  async function handle() {
    const parts = path().split('/');
    const routeKey = parts[0] || '';
    if (routeKey !== 'project') window.TTS?.stop();
    updateMeta(routeKey);
    if (!routeKey) return ROUTER_UI.renderHome();
    if (routeKey === 'projects') return ROUTER_UI.renderProjects();
    if (routeKey === 'project' && parts[1]) return ROUTER_UI.renderProject(parts[1]);
    if (routeKey === 'edit' && parts[1]) return ROUTER_UI.renderHome(parts[1]);
    if (routeKey === 'about') return ROUTER_UI.renderAbout();
    if (routeKey === 'how-to-use') return ROUTER_UI.renderHowToUse();
    if (routeKey === 'privacy') return ROUTER_UI.renderPrivacy();
    navigate('');
    ROUTER_UI.toast('Page not found.', 'danger');
  }
  function init() { addEventListener('popstate', handle); handle(); }
  return { navigate, init, handle, updateMeta };
})();
