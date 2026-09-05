const DB_CONFIG = { name: 'DictatorDB', version: 2, store: 'projects', voices: 'voiceModels' };
let dbPromise;

function normalizeProject(project) {
  const rawText = String(project?.rawText || '');
  const tokens = Array.isArray(project?.tokens) && project.tokens.length ? project.tokens : tokenize(rawText);
  const structure = Array.isArray(project?.structure) && project.structure.length ? project.structure : detectStructure(rawText.split(/\r?\n/));
  const config = project?.config || {};
  const wordsPerGroup = Math.max(1, Number(config.wordsPerGroup) || 6);
  const groups = Array.isArray(project?.groups) && project.groups.length ? project.groups : createGroups(tokens, wordsPerGroup, structure);
  return {
    ...project,
    rawText,
    wordCount: Number(project?.wordCount) || tokens.length,
    tokens,
    structure,
    groups,
    config: {
      wordsPerGroup,
      repetitions: Number(config.repetitions) || 2,
      speed: Number(config.speed) || .9,
      pauseDuration: Number(config.pauseDuration) || .8,
      language: config.language || 'en',
      ...config,
      wordsPerGroup,
      repetitions: Number(config.repetitions) || 2,
      speed: Number(config.speed) || .9,
      pauseDuration: Number(config.pauseDuration) || .8,
      language: config.language || 'en'
    }
  };
}

function compactProject(project) {
  const compact = { ...project };
  delete compact.tokens;
  delete compact.groups;
  delete compact.structure;
  delete compact.wordCount;
  if (compact.progress) {
    compact.progress = {
      currentGroupIndex: Number(compact.progress.currentGroupIndex) || 0,
      currentRepeat: Number(compact.progress.currentRepeat) || 1,
      isPlaying: Boolean(compact.progress.isPlaying),
      lastWordSpoken: String(compact.progress.lastWordSpoken || '')
    };
  }
  return compact;
}

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_CONFIG.store)) {
        const store = db.createObjectStore(DB_CONFIG.store, { keyPath: 'id' });
        store.createIndex('updatedAt', 'updatedAt', { unique: false });
        store.createIndex('name', 'name', { unique: false });
      }
      if (!db.objectStoreNames.contains(DB_CONFIG.voices)) db.createObjectStore(DB_CONFIG.voices, { keyPath: 'key' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}
function requestPromise(request) { return new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); }); }
function transactionPromise(transaction) { return new Promise((resolve, reject) => { transaction.oncomplete = () => resolve(); transaction.onerror = () => reject(transaction.error); transaction.onabort = () => reject(transaction.error || new Error('Transaction aborted')); }); }
async function createProject(projectData) {
  const db = await openDB(); const transaction = db.transaction(DB_CONFIG.store, 'readwrite'); const store = transaction.objectStore(DB_CONFIG.store);
  const count = await requestPromise(store.count()); if (count >= 20) throw new Error('STORAGE_FULL');
  const now = Date.now();
  const project = normalizeProject({ id: crypto.randomUUID(), ...projectData, createdAt: now, updatedAt: now });
  store.add(compactProject(project));
  await transactionPromise(transaction);
  return project;
}
async function getProject(id, options = {}) {
  const includeDeleted = Boolean(options.includeDeleted);
  const db = await openDB();
  const project = await requestPromise(db.transaction(DB_CONFIG.store).objectStore(DB_CONFIG.store).get(id));
  if (!project) return null;
  if (!includeDeleted && project.deletedAt) return null;
  return normalizeProject(project);
}
async function updateProject(id, updates) {
  const existing = await getProject(id, { includeDeleted: true }); if (!existing) throw new Error('PROJECT_NOT_FOUND');
  const db = await openDB(); const transaction = db.transaction(DB_CONFIG.store, 'readwrite');
  const updated = normalizeProject({ ...existing, ...updates, updatedAt: Date.now() });
  transaction.objectStore(DB_CONFIG.store).put(compactProject(updated));
  await transactionPromise(transaction);
  return updated;
}
async function deleteProject(id) {
  const existing = await getProject(id, { includeDeleted: true }); if (!existing) throw new Error('PROJECT_NOT_FOUND');
  return updateProject(id, { deletedAt: Date.now() });
}
async function restoreProject(id) {
  const existing = await getProject(id, { includeDeleted: true }); if (!existing) throw new Error('PROJECT_NOT_FOUND');
  return updateProject(id, { deletedAt: null });
}
async function listProjects(limit = 20) {
  const db = await openDB();
  const values = await requestPromise(db.transaction(DB_CONFIG.store).objectStore(DB_CONFIG.store).getAll());
  return values.filter(project => !project.deletedAt).map(normalizeProject).sort((a,b) => b.updatedAt - a.updatedAt).slice(0, limit);
}
async function getProjectCount() {
  const db = await openDB();
  const values = await requestPromise(db.transaction(DB_CONFIG.store).objectStore(DB_CONFIG.store).getAll());
  return values.filter(project => !project.deletedAt).length;
}
async function exportProjects() {
  const db = await openDB();
  const projects = await requestPromise(db.transaction(DB_CONFIG.store).objectStore(DB_CONFIG.store).getAll());
  return { format: 'dictate-projects', version: 1, exportedAt: new Date().toISOString(), projects: projects.filter(project => !project.deletedAt).map(compactProject) };
}
async function importProjects(backup) {
  if (!backup || backup.format !== 'dictate-projects' || !Array.isArray(backup.projects)) throw new Error('INVALID_BACKUP');
  const db = await openDB();
  const transaction = db.transaction(DB_CONFIG.store, 'readwrite');
  const store = transaction.objectStore(DB_CONFIG.store);
  const existingCount = await requestPromise(store.count());
  const projects = backup.projects.map(normalizeProject).filter(project => project.id && project.rawText);
  if (existingCount + projects.length > 20) throw new Error('STORAGE_FULL');
  projects.forEach(project => store.put(compactProject(project)));
  await transactionPromise(transaction);
  return projects.length;
}
async function getVoiceModel(key) { const db = await openDB(); return requestPromise(db.transaction(DB_CONFIG.voices).objectStore(DB_CONFIG.voices).get(key)); }
async function saveVoiceModel(model) { const db = await openDB(); const transaction = db.transaction(DB_CONFIG.voices, 'readwrite'); transaction.objectStore(DB_CONFIG.voices).put(model); await transactionPromise(transaction); return model; }

