import { create } from "zustand";
import {
  loadTable,
  saveTable,
  loadGlobalTable,
  saveGlobalTable,
} from "../utils/localUserDb";
import { enqueue } from "../utils/syncQueue";
import { startSync, stopSync, syncNow as runSyncNow } from "../utils/syncEngine";
import mockDB from "../data/mockData.json";

const tables = Object.keys(mockDB);
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

    bootstrap: () => {
      const globalData = {};
      GLOBAL_TABLES.forEach((key) => {
        globalData[key] = loadGlobalTable(key, mockDB[key]);
      });
      set(globalData);
    },

    init: async (userId) => {
      const uid = userId ? String(userId) : null;
      if (!uid) {
        set({ ready: false, userId: null });
        return;
      }

      const localData = {};
      tables.forEach((key) => {
        if (GLOBAL_TABLES.includes(key)) return;
        localData[key] = loadTable(uid, key, mockDB[key]);
      });

      set({ userId: uid, ready: true, ...localData });

      const userTables = tables.filter((t) => !GLOBAL_TABLES.includes(t));
      await startSync(uid, userTables, (updates) => {
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
      await runSyncNow();
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

  if (!userId) return;

  for (const table of tables) {
    const oldTable = oldState[table];
    const newTable = newState[table];

    if (oldTable !== newTable) {
      if (GLOBAL_TABLES.includes(table)) {
        saveGlobalTable(table, newTable);
      } else {
        saveTable(userId, table, newTable);
        enqueue(userId, table);
      }
    }
  }
};
