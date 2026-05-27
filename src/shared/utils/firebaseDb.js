import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const getRef = (userId, table) =>
  doc(db, "users", String(userId), "tables", table);

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