if (typeof globalThis !== 'undefined' && typeof globalThis.indexedDB === 'undefined') {
  const memoryStores = new Map();
  const createStore = (name) => {
    const entries = new Map();
    const store = {
      name,
      getAll() {
        const request = { result: Array.from(entries.values()), onsuccess: null, onerror: null };
        queueMicrotask(() => request.onsuccess && request.onsuccess());
        return request;
      },
      get(key) {
        const request = { result: entries.get(key), onsuccess: null, onerror: null };
        queueMicrotask(() => request.onsuccess && request.onsuccess());
        return request;
      },
      count() {
        const request = { result: entries.size, onsuccess: null, onerror: null };
        queueMicrotask(() => request.onsuccess && request.onsuccess());
        return request;
      },
      add(value) {
        const key = value?.id ?? value?.key;
        entries.set(key, value);
        const request = { result: key, onsuccess: null, onerror: null };
        queueMicrotask(() => request.onsuccess && request.onsuccess());
        return request;
      },
      put(value) {
        const key = value?.id ?? value?.key;
        entries.set(key, value);
        const request = { result: key, onsuccess: null, onerror: null };
        queueMicrotask(() => request.onsuccess && request.onsuccess());
        return request;
      },
      delete(key) {
        entries.delete(key);
        const request = { result: undefined, onsuccess: null, onerror: null };
        queueMicrotask(() => request.onsuccess && request.onsuccess());
        return request;
      },
      createIndex() {}
    };
    memoryStores.set(name, store);
    return store;
  };

  const fakeDatabase = {
    objectStoreNames: {
      contains(name) {
        return memoryStores.has(name);
      }
    },
    createObjectStore(name) {
      return createStore(name);
    },
    transaction(storeName, mode = 'readonly') {
      const store = memoryStores.get(storeName) || createStore(storeName);
      const transaction = {
        mode,
        objectStore(name) {
          return memoryStores.get(name) || createStore(name);
        },
        oncomplete: null,
        onerror: null,
        onabort: null
      };
      queueMicrotask(() => {
        if (transaction.oncomplete) transaction.oncomplete();
      });
      return transaction;
    }
  };

  globalThis.indexedDB = {
    open() {
      const request = {
        result: fakeDatabase,
        onsuccess: null,
        onerror: null,
        onupgradeneeded: null
      };
      queueMicrotask(() => {
        if (typeof request.onupgradeneeded === 'function') request.onupgradeneeded();
        if (typeof request.onsuccess === 'function') request.onsuccess();
      });
      return request;
    }
  };
}

const dbApi = {
  DB_CONFIG,
  openDB,
  requestPromise,
  transactionPromise,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  restoreProject,
  listProjects,
  getProjectCount,
  exportProjects,
  importProjects,
  getVoiceModel,
  saveVoiceModel
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dbApi;
}
if (typeof globalThis !== 'undefined') {
  Object.assign(globalThis, dbApi);
}
