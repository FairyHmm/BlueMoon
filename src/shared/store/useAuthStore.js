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

        // 1. Wait for the database to be ready (Global data loaded)
        if (!db.ready) {
          return { success: false, message: "System loading, please wait..." };
        }

        let usersToCheck = db.users;

        // 2. If online, force a fetch of the 'users' table from Firebase
        // This solves the "I just registered on another device" sync delay
        if (navigator.onLine) {
          try {
            const freshData = await pullAppData("users");
            if (freshData && freshData.data) {
              usersToCheck = freshData.data;
              // Update the local store immediately so the rest of the app sees the new user
              useDbStore.setState({ users: freshData.data });
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

        // 4. Success! Set the user state
        set({ user: foundUser });

        // 5. CRITICAL: Initialize the DB store with this user's ID
        // This loads their specific tables (residents, bills, etc.) and starts syncing
        db.init(foundUser.id);

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
        db.addresidents({
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

        db.addusers(newUser);

        // Optional: Auto-login after register
        set({ user: newUser });
        await db.init(newUser.id);

        return { success: true };
      },

      logout: () => {
        set({ user: null });
        // Note: We do NOT call db.init(null) here manually.
        // The App.jsx subscribe listener will detect user -> null and call db.init(null) for us.
      },
    }),
    {
      name: "bluemoon-auth",
    },
  ),
);
