import { useState, useEffect, useRef } from "react";

export function useDataController(collectionKey, initialData = []) {
  const [data, setData] = useState(initialData);
  const [isLoaded, setIsLoaded] = useState(false); // New gate
  const storageKey = `bluemoon_${collectionKey}`;

  // 1. Load Data
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setData(JSON.parse(saved));
    }
    setIsLoaded(true); // Mark as ready
  }, [storageKey]);

  // 2. Sync Data - Only if isLoaded is true
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data, storageKey, isLoaded]);

  const addItem = (newItem) => {
    const entry = { ...newItem, id: Date.now() };
    setData((prev) => [...prev, entry]);
  };

  const deleteItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return { data, setData, addItem, deleteItem, loading: !isLoaded };
}
