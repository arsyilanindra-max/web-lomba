// ---- Helpers localStorage ----

function storageKey(entity) {
  return `b44_${entity}`;
}

function readAll(entity) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(entity)) || '[]');
  } catch {
    return [];
  }
}

function writeAll(entity, records) {
  localStorage.setItem(storageKey(entity), JSON.stringify(records));
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ---- Entity factory ----

function makeEntity(name) {
  return {
    list(sort, limit) {
      let records = readAll(name);
      if (limit) records = records.slice(0, limit);
      return Promise.resolve(records);
    },
    filter(query = {}, sort, limit) {
      let records = readAll(name).filter((r) =>
        Object.entries(query).every(([k, v]) => r[k] === v)
      );
      if (limit) records = records.slice(0, limit);
      return Promise.resolve(records);
    },
    get(id) {
      const record = readAll(name).find((r) => r.id === id);
      return Promise.resolve(record || null);
    },
    create(data) {
      const records = readAll(name);
      const newRecord = {
        ...data,
        id: genId(),
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      };
      records.push(newRecord);
      writeAll(name, records);
      return Promise.resolve(newRecord);
    },
    bulkCreate(dataArr) {
      const records = readAll(name);
      const created = dataArr.map((data) => ({
        ...data,
        id: genId(),
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      }));
      writeAll(name, [...records, ...created]);
      return Promise.resolve(created);
    },
    update(id, data) {
      const records = readAll(name).map((r) =>
        r.id === id ? { ...r, ...data, updated_date: new Date().toISOString() } : r
      );
      writeAll(name, records);
      const updated = records.find((r) => r.id === id);
      return Promise.resolve(updated);
    },
    delete(id) {
      writeAll(name, readAll(name).filter((r) => r.id !== id));
      return Promise.resolve({ id });
    },
    schema() {
      return Promise.resolve({});
    },
    subscribe() {
      // No-op untuk standalone
      return () => {};
    },
  };
}

// ---- Auth ----

const AUTH_KEY = 'b44_current_user';

const auth = {
  me() {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return Promise.reject(new Error('Tidak ada pengguna yang masuk.'));
    return Promise.resolve(JSON.parse(raw));
  },
  isAuthenticated() {
    return Promise.resolve(!!localStorage.getItem(AUTH_KEY));
  },
  updateMe(data) {
    const raw = localStorage.getItem(AUTH_KEY);
    const user = raw ? JSON.parse(raw) : {};
    const updated = { ...user, ...data };
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
    return Promise.resolve(updated);
  },
  logout(redirectUrl) {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = redirectUrl || '/';
  },
  redirectToLogin() {
    window.location.href = '/';
  },
};

// ---- Integrations (stub) ----
// Ganti implementasi di bawah sesuai kebutuhan jika ingin menyambung ke API eksternal

const integrations = {
  Core: {
    InvokeLLM({ prompt } = {}) {
      console.warn('[Standalone] InvokeLLM stub dipanggil dengan prompt:', prompt);
      return Promise.resolve({ result: '(LLM tidak tersedia di mode standalone)' });
    },
    SendEmail({ to, subject, body } = {}) {
      console.warn('[Standalone] SendEmail stub:', { to, subject, body });
      return Promise.resolve({ success: true });
    },
    UploadFile({ file } = {}) {
      // Membuat object URL sementara dari file yang diunggah
      const url = URL.createObjectURL(file);
      return Promise.resolve({ file_url: url });
    },
    GenerateImage({ prompt } = {}) {
      console.warn('[Standalone] GenerateImage stub dipanggil dengan prompt:', prompt);
      return Promise.resolve({ url: '' });
    },
    ExtractDataFromUploadedFile() {
      return Promise.resolve({ status: 'error', details: 'Tidak tersedia di mode standalone' });
    },
  },
};

// ---- Analytics (stub) ----

const analytics = {
  track({ eventName, properties } = {}) {
    console.log('[Analytics]', eventName, properties);
  },
};

// ---- Users ----

const users = {
  inviteUser(email, role) {
    console.warn('[Standalone] inviteUser stub:', email, role);
    return Promise.resolve({ success: true });
  },
};

// ---- Agents (stub) ----

const agents = {
  createConversation() { return Promise.resolve({ id: genId(), messages: [] }); },
  listConversations() { return Promise.resolve([]); },
  getConversation(id) { return Promise.resolve({ id, messages: [] }); },
  updateConversation() { return Promise.resolve({}); },
  addMessage(conversation, message) {
    return Promise.resolve({ ...conversation, messages: [...(conversation.messages || []), message] });
  },
  subscribeToConversation() { return () => {}; },
  getWhatsAppConnectURL(name) { return `https://wa.me/?text=Halo+${name}`; },
  getTelegramConnectURL(name) { return `https://t.me/${name}`; },
};

// ---- Proxy agar base44.entities.NamaEntity bekerja otomatis ----

const entitiesProxy = new Proxy({}, {
  get(_, entityName) {
    return makeEntity(entityName);
  },
});

// ---- Export utama ----

export const base44 = {
  entities: entitiesProxy,
  auth,
  integrations,
  analytics,
  users,
  agents,
};