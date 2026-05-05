import { useState, useEffect } from 'react';

export function useDataController(collectionKey, initialData = []) {
  const [data, setData] = useState(initialData);
  const storageKey = `bluemoon_${collectionKey}`;

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setData(saved ? JSON.parse(saved) : initialData);
  }, [storageKey]);

  // Sync Data
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data, storageKey]);

  const addItem = (newItem) => {
    const entry = {
      ...newItem,
      id: Date.now(), // Temporary ID generator
    };
    setData((prev) => [...prev, entry]);
  };

  const deleteItem = (id) => {
    setData((prev) => prev.filter(item => item.id !== id));
  };

  return { data, setData, addItem, deleteItem };
}
