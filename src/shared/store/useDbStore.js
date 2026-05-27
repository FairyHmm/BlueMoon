import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loadTable, saveTable } from "../utils/firebaseDb";
import mockDB from "../data/mockData.json";

const tables = Object.keys(mockDB);

const createActions = (set, get) => {
  return tables.reduce((actions, key) => {
    actions[`add${key}`] = (item) =>
      set((state) => {
        const updated = [
          ...state[key],
          { ...item, id: item.id || crypto.randomUUID() },
        ];

        get().save(key, updated);
        return { [key]: updated };
      });

    actions[`update${key}`] = (id, updates) =>
      set((state) => {
        const updated = state[key].map((x) =>
          x.id === id ? { ...x, ...updates } : x,
        );

        get().save(key, updated);
        return { [key]: updated };
      });

    actions[`delete${key}`] = (id) =>
      set((state) => {
        const updated = state[key].filter((x) => x.id !== id);

        get().save(key, updated);
        return { [key]: updated };
      });

    return actions;
  }, {});
};

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

      // 🔥 SIMPLE INIT (NO READY STATE)
      init: async (userId) => {
        const uid = userId ? String(userId) : null;

        const results = await Promise.all(
          tables.map(async (key) => {
            const data = await loadTable(uid, key, mockDB[key]);
            return [key, Array.isArray(data) ? data : []];
          }),
        );

        set({
          userId: uid,
          ...Object.fromEntries(results),
        });
      },

      save: (table, data) => {
        const uid = get().userId;
        if (!uid) return;

        saveTable(uid, table, data);
      },

      ...createActions(set, get),
    }),
    {
      name: "bluemoon-storage",
      partialize: (state) => {
        const cleaned = {};
        tables.forEach((k) => (cleaned[k] = state[k]));
        return cleaned;
      },
    },
  ),
);
