import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useDbStore } from "./useDbStore";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,

      login: (username, password) => {
        // 1. Fetch users from the LIVE DB store, not the static JSON
        const users = useDbStore.getState().users;

        const foundUser = users.find(
          (u) => u.username === username && u.password_hash === password,
        );

        if (!foundUser) {
          return { success: false, message: "Invalid credentials" };
        }

        set({ user: foundUser });

        // IMPORTANT: initialize DB AFTER auth is set
        setTimeout(() => {
          useDbStore.getState().init(foundUser.id);
        }, 0);

        return { success: true };
      },

      register: (displayName, username, password, apartmentId) => {
        // 1. Access the current state of the DB
        const db = useDbStore.getState();

        // 2. Check if username exists in the LIVE users list
        const existingUser = db.users.find((u) => u.username === username);
        if (existingUser) {
          return { success: false, message: "Username already taken" };
        }

        // 3. Validate Apartment ID in the LIVE apartments list
        const apartment = db.apartments.find((a) => a.id === apartmentId);
        if (!apartment) {
          return { success: false, message: "Invalid Apartment ID" };
        }

        // 4. Create a NEW Resident
        const newResidentId = crypto.randomUUID();

        const newResident = {
          id: newResidentId,
          apartment_id: apartmentId,
          name: displayName,
          is_head: false,
          status: "pending",
        };

        // 5. Add to DB Store using the dynamically generated action
        db.addResidents(newResident);

        // 6. Create User linked to the NEW Resident
        const newUser = {
          id: crypto.randomUUID(),
          username,
          password_hash: password,
          role: "resident",
          resident_id: newResidentId,
        };

        // 7. Add to DB Store
        db.addUsers(newUser);

        // 8. Log the user in
        set({ user: newUser });

        setTimeout(() => {
          useDbStore.getState().init(newUser.id);
        }, 0);

        return { success: true };
      },

      logout: () => {
        set({ user: null });
        useDbStore.getState().init(null);
      },
    }),
    {
      name: "bluemoon-auth",
    },
  ),
);
