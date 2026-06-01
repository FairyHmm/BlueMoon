import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useDbStore } from "./useDbStore";
import { pullAppData } from "../utils/firebaseDb";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,

      login: async (username, password) => {
        const db = useDbStore.getState();

        // 1. Wait for the database to be ready
        if (!db.ready) {
          return { success: false, message: "System loading, please wait..." };
        }

        let usersToCheck = db.users;

        // 2. If online, force a fresh fetch of users from Firebase
        // This solves the "I just registered on another device" sync delay
        if (navigator.onLine) {
          try {
            const freshData = await pullAppData("users");
            if (freshData && Array.isArray(freshData)) {
              usersToCheck = freshData;
              useDbStore.setState({ users: freshData });
            }
          } catch (err) {
            console.error(
              "Login: Failed to fetch fresh users, using local cache",
              err,
            );
          }
        }

        // 3. Check credentials
        const foundUser = usersToCheck.find(
          (u) => u.username === username && u.password_hash === password,
        );

        if (!foundUser) {
          return { success: false, message: "Invalid credentials" };
        }

        // 4. Success
        set({ user: foundUser });
        db.init();

        return { success: true };
      },

      register: async (displayName, username, password, apartmentId) => {
        const db = useDbStore.getState();

        if (!db.ready) {
          return { success: false, message: "System loading..." };
        }

        // Check username availability
        const existingUser = db.users.find((u) => u.username === username);
        if (existingUser) {
          return { success: false, message: "Username taken" };
        }

        // Validate apartment
        const apartment = db.apartments.find((a) => a.id === apartmentId);
        if (!apartment) {
          return { success: false, message: "Invalid apartment" };
        }

        const newResidentId = crypto.randomUUID();

        // Add Resident
        db.addResidents({
          id: newResidentId,
          apartment_id: apartmentId,
          name: displayName,
          is_head: false,
          status: "pending",
        });

        // Add User
        const newUser = {
          id: crypto.randomUUID(),
          username,
          password_hash: password, // TODO: Hash this in production
          role: "resident",
          resident_id: newResidentId,
        };

        db.addUsers(newUser);

        // Auto-login after register
        set({ user: newUser });
        await db.init();

        return { success: true };
      },

      logout: () => {
        set({ user: null });
        // App.jsx subscribe listener will detect user -> null and call db.init() for us
      },
    }),
    {
      name: "bluemoon-auth",
    },
  ),
);
