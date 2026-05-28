import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// === USER DATA (Per-user tables) ===
const getRef = (userId, table) =>
  doc(db, "users", String(userId), "tables", table);

export const pullTable = async (userId, table) => {
  if (!userId) return null;
  try {
    const snap = await getDoc(getRef(userId, table));
    if (!snap.exists()) return null;
    const { value, updatedAt } = snap.data();
    return {
      data: Array.isArray(value) ? value : [],
      updatedAt: updatedAt || 0,
    };
  } catch (err) {
    console.error("[Firebase] Pull error:", table, err);
    return null;
  }
};

export const pushTable = async (userId, table, data) => {
  if (!userId) return false;
  try {
    await setDoc(getRef(userId, table), {
      value: Array.isArray(data) ? data : [],
      updatedAt: Date.now(),
    });
    return true;
  } catch (err) {
    console.error("[Firebase] Push error:", table, err);
    return false;
  }
};

// === SHARED DATA (Global tables like users, apartments) ===
const getAppDataRef = (table) => doc(db, "app_data", table);

export const pullAppData = async (table) => {
  try {
    const snap = await getDoc(getAppDataRef(table));
    if (!snap.exists()) return null;
    const { value, updatedAt } = snap.data();
    return {
      data: Array.isArray(value) ? value : [],
      updatedAt: updatedAt || 0,
    };
  } catch (err) {
    console.error("[Firebase] App Data Pull error:", table, err);
    return null;
  }
};

export const pushAppData = async (table, data) => {
  try {
    await setDoc(getAppDataRef(table), {
      value: Array.isArray(data) ? data : [],
      updatedAt: Date.now(),
    });
    return true;
  } catch (err) {
    console.error("[Firebase] App Data Push error:", table, err);
    return false;
  }
};
