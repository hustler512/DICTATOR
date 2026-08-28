const ROUTER_UI = window.UI;
window.Router = (() => {
  function path() { return location.hash.replace(/^#\/?/, '') || ''; }
  function navigate(value) { location.hash = `#/${value.replace(/^\//, '')}`; }
  async function handle() { const parts = path().split('/'); if (parts[0] !== 'project') window.TTS?.stop(); if (!parts[0]) return ROUTER_UI.renderHome(); if (parts[0] === 'projects') return ROUTER_UI.renderProjects(); if (parts[0] === 'project' && parts[1]) return ROUTER_UI.renderProject(parts[1]); if (parts[0] === 'edit' && parts[1]) return ROUTER_UI.renderHome(parts[1]); if (parts[0] === 'about') return ROUTER_UI.renderAbout(); if (parts[0] === 'how-to-use') return ROUTER_UI.renderHowToUse(); if (parts[0] === 'privacy') return ROUTER_UI.renderPrivacy(); navigate(''); ROUTER_UI.toast('Page not found.', 'danger'); }
  function init() { addEventListener('hashchange', handle); handle(); }
  return { navigate, init, handle };
})();
