const getKey = (userId, table) => `bluemoon_user_${userId}_${table}`;

export const loadTable = (userId, table, fallback = []) => {
  if (typeof window === "undefined") return fallback;

  if (!userId) {
    // fallback to old global storage during transition
    const legacy = localStorage.getItem(`bluemoon_${table}`);
    return legacy ? JSON.parse(legacy) : fallback;
  }

  const raw = localStorage.getItem(getKey(userId, table));
  return raw ? JSON.parse(raw) : fallback;
};
