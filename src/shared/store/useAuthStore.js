import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useDbStore } from "./useDbStore";

const toEmail = (username) => `${username}@bluemoon.internal`;

export const useAuthStore = create((set, get) => ({
  user: null,
  ready: false, // true once onAuthStateChanged has fired at least once

  // Called once from App.jsx on mount — listens for Firebase Auth state changes
initAuth: () => {
  const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // Init db first so users are loaded
      await useDbStore.getState().init();

      // Now look up the app user
      const db = useDbStore.getState();
      const username = firebaseUser.email.replace("@bluemoon.internal", "");
      const appUser =
        db.users.find((u) => u.firebase_uid === firebaseUser.uid) ||
        db.users.find((u) => u.username === username); // fallback for migrated users

      // Auto-patch firebase_uid if missing (one-time per user)
      if (appUser && !appUser.firebase_uid) {
        db.updateUsers(appUser.id, { firebase_uid: firebaseUser.uid });
      }

      set({ user: appUser || null, ready: true });
    } else {
      await useDbStore.getState().init();
      set({ user: null, ready: true });
    }
  });
  return unsub;
},

  login: async (username, password) => {
    try {
      await signInWithEmailAndPassword(auth, toEmail(username), password);
      // onAuthStateChanged will handle setting user + init db
      return { success: true };
    } catch (err) {
      console.error("[Auth] Login error:", err.code);
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          return { success: false, message: "Thông tin đăng nhập không hợp lệ" };
        case "auth/too-many-requests":
          return { success: false, message: "Quá nhiều lần thử, vui lòng thử lại sau" };
        default:
          return { success: false, message: "Đăng nhập thất bại, vui lòng thử lại" };
      }
    }
  },

  register: async (displayName, username, password, apartmentId) => {
    const db = useDbStore.getState();

    if (!db.ready) {
      return { success: false, message: "Hệ thống đang tải..." };
    }

    // Check username availability
    const existingUser = db.users.find((u) => u.username === username);
    if (existingUser) {
      return { success: false, message: "Tên đăng nhập đã được sử dụng" };
    }

    // Validate apartment
    const apartment = db.apartments.find((a) => a.id === apartmentId);
    if (!apartment) {
      return { success: false, message: "Mã căn hộ không hợp lệ" };
    }

    try {
      // Create Firebase Auth account
      const credential = await createUserWithEmailAndPassword(
        auth,
        toEmail(username),
        password
      );

      const newResidentId = crypto.randomUUID();

      // Add Resident
      db.addResidents({
        id: newResidentId,
        apartment_id: apartmentId,
        name: displayName,
        is_head: false,
        status: "pending",
      });

      // Add User (with firebase_uid, no password_hash)
      const newUser = {
        id: crypto.randomUUID(),
        firebase_uid: credential.user.uid,
        username,
        role: "user",
        resident_id: newResidentId,
      };

      db.addUsers(newUser);

      // onAuthStateChanged will handle setting user + init db
      return { success: true };
    } catch (err) {
      console.error("[Auth] Register error:", err.code);
      switch (err.code) {
        case "auth/email-already-in-use":
          return { success: false, message: "Tên đăng nhập đã được sử dụng" };
        case "auth/weak-password":
          return { success: false, message: "Mật khẩu phải có ít nhất 6 ký tự" };
        default:
          return { success: false, message: "Đăng ký thất bại, vui lòng thử lại" };
      }
    }
  },

  logout: async () => {
    await signOut(auth);
    // onAuthStateChanged will handle clearing user + re-init db
  },
}));
