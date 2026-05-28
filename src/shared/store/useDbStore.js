import { create } from "zustand";
import {
  loadTable,
  saveTable,
  loadGlobalTable,
  saveGlobalTable,
} from "../utils/localUserDb";
import { enqueue } from "../utils/syncQueue";
import {
  startSync,
  stopSync,
  syncNow as runSyncNow,
} from "../utils/syncEngine";

const tables = [
  "apartments",
  "residents",
  "vehicles",
  "bills",
  "fee_types",
  "users",
  "absence_logs",
];

const GLOBAL_TABLES = [
  "users",
  "apartments",
  "fee_types",
  "residents",
  "vehicles",
  "bills",
  "absence_logs",
];

export const useDbStore = create((set, get) => {
  // Dynamically create CRUD and Setter actions for every table
  const tableActions = tables.reduce((acc, key) => {
    acc[`add${key}`] = (item) =>
      set((state) => ({
        [key]: [
          ...(state[key] || []),
          { ...item, id: item.id || crypto.randomUUID() },
        ],
      }));

    acc[`update${key}`] = (id, updates) =>
      set((state) => ({
        [key]: (state[key] || []).map((x) =>
          x.id === id ? { ...x, ...updates } : x,
        ),
      }));

    acc[`delete${key}`] = (id) =>
      set((state) => ({
        [key]: (state[key] || []).filter((x) => x.id !== id),
      }));

    // FIX: Add "set" actions (e.g., setResidents) so external files work
    acc[`set${key}`] = (data) => set({ [key]: data });

    return acc;
  }, {});

  return {
    // State
    userId: null,
    ready: false,
    syncing: false, // Added missing state
    lastSyncedAt: null,

    // Initial Data (Empty Arrays)
    apartments: [],
    residents: [],
    vehicles: [],
    bills: [],
    fee_types: [],
    users: [],
    absence_logs: [],

    // Logic
    init: async (userId) => {
      const uid = userId ? String(userId) : null;

      // 1. Load Global Data
      const globalData = {};
      GLOBAL_TABLES.forEach((key) => {
        globalData[key] = loadGlobalTable(key, []);
      });

      // 2. Guest Mode
      if (!uid) {
        set({ ready: true, userId: null, ...globalData });
        return;
      }

      // 3. User Mode
      const localData = {};
      tables.forEach((key) => {
        if (GLOBAL_TABLES.includes(key)) return;
        localData[key] = loadTable(uid, key, []);
      });

      set({ userId: uid, ready: true, ...globalData, ...localData });

      // 4. Start Sync
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
      await runSyncNow();
      set({ syncing: false, lastSyncedAt: Date.now() });
    },

    // Spread the generated actions
    ...tableActions,
  };
});

// Monkey-patch setState to auto-save changes and trigger sync
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

    // Skip sync if it's the absolute first load (undefined -> empty)
    // Or if newTable is undefined (protects against errors)
    if (!oldTable && (!newTable || newTable.length === 0)) continue;

    if (oldTable !== newTable) {
      if (GLOBAL_TABLES.includes(table)) {
        saveGlobalTable(table, newTable);
      } else {
        saveTable(userId, table, newTable);
        enqueue(userId, table);
      }
    }
  }

  // Immediate Sync Trigger
  if (navigator.onLine) {
    runSyncNow();
  }
};
