const ROUTER_UI = window.UI;
const ROUTE_META = {
  '': {
    title: 'DICTATOR | Browser Text to Speech Reader',
    description: 'Read notes, PDFs, articles, and study material aloud in your browser with a private text-to-speech reader built for studying, revision, and focus.',
    canonicalPath: '/'
  },
  blogs: {
    title: 'BLOGS | DICTATOR',
    description: 'Browse practical guides and product-focused articles about browser reading, PDF listening, note review, and student study workflows.',
    canonicalPath: '/blogs'
  },
  'browser-text-to-speech-reader': {
    title: 'Browser Text to Speech Reader | DICTATOR',
    description: 'Use a browser-based text to speech reader to turn notes, articles, and documents into spoken audio without uploading your files.',
    canonicalPath: '/blogs/browser-text-to-speech-reader'
  },
  'read-pdf-aloud-online': {
    title: 'Read PDF Aloud Online | DICTATOR',
    description: 'Listen to PDF text aloud in your browser with a private reading workflow for study sessions, revision, and accessibility.',
    canonicalPath: '/blogs/read-pdf-aloud-online'
  },
  'read-notes-aloud': {
    title: 'Read Notes Aloud in Browser | DICTATOR',
    description: 'Turn your notes into spoken audio in a focused browser workflow that helps you study, revise, and retain information faster.',
    canonicalPath: '/blogs/read-notes-aloud'
  },
  'student-dictation-tool': {
    title: 'Student Dictation Tool | DICTATOR',
    description: 'A student-friendly dictation and listening tool for notes, essays, and revision content that works fully in the browser.',
    canonicalPath: '/blogs/student-dictation-tool'
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
  const isLocalHost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const isGitHubPages = location.hostname === 'github.io' || location.hostname.endsWith('.github.io');
  const USE_HASH = isLocalHost || isGitHubPages;
  const BASE_PATH = isLocalHost ? '' : (isGitHubPages ? '/DICTATOR' : '');
  function path() {
    if (USE_HASH) {
      return location.hash.replace(/^#\/?/, '').replace(/^\/+|\/+$/g, '');
    }
    let raw = location.pathname;
    if (BASE_PATH && raw.startsWith(BASE_PATH)) raw = raw.slice(BASE_PATH.length);
    raw = raw.replace(/^\/+|\/+$/g, '');
    return raw;
  }
  function restoreFallbackRoute() {
    const saved = sessionStorage.getItem('dictator_pending_route');
    if (!saved) return;
    sessionStorage.removeItem('dictator_pending_route');
    const target = saved.startsWith('/') ? saved : `/${saved}`;
    if (USE_HASH) {
      history.replaceState({}, '', `${BASE_PATH || ''}/#${target}`);
    } else if (location.pathname !== target && location.pathname !== `${BASE_PATH}${target}`) {
      history.replaceState({}, '', `${BASE_PATH || ''}${target}`);
    }
    return target;
  }
  function migrateHashRoute() {
    if (USE_HASH || !location.hash.startsWith('#/')) return false;
    const route = location.hash.replace(/^#\/?/, '');
    history.replaceState({}, '', route ? `/${route}` : '/');
    return true;
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
  function setJsonLd(payload) {
    let tag = document.head.querySelector('script[data-schema="dictator"]');
    if (!tag) {
      tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.setAttribute('data-schema', 'dictator');
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(payload);
  }
  function injectFaqSchema(routeKey = '') {
    const faqs = {
      '': [
        { question: 'What is the best browser text to speech reader?', answer: 'DICTATOR is a browser-based text to speech reader for notes, documents, PDFs, and study material that keeps the workflow private and on-device.' },
        { question: 'Can I read PDF aloud online?', answer: 'Yes. DICTATOR is built to help you upload text-heavy files and convert them into spoken audio in the browser.' },
        { question: 'Is this good for students?', answer: 'Yes. Students use it for revision, language practice, and listening to notes in a calmer and more focused workflow.' },
        { question: 'Does it keep my content private?', answer: 'The main workflow is local-first and browser-based, so your notes remain on your device instead of being uploaded to a server.' }
      ],
      'browser-text-to-speech-reader': [
        { question: 'What is a browser text to speech reader?', answer: 'It is a tool that converts text into spoken audio inside the browser without sending your notes to an external server.' },
        { question: 'Can I use it for notes and documents?', answer: 'Yes. It works with pasted notes and uploaded document files, making it useful for studying and revision.' },
        { question: 'Does it support repeated revision?', answer: 'Yes. You can control speed, chunking, and repetition to build a smoother study workflow.' }
      ],
      'read-pdf-aloud-online': [
        { question: 'Can I read a PDF aloud online?', answer: 'Yes. You can upload a PDF and have the visible text read back as spoken audio in the browser.' },
        { question: 'Is it useful for study?', answer: 'Yes. It is especially helpful for academic reading, revision, and long-form material that is easier to absorb by ear.' },
        { question: 'Does it work without installing software?', answer: 'Yes. The workflow is browser-based and uses the local device and browser speech APIs.' }
      ],
      'read-notes-aloud': [
        { question: 'Why read notes aloud?', answer: 'Reading aloud can reduce screen fatigue, improve focus, and make revision easier to retain over time.' },
        { question: 'Can I use it on mobile?', answer: 'Yes. The app is designed to work in browser environments and supports mobile-friendly reading workflows.' },
        { question: 'What notes work best?', answer: 'Class notes, revision scripts, personal summaries, and study material all work well in a listening session.' }
      ],
      'student-dictation-tool': [
        { question: 'What makes DICTATOR useful for students?', answer: 'It helps students revise by ear, repeat difficult ideas, and absorb notes in a calmer note-listening flow.' },
        { question: 'Does it help language learning?', answer: 'Yes. Repetition and short audio groups make it useful for vocabulary and reading practice.' },
        { question: 'Can I save projects?', answer: 'Yes. Projects are saved locally in the browser so students can return to a revision session later.' }
      ]
    };
    const mainEntity = (faqs[routeKey] || faqs['']).map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }));
    setJsonLd({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity });
  }
  function updateMeta(routeKey = '') {
    const meta = ROUTE_META[routeKey] || ROUTE_META[''];
    document.title = meta.title;
    setMetaTag('description', meta.description, 'name');
    setMetaTag('keywords', 'browser text to speech reader, read pdf aloud online, read notes aloud in browser, student dictation tool, private text to speech tool, browser voice reader', 'name');
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'name');
    setMetaTag('og:title', meta.title, 'property');
    setMetaTag('og:description', meta.description, 'property');
    setMetaTag('og:locale', 'en_US', 'property');
    setMetaTag('twitter:title', meta.title, 'name');
    setMetaTag('twitter:description', meta.description, 'name');
    injectFaqSchema(routeKey);

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
    const target = clean ? `${BASE_PATH || ''}/#/${clean}` : `${BASE_PATH || ''}/`;
    if (USE_HASH) {
      if (location.hash !== (clean ? `#/${clean}` : '')) history.pushState({}, '', target);
    } else {
      const cleanTarget = clean ? `/${clean}` : '/';
      if (location.pathname !== cleanTarget) history.pushState({}, '', cleanTarget);
    }
    handle();
  }
  async function handle() {
    const parts = path().split('/');
    const routeKey = parts[0] || '';
    const blogSlug = routeKey === 'blogs' ? (parts[1] || '') : routeKey;
    if (routeKey !== 'project') window.TTS?.stop();
    updateMeta(routeKey === 'blogs' ? 'blogs' : blogSlug);
    if (!routeKey) return ROUTER_UI.renderHome();
    if (routeKey === 'blogs' && !blogSlug) return ROUTER_UI.renderBlogs();
    if (routeKey === 'blogs' && blogSlug && ['browser-text-to-speech-reader','read-pdf-aloud-online','read-notes-aloud','student-dictation-tool'].includes(blogSlug)) return ROUTER_UI.renderIntentPage(blogSlug);
    if (routeKey === 'browser-text-to-speech-reader' || routeKey === 'read-pdf-aloud-online' || routeKey === 'read-notes-aloud' || routeKey === 'student-dictation-tool') return ROUTER_UI.renderIntentPage(routeKey);
    if (routeKey === 'projects') return ROUTER_UI.renderProjects();
    if (routeKey === 'project' && parts[1]) return ROUTER_UI.renderProject(parts[1]);
    if (routeKey === 'edit' && parts[1]) return ROUTER_UI.renderHome(parts[1]);
    if (routeKey === 'about') return ROUTER_UI.renderAbout();
    if (routeKey === 'how-to-use') return ROUTER_UI.renderHowToUse();
    if (routeKey === 'privacy') return ROUTER_UI.renderPrivacy();
    navigate('');
    ROUTER_UI.toast('Page not found.', 'danger');
  }
  function init() {
    addEventListener('popstate', handle);
    migrateHashRoute();
    restoreFallbackRoute();
    handle();
  }
  return { navigate, init, handle, updateMeta };
})();
