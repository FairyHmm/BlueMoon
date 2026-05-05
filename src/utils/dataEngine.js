/**
 * THE ENGINE: A Generic Relational Joiner
 * O(N) Complexity using Hash Maps
 */
export const join = (primary, secondary, primaryKey, secondaryKey, alias) => {
  const map = new Map();
  secondary.forEach((item) => {
    const key = item[secondaryKey];
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  });

  return primary.map((item) => ({
    ...item,
    [alias]: map.get(item[primaryKey]) || [],
  }));
};

// A simple tool to "index" a table for 1:1 lookups (like Users)
export const index = (data, key) =>
  new Map(data.map((item) => [item[key], item]));
