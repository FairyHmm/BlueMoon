import { create } from "zustand";
import { persist } from "zustand/middleware";
import mockDB from "../data/mockData.json";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // Stores the full user object { id, username, role, resident_id }

      login: (username, password) => {
        // 1. Find user in the mock database
        const foundUser = mockDB.users.find(
          (u) => u.username === username && u.password === password
        );

        if (foundUser) {
          set({ user: foundUser });
          return { success: true };
        }

        return { success: false, message: "Invalid username or password" };
      },

      logout: () => set({ user: null }),
    }),
    {
      name: "bluemoon-auth", // Separate storage key from the main DB
    }
  )
);
