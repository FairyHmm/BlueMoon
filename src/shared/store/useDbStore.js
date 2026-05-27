import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loadTable } from "../utils/localUserDb";
import mockDB from "../data/mockData.json";

const tables = Object.keys(mockDB);

const toPascal = (str) =>
  str.replace(/(^\w|_\w)/g, (match) => match.replace("_", "").toUpperCase());

// Generate CRUD actions dynamically
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

    // Explicitly merge incoming state data
    actions[`set${Name}`] = (data) =>
      set((state) => {
        const value = typeof data === "function" ? data(state[key]) : data;

        get().save(key, value);
        return { [key]: value };
      });

    return actions;
  }, {});
};

// INITIALIZE FACTORY: Safely load initial data per key from localStorage, falling back to mockDB
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

      init: (userId) => {
        const nextState = {};

        tables.forEach((key) => {
          nextState[key] = loadTable(userId, key, mockDB[key]);
        });

        set({
          userId,
          ...nextState,
        });
      },

      getUserId: () => get().userId,

      save: (table, data) => {
        const userId = get().getUserId();

        if (!userId) return;

        localStorage.setItem(
          `bluemoon_user_${userId}_${table}`,
          JSON.stringify(data),
        );
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
