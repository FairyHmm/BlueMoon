import { useCallback } from "react";

export function useApartmentActions(db) {
  const { apartments, setApartments, setResidents } = db || {};

  const addApartment = useCallback(
    (newUnit) => {
      const exists = apartments.some(
        (apt) =>
          String(apt.id).toLowerCase() === String(newUnit.id).toLowerCase(),
      );

      if (exists) return { success: false, error: "Unit ID already exists" };

      setApartments((prev) => [...prev, newUnit]);
      return { success: true };
    },
    [apartments, setApartments],
  );

  const updateApartment = useCallback(
    (oldId, updates) => {
      if (
        typeof setApartments !== "function" ||
        typeof setResidents !== "function"
      )
        return;

      // 1. Update the Apartment list
      setApartments((prev) =>
        prev.map((apt) => (apt.id === oldId ? { ...apt, ...updates } : apt)),
      );

      // 2. If the ID itself changed, update all linked residents
      if (updates.id && updates.id !== oldId) {
        setResidents((prev) =>
          prev.map((res) =>
            res.apartment_id === oldId
              ? { ...res, apartment_id: updates.id }
              : res,
          ),
        );
      }
    },
    [setApartments, setResidents],
  );

  const removeApartment = useCallback(
    (unitId) => {
      setApartments((prev) => prev.filter((apt) => apt.id !== unitId));
      setResidents((prev) =>
        prev.map((res) =>
          res.apartment_id === unitId
            ? { ...res, apartment_id: null, is_head: false }
            : res,
        ),
      );
    },
    [setApartments, setResidents],
  );

  return {
    apartments,
    setApartments,
    actions: { addApartment, updateApartment, removeApartment },
  };
}
