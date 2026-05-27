import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loadTable, saveTable } from "../utils/firebaseDb";
import mockDB from "../data/mockData.json";

const tables = Object.keys(mockDB);

const toPascal = (str) =>
  str.replace(/(^\w|_\w)/g, (match) => match.replace("_", "").toUpperCase());

// --------------------
// CRUD
// --------------------
const createActions = (set, get) => {
  return tables.reduce((actions, key) => {
    const Name = toPascal(key);

    actions[`add${Name}`] = (item) =>
      set((state) => {
        const updated = [
          ...state[key],
          { ...item, id: item.id || crypto.randomUUID() },
        ];

        get().save(key, updated);
        return { [key]: updated };
      });

    actions[`update${Name}`] = (id, updates) =>
      set((state) => {
        const updated = state[key].map((x) =>
          x.id === id ? { ...x, ...updates } : x,
        );

        get().save(key, updated);
        return { [key]: updated };
      });

    actions[`delete${Name}`] = (id) =>
      set((state) => {
        const updated = state[key].filter((x) => x.id !== id);

        get().save(key, updated);
        return { [key]: updated };
      });

    actions[`set${Name}`] = (data) =>
      set((state) => {
        const value = typeof data === "function" ? data(state[key]) : data;

        get().save(key, value);
        return { [key]: value };
      });

    return actions;
  }, {});
};

// --------------------
// STORE
// --------------------
export const useDbStore = create(
  persist(
    (set, get) => ({
      userId: null,

      apartments: [],
      residents: [],
      vehicles: [],
      bills: [],
      fee_types: [],
      users: [],
      absence_logs: [],

      isReady: false,

      // --------------------
      // FIXED INIT (AWAIT ALL DATA)
      // --------------------
      init: async (userId) => {
        const uid = userId ? String(userId) : null;

        const results = await Promise.all(
          tables.map(async (key) => {
            const data = await loadTable(uid, key, mockDB[key]);
            return [key, Array.isArray(data) ? data : []];
          }),
        );

        const next = {};
        results.forEach(([key, data]) => {
          next[key] = data;
        });

        set({
          userId: uid,
          ...next,
          isReady: true,
        });
      },

      getUserId: () => get().userId,

      save: (table, data) => {
        const userId = get().getUserId();
        if (!userId) return;

        saveTable(userId, table, data);
      },

      ...createActions(set, get),
    }),
    {
      name: "bluemoon-storage",

      partialize: (state) => {
        const cleaned = {};
        tables.forEach((key) => {
          cleaned[key] = state[key];
        });
        return cleaned;
      },
    },
  ),
);
