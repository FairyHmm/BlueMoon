import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useDbStore } from "./useDbStore";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,

      login: (username, password) => {
        const users = useDbStore.getState().users || [];

        const foundUser = users.find(
          (u) => u.username === username && u.password_hash === password,
        );

        if (!foundUser) {
          return { success: false, message: "Invalid credentials" };
        }

        set({ user: foundUser });

        return { success: true };
      },

      register: (displayName, username, password, apartmentId) => {
        const db = useDbStore.getState();

        const existingUser = db.users.find((u) => u.username === username);

        if (existingUser) {
          return { success: false, message: "Username taken" };
        }

        const apartment = db.apartments.find((a) => a.id === apartmentId);

        if (!apartment) {
          return { success: false, message: "Invalid apartment" };
        }

        const newResidentId = crypto.randomUUID();

        db.addresidents({
          id: newResidentId,
          apartment_id: apartmentId,
          name: displayName,
          is_head: false,
          status: "pending",
        });

        const newUser = {
          id: crypto.randomUUID(),
          username,
          password_hash: password,
          role: "resident",
          resident_id: newResidentId,
        };

        db.addusers(newUser);

        set({ user: newUser });

        return { success: true };
      },

      logout: () => set({ user: null }),
    }),
    {
      name: "bluemoon-auth",
    },
  ),
);
