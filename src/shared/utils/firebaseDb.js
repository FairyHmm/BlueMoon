import { db } from "../config/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const getRef = (table) => doc(db, "app_data", table);

export const pullAppData = async (table) => {
  try {
    const snap = await getDoc(getRef(table));
    if (!snap.exists()) return null;
    const { value } = snap.data();
    return Array.isArray(value) ? value : [];
  } catch (err) {
    console.error("[Firebase] App Data Pull error:", table, err);
    return null;
  }
};

export const pushAppData = async (table, data) => {
  try {
    await setDoc(getRef(table), {
      value: Array.isArray(data) ? data : [],
      updatedAt: Date.now(),
    });
    return true;
  } catch (err) {
    console.error("[Firebase] App Data Push error:", table, err);
    return false;
  }
};

export const subscribeToAppData = (table, onChange) => {
  return onSnapshot(
    getRef(table),
    (snap) => {
      if (!snap.exists()) return;
      const { value } = snap.data();
      if (Array.isArray(value)) onChange(value);
    },
    (err) => console.error("[Firebase] Snapshot error:", table, err)
  );
};
