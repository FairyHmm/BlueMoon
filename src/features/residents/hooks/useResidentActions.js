import { useMemo, useCallback } from "react";
import { getResidentRegistry } from "../utils/residentQueries";

export function useResidentActions(db, searchQuery = "") {
  const displayData = useMemo(
    () => (db?.apartments ? getResidentRegistry(db, searchQuery) : []),
    [db, searchQuery],
  );

  const availableResidents = useMemo(
    () => (db?.residents || []).filter((r) => !r.apartment_id),
    [db.residents],
  );

  const addMember = useCallback(
    (apartmentId, residentId) => {
      db.setResidents((prev) => {
        // Rule 1: Auto-head if the unit is currently empty
        const isFirst = !prev.some((r) => r.apartment_id === apartmentId);

        return prev.map((res) =>
          String(res.id) === String(residentId)
            ? {
                ...res,
                apartment_id: apartmentId,
                is_head: isFirst,
                status: "active",
              }
            : res,
        );
      });
    },
    [db],
  );

  const removeMember = useCallback(
    (residentId) => {
      db.setResidents((prev) => {
        const target = prev.find((r) => r.id === residentId);
        const appId = target?.apartment_id;

        const updated = prev.map((res) =>
          res.id === residentId
            ? { ...res, apartment_id: null, is_head: false }
            : res,
        );

        // Rule 2: If we removed the head, promote the next person in that unit
        if (target?.is_head && appId) {
          const nextInLine = updated.find((r) => r.apartment_id === appId);
          if (nextInLine) {
            return updated.map((res) =>
              res.id === nextInLine.id ? { ...res, is_head: true } : res,
            );
          }
        }
        return updated;
      });
    },
    [db],
  );

  const updateResident = useCallback(
    (residentId, updates) => {
      db.setResidents((prev) => {
        const targetRoom = prev.find((r) => r.id === residentId)?.apartment_id;

        return prev.map((res) => {
          if (res.id === residentId) {
            return { ...res, ...updates };
          }

          // Rule: Only one head per room
          if (updates.is_head && res.apartment_id === targetRoom) {
            return { ...res, is_head: false };
          }
          return res;
        });
      });
    },
    [db],
  );

  return {
    displayData,
    availableResidents,
    actions: { addMember, removeMember, updateResident },
    isLoading: db.isLoading,
  };
}
