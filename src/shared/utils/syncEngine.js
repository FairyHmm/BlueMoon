import { pullTable, pushTable, pullAppData, pushAppData } from "./firebaseDb";
import {
  loadTable as loadLocal,
  saveTable as saveLocal,
  loadGlobalTable as loadGlobalLocal,
  saveGlobalTable as saveGlobalLocal,
  loadTimestamp,
  saveTimestamp,
} from "./localUserDb";
import { dequeue, getPendingForUser } from "./syncQueue";

let syncInterval = null;
let onlineHandler = null;
let activeUserId = null;
let activeTables = null;
let activeGlobalTables = null; // We will store the list here
let onUpdate = null;
let isProcessing = false;

// Global timestamp helpers
const getGlobalTsKey = (table) => `bluemoon_global_${table}_ts`;
const loadGlobalTimestamp = (table) => {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(getGlobalTsKey(table));
  return raw ? parseInt(raw, 10) : 0;
};
const saveGlobalTimestamp = (table, ts) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(getGlobalTsKey(table), String(ts));
};

const processSync = async () => {
  // Check if we have everything we need
  if (!activeUserId || !activeTables || !activeGlobalTables || isProcessing) return;
  if (typeof navigator !== "undefined" && !navigator.onLine) return;

  isProcessing = true;

  try {
    // 1. SYNC PER-USER TABLES (Residents, Bills, etc.)
    const pending = getPendingForUser(activeUserId);
    const pendingTables = new Set(pending.map((p) => p.table));

    for (const table of activeTables) {
      // Skip if table is in the pending queue OR if it is a global table
      if (pendingTables.has(table) || activeGlobalTables.includes(table)) continue;

      const result = await pullTable(activeUserId, table);
      if (!result) continue;

      const localTs = loadTimestamp(activeUserId, table);

      // If remote is newer, update local
      if (result.updatedAt > localTs) {
        saveLocal(activeUserId, table, result.data);
        saveTimestamp(activeUserId, table, result.updatedAt);
        onUpdate?.({ [table]: result.data });
      }
    }

    // Process Pending Items (Push local changes to remote)
    for (const item of pending) {
      // Don't process global tables here
      if (activeGlobalTables.includes(item.table)) continue;

      const localData = loadLocal(activeUserId, item.table, []);
      const success = await pushTable(activeUserId, item.table, localData);

      if (success) {
        // After pushing, pull the confirmed server data
        const result = await pullTable(activeUserId, item.table);
        if (result) {
          saveTimestamp(activeUserId, item.table, result.updatedAt);
        }
        dequeue(activeUserId, item.table);
      }
    }

    // 2. SYNC GLOBAL TABLES (Users, Apartments, etc.)
    for (const table of activeGlobalTables) {
      const localData = loadGlobalLocal(table, []);

      // Always try to pull first to see if remote is newer
      const result = await pullAppData(table);

      if (result) {
        const localTs = loadGlobalTimestamp(table);
        // If remote is newer, update local
        if (result.updatedAt > localTs) {
          saveGlobalLocal(table, result.data);
          saveGlobalTimestamp(table, result.updatedAt);
          onUpdate?.({ [table]: result.data });
        }
        // If local is newer (or timestamps equal), push to remote
        else if (localTs >= result.updatedAt) {
          if (JSON.stringify(localData) !== JSON.stringify(result.data)) {
            const pushSuccess = await pushAppData(table, localData);
            if (pushSuccess) {
              const confirm = await pullAppData(table);
              if (confirm) {
                saveGlobalTimestamp(table, confirm.updatedAt);
              }
            }
          }
        }
      } else {
        // Remote doesn't exist, push local data
        const pushSuccess = await pushAppData(table, localData);
        if (pushSuccess) {
          const confirm = await pullAppData(table);
          if (confirm) {
            saveGlobalTimestamp(table, confirm.updatedAt);
          }
        }
      }
    }
  } catch (err) {
    console.error("[SyncEngine] Error:", err);
  } finally {
    isProcessing = false;
  }
};

// UPDATED: We now accept globalTables as a 3rd argument
export const startSync = async (userId, tables, globalTables, updateCallback) => {
  stopSync();

  activeUserId = userId;
  activeTables = tables;
  activeGlobalTables = globalTables; // Save it so processSync can see it
  onUpdate = updateCallback;

  await processSync();
  syncInterval = setInterval(processSync, 30_000);

  onlineHandler = () => setTimeout(processSync, 1000);
  window.addEventListener("online", onlineHandler);
};

export const stopSync = () => {
  if (syncInterval) clearInterval(syncInterval);
  if (onlineHandler) window.removeEventListener("online", onlineHandler);
  activeUserId = null;
  activeTables = null;
  activeGlobalTables = null;
  onUpdate = null;
  isProcessing = false;
};

export const syncNow = () => processSync();
