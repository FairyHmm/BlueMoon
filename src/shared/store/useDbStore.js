import { create } from "zustand";
import { persist } from "zustand/middleware";
import mockDB from "../data/mockData.json";

const tables = Object.keys(mockDB);

const toPascal = (str) =>
  str.replace(/(^\w|_\w)/g, (match) => match.replace("_", "").toUpperCase());

// Generate CRUD actions dynamically
const createActions = (set) => {
  return tables.reduce((actions, key) => {
    const Name = toPascal(key);

    actions[`add${Name}`] = (item) =>
      set((state) => ({
        [key]: [...state[key], { ...item, id: item.id || crypto.randomUUID() }],
      }));

    actions[`update${Name}`] = (id, updates) =>
      set((state) => ({
        [key]: state[key].map((x) => (x.id === id ? { ...x, ...updates } : x)),
      }));

    actions[`delete${Name}`] = (id) =>
      set((state) => ({
        [key]: state[key].filter((x) => x.id !== id),
      }));

    // Explicitly merge incoming state data
    actions[`set${Name}`] = (data) =>
      set((state) => ({
        ...state,
        [key]: typeof data === 'function' ? data(state[key]) : data
      }));

    return actions;
  }, {});
};

// INITIALIZE FACTORY: Safely load initial data per key from localStorage, falling back to mockDB
const getInitialState = () => {
  const initialState = {};
  tables.forEach((key) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`bluemoon_${key}`);
      initialState[key] = stored ? JSON.parse(stored) : mockDB[key];
    } else {
      initialState[key] = mockDB[key];
    }
  });
  return initialState;
};

export const useDbStore = create(
  persist(
    (set) => ({
      ...getInitialState(),
      ...createActions(set),
    }),
    {
      name: "bluemoon-storage",
      // PARTIALIZE tells Zustand exactly how to intercept and save your data split up into keys
      partialize: (state) => {
        tables.forEach((key) => {
          if (state[key] !== undefined) {
            localStorage.setItem(`bluemoon_${key}`, JSON.stringify(state[key]));
          }
        });
        // Return an empty object to the main storage name so it doesn't duplicate space
        return {};
      },
    }
  )
);
