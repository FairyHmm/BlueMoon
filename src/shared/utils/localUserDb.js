const getKey = (userId, table) => `bluemoon_user_${userId}_${table}`;
const getTsKey = (userId, table) => `bluemoon_user_${userId}_${table}_ts`;

const migrateFromPersist = (userId, table) => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("bluemoon-storage");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    const data = parsed?.state?.[table];
    if (Array.isArray(data)) {
      localStorage.setItem(getKey(userId, table), JSON.stringify(data));
      return data;
    }
  } catch (e) {
    // Silent migration failure
  }
  return null;
};

export const loadTable = (userId, table, fallback = []) => {
  if (typeof window === "undefined") return fallback;

  if (!userId) {
    const legacy = localStorage.getItem(`bluemoon_${table}`);
    return legacy ? JSON.parse(legacy) : fallback;
  }

  const raw = localStorage.getItem(getKey(userId, table));
  if (raw) return JSON.parse(raw);

  const migrated = migrateFromPersist(userId, table);
  if (migrated) return migrated;

  return fallback;
};

export const saveTable = (userId, table, data) => {
  if (typeof window === "undefined") return;
  if (!userId) return;
  localStorage.setItem(getKey(userId, table), JSON.stringify(data));
};

export const loadTimestamp = (userId, table) => {
  if (typeof window === "undefined") return 0;
  if (!userId) return 0;
  const raw = localStorage.getItem(getTsKey(userId, table));
  return raw ? parseInt(raw, 10) : 0;
};

export const saveTimestamp = (userId, table, ts) => {
  if (typeof window === "undefined") return;
  if (!userId) return;
  localStorage.setItem(getTsKey(userId, table), String(ts));
};

export const loadGlobalTable = (table, fallback = []) => {
  if (typeof window === "undefined") return fallback;

  const raw = localStorage.getItem(`bluemoon_global_${table}`);
  if (raw) return JSON.parse(raw);

  const legacy = localStorage.getItem(`bluemoon_${table}`);
  if (legacy) {
    localStorage.setItem(`bluemoon_global_${table}`, legacy);
    return JSON.parse(legacy);
  }

  const persist = localStorage.getItem("bluemoon-storage");
  if (persist) {
    try {
      const parsed = JSON.parse(persist);
      const data = parsed?.state?.[table];
      if (Array.isArray(data)) {
        localStorage.setItem(`bluemoon_global_${table}`, JSON.stringify(data));
        return data;
      }
    } catch (e) {}
  }

  return fallback;
};

export const saveGlobalTable = (table, data) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(`bluemoon_global_${table}`, JSON.stringify(data));
};
