import { create } from "zustand";
import {
  loadTable,
  saveTable,
  loadGlobalTable,
  saveGlobalTable,
} from "../utils/localUserDb";
import { enqueue } from "../utils/syncQueue";
import { startSync, stopSync } from "../utils/syncEngine";

const tables = [
  "apartments",
  "residents",
  "vehicles",
  "bills",
  "fee_types",
  "users",
  "absence_logs",
];

const GLOBAL_TABLES = ["users", "apartments", "fee_types"];

export const useDbStore = create((set, get) => {
  const tableActions = tables.reduce((acc, key) => {
    acc[`add${key}`] = (item) =>
      set((state) => ({
        [key]: [...state[key], { ...item, id: item.id || crypto.randomUUID() }],
      }));

    acc[`update${key}`] = (id, updates) =>
      set((state) => ({
        [key]: state[key].map((x) => (x.id === id ? { ...x, ...updates } : x)),
      }));

    acc[`delete${key}`] = (id) =>
      set((state) => ({
        [key]: state[key].filter((x) => x.id !== id),
      }));

    return acc;
  }, {});

  return {
    userId: null,
    ready: false,
    lastSyncedAt: null,

    apartments: [],
    residents: [],
    vehicles: [],
    bills: [],
    fee_types: [],
    users: [],
    absence_logs: [],

    init: async (userId) => {
      const uid = userId ? String(userId) : null;

      // 1. Always load Global Data (needed for Login/Apartments)
      const globalData = {};
      GLOBAL_TABLES.forEach((key) => {
        globalData[key] = loadGlobalTable(key, []);
      });

      // 2. If NO userId, we are in "Guest Mode".
      // We set ready: true so the Login screen works, but we stop here.
      if (!uid) {
        set({ ready: true, userId: null, ...globalData });
        return;
      }

      // 3. If we HAVE a userId, load their specific data
      const localData = {};
      tables.forEach((key) => {
        if (GLOBAL_TABLES.includes(key)) return;
        localData[key] = loadTable(uid, key, []);
      });

      set({ userId: uid, ready: true, ...globalData, ...localData });

      // 4. Start Syncing
      const userTables = tables.filter((t) => !GLOBAL_TABLES.includes(t));
      await startSync(uid, userTables, GLOBAL_TABLES, (updates) => {
        set((prev) => ({ ...prev, ...updates, lastSyncedAt: Date.now() }));
      });
    },

    cleanup: () => {
      stopSync();
      set({
        userId: null,
        ready: false,
        lastSyncedAt: null,
        residents: [],
        vehicles: [],
        bills: [],
        absence_logs: [],
      });
    },

    syncNow: async () => {
      set({ syncing: true });
      // We need to import syncNow from syncEngine if we want to trigger it manually
      // For now, we rely on the interval.
      set({ syncing: false, lastSyncedAt: Date.now() });
    },

    ...tableActions,
  };
});

// Monkey-patch setState to auto-save changes
const originalSetState = useDbStore.setState;

useDbStore.setState = (partial, replace) => {
  const oldState = useDbStore.getState();
  originalSetState(partial, replace);
  const newState = useDbStore.getState();
  const userId = newState.userId;

  // If no user is logged in, we generally don't want to save state changes
  // (Guest mode is effectively read-only for this architecture)
  if (!userId) return;

  for (const table of tables) {
    const oldTable = oldState[table];
    const newTable = newState[table];

    // Simple reference check to see if the array changed
    if (oldTable !== newTable) {
      if (GLOBAL_TABLES.includes(table)) {
        // Save Global Tables to LocalStorage
        // NOTE: We do NOT enqueue global tables. The syncEngine handles them
        // in its global interval loop separately.
        saveGlobalTable(table, newTable);
      } else {
        // Save User Tables to LocalStorage AND Enqueue for Firebase sync
        saveTable(userId, table, newTable);
        enqueue(userId, table);
      }
    }
  }
};
