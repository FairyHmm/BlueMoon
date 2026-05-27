import { pullTable, pushTable } from "./firebaseDb";
import {
  loadTable as loadLocal,
  saveTable as saveLocal,
  loadTimestamp,
  saveTimestamp,
} from "./localUserDb";
import { dequeue, getPendingForUser } from "./syncQueue";

let syncInterval = null;
let onlineHandler = null;
let activeUserId = null;
let activeTables = null;
let onUpdate = null;
let isProcessing = false;

const processSync = async () => {
  if (!activeUserId || !activeTables || isProcessing) return;
  if (typeof navigator !== "undefined" && !navigator.onLine) return;

  isProcessing = true;

  try {
    const pending = getPendingForUser(activeUserId);
    const pendingTables = new Set(pending.map((p) => p.table));

    // 1. PULL — only for tables with NO pending local changes
    //    (local edits always take priority over remote)
    for (const table of activeTables) {
      if (pendingTables.has(table)) continue;

      const result = await pullTable(activeUserId, table);
      if (!result) continue;

      const localTs = loadTimestamp(activeUserId, table);

      if (result.updatedAt > localTs) {
        saveLocal(activeUserId, table, result.data);
        saveTimestamp(activeUserId, table, result.updatedAt);
        onUpdate?.({ [table]: result.data });
      }
    }

    // 2. PUSH — queued local changes to Firebase
    for (const item of pending) {
      const localData = loadLocal(activeUserId, item.table, []);
      const success = await pushTable(activeUserId, item.table, localData);

      if (success) {
        const result = await pullTable(activeUserId, item.table);
        if (result) {
          saveTimestamp(activeUserId, item.table, result.updatedAt);
        }
        dequeue(activeUserId, item.table);
      }
    }
  } catch (err) {
    console.error("[SyncEngine] Error:", err);
  } finally {
    isProcessing = false;
  }
};

/**
 * Start background sync for a user.
 * Resolves after the first sync cycle completes.
 */
export const startSync = async (userId, tables, updateCallback) => {
  stopSync();

  activeUserId = userId;
  activeTables = tables;
  onUpdate = updateCallback;

  // Initial sync
  await processSync();

  // Periodic sync every 30 seconds
  syncInterval = setInterval(processSync, 30_000);

  // Sync when browser comes back online
  onlineHandler = () => setTimeout(processSync, 1000);
  window.addEventListener("online", onlineHandler);
};

/** Stop all sync activity */
export const stopSync = () => {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }
  if (onlineHandler) {
    window.removeEventListener("online", onlineHandler);
    onlineHandler = null;
  }
  activeUserId = null;
  activeTables = null;
  onUpdate = null;
  isProcessing = false;
};

/** Force an immediate sync (for "Refresh" button) */
export const syncNow = () => processSync();
