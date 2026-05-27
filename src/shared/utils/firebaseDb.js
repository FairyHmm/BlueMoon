import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const safe = (v) => {
  if (v === undefined || v === null) return null;
  return String(v);
};

const getRef = (userId, table) => {
  const uid = safe(userId);
  const t = safe(table);

  if (!uid || !t) {
    throw new Error(`Invalid Firestore path: userId=${uid}, table=${t}`);
  }

  return doc(db, "users", uid, "tables", t);
};

export const loadTable = async (userId, table, fallback = []) => {
  if (!userId) return fallback;

  try {
    const snap = await getDoc(getRef(userId, table));

    const data = snap.data()?.value;

    return Array.isArray(data) ? data : fallback;
  } catch (err) {
    console.error("Firebase load error:", err);
    return fallback;
  }
};

export const saveTable = async (userId, table, data) => {
  if (!userId) return;

  try {
    await setDoc(getRef(userId, table), {
      value: Array.isArray(data) ? data : [],
      updatedAt: Date.now(),
    });
  } catch (err) {
    console.error("Firebase save error:", err);
  }
};
