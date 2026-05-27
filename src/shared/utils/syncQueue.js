const QUEUE_KEY = "bluemoon_sync_queue";

const readQueue = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeQueue = (queue) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

/** Add a table to the sync queue (no duplicates) */
export const enqueue = (userId, table) => {
  const queue = readQueue();
  const exists = queue.some(
    (item) => item.userId === userId && item.table === table,
  );
  if (exists) return;
  queue.push({ userId, table, enqueuedAt: Date.now() });
  writeQueue(queue);
};

/** Remove a table from the queue after successful push */
export const dequeue = (userId, table) => {
  const queue = readQueue().filter(
    (item) => !(item.userId === userId && item.table === table),
  );
  writeQueue(queue);
};

/** Get pending items for a specific user */
export const getPendingForUser = (userId) =>
  readQueue().filter((item) => item.userId === userId);
