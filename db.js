const DB_CONFIG = { name: 'DictatorDB', version: 2, store: 'projects', voices: 'voiceModels' };
let dbPromise;
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
  const now = Date.now(); const project = { id: crypto.randomUUID(), ...projectData, createdAt: now, updatedAt: now };
  store.add(project); await transactionPromise(transaction); return project;
}
async function getProject(id) { const db = await openDB(); return requestPromise(db.transaction(DB_CONFIG.store).objectStore(DB_CONFIG.store).get(id)); }
async function updateProject(id, updates) {
  const existing = await getProject(id); if (!existing) throw new Error('PROJECT_NOT_FOUND');
  const db = await openDB(); const transaction = db.transaction(DB_CONFIG.store, 'readwrite'); const updated = { ...existing, ...updates, updatedAt: Date.now() };
  transaction.objectStore(DB_CONFIG.store).put(updated); await transactionPromise(transaction); return updated;
}
async function deleteProject(id) { const db = await openDB(); const transaction = db.transaction(DB_CONFIG.store, 'readwrite'); transaction.objectStore(DB_CONFIG.store).delete(id); await transactionPromise(transaction); }
async function listProjects(limit = 20) { const db = await openDB(); const values = await requestPromise(db.transaction(DB_CONFIG.store).objectStore(DB_CONFIG.store).getAll()); return values.sort((a,b) => b.updatedAt - a.updatedAt).slice(0, limit); }
async function getProjectCount() { const db = await openDB(); return requestPromise(db.transaction(DB_CONFIG.store).objectStore(DB_CONFIG.store).count()); }
async function getVoiceModel(key) { const db = await openDB(); return requestPromise(db.transaction(DB_CONFIG.voices).objectStore(DB_CONFIG.voices).get(key)); }
async function saveVoiceModel(model) { const db = await openDB(); const transaction = db.transaction(DB_CONFIG.voices, 'readwrite'); transaction.objectStore(DB_CONFIG.voices).put(model); await transactionPromise(transaction); return model; }
