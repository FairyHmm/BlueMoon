import { create } from "zustand";
import { pullAppData, pushAppData, subscribeToAppData } from "../utils/firebaseDb";

const TABLES = [
  "apartments",
  "residents",
  "vehicles",
  "bills",
  "fee_types",
  "users",
  "absence_logs",
];

const toPascal = (str) =>
  str.replace(/(^\w|_\w)/g, (match) => match.replace("_", "").toUpperCase());

// Track tables currently being pushed to avoid snapshot overwriting an in-flight push
const pushing = new Set();

const persistTable = (table, data) => {
  localStorage.setItem(`bluemoon_${table}`, JSON.stringify(data));
  if (typeof navigator !== "undefined" && navigator.onLine) {
    pushing.add(table);
    pushAppData(table, data)
      .catch((err) => console.error("[persist] push failed:", table, err))
      .finally(() => pushing.delete(table));
  }
};

const loadFromCache = () => {
  const state = {};
  TABLES.forEach((key) => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(`bluemoon_${key}`)
        : null;
    state[key] = stored ? JSON.parse(stored) : [];
  });
  return state;
};

const createActions = (set) =>
  TABLES.reduce((actions, key) => {
    const Name = toPascal(key);

    actions[`add${Name}`] = (item) =>
      set((state) => {
        const updated = [
          ...state[key],
          { ...item, id: item.id || crypto.randomUUID() },
        ];
        persistTable(key, updated);
        return { [key]: updated };
      });

    actions[`update${Name}`] = (id, updates) =>
      set((state) => {
        const updated = state[key].map((x) =>
          x.id == id ? { ...x, ...updates } : x
        );
        persistTable(key, updated);
        return { [key]: updated };
      });

    actions[`delete${Name}`] = (id) =>
      set((state) => {
        const updated = state[key].filter((x) => x.id != id);
        persistTable(key, updated);
        return { [key]: updated };
      });

    actions[`set${Name}`] = (data) =>
      set((state) => {
        const updated =
          typeof data === "function" ? data(state[key]) : data;
        persistTable(key, updated);
        return { [key]: updated };
      });

    return actions;
  }, {});

let snapshotUnsubs = [];

export const useDbStore = create((set) => ({
  ...loadFromCache(),
  ready: false,

  ...createActions(set),

  init: async () => {
    snapshotUnsubs.forEach((u) => u());
    snapshotUnsubs = [];

    // Pull fresh data from Firebase on load
    if (typeof navigator !== "undefined" && navigator.onLine) {
      await Promise.all(
        TABLES.map(async (table) => {
          const data = await pullAppData(table);
          if (data) {
            localStorage.setItem(`bluemoon_${table}`, JSON.stringify(data));
            set({ [table]: data });
          }
        })
      );
    }

    // Subscribe to real-time updates, skip if a push is in flight
    TABLES.forEach((table) => {
      const unsub = subscribeToAppData(table, (data) => {
        if (pushing.has(table)) return;
        localStorage.setItem(`bluemoon_${table}`, JSON.stringify(data));
        set({ [table]: data });
      });
      snapshotUnsubs.push(unsub);
    });

    set({ ready: true });
  },

  cleanup: () => {
    snapshotUnsubs.forEach((u) => u());
    snapshotUnsubs = [];
    set({ ready: false });
  },
}));

// Intercept direct useDbStore.setState calls (from hooks/actions that bypass store actions)
// and make sure they also persist to Firebase
const originalSetState = useDbStore.setState;

useDbStore.setState = (partial, replace) => {
  originalSetState(partial, replace);
  const newState = useDbStore.getState();
  const updates =
    typeof partial === "function" ? partial(newState) : partial;

  for (const table of TABLES) {
    if (table in updates) {
      persistTable(table, newState[table]);
    }
  }
};
