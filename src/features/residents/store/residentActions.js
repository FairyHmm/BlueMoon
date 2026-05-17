import { useDbStore } from "../../../shared/store/useDbStore";

export const residentActions = {
  addMember: (apartmentId, residentId) => {
    const { residents, setResidents } = useDbStore.getState();
    const isFirst = !residents.some((r) => r.apartment_id === apartmentId);

    setResidents(
      residents.map((res) =>
        String(res.id) === String(residentId)
          ? {
              ...res,
              apartment_id: apartmentId,
              is_head: isFirst,
              status: "active",
            }
          : res,
      ),
    );
  },

  removeMember: (residentId) => {
    const { residents, setResidents } = useDbStore.getState();
    const target = residents.find((r) => r.id === residentId);
    const appId = target?.apartment_id;

    let updated = residents.map((res) =>
      res.id === residentId
        ? { ...res, apartment_id: null, is_head: false }
        : res,
    );

    if (target?.is_head && appId) {
      const nextInLine = updated.find((r) => r.apartment_id === appId);
      if (nextInLine) {
        updated = updated.map((res) =>
          res.id === nextInLine.id ? { ...res, is_head: true } : res,
        );
      }
    }
    setResidents(updated);
  },

  updateResident: (residentId, updates) => {
    const { residents, setResidents } = useDbStore.getState();
    const targetRoom = residents.find((r) => r.id === residentId)?.apartment_id;

    setResidents(
      residents.map((res) => {
        if (res.id === residentId) return { ...res, ...updates };
        if (updates.is_head && res.apartment_id === targetRoom) {
          return { ...res, is_head: false };
        }
        return res;
      }),
    );
  },

  addApartment: (newUnit) => {
    const { apartments, addApartments } = useDbStore.getState();
    const exists = apartments.some(
      (apt) =>
        String(apt.id).toLowerCase() === String(newUnit.id).toLowerCase(),
    );

    if (exists) return { success: false, error: "Unit ID already exists" };

    addApartments(newUnit);
    return { success: true };
  },

  updateApartment: (oldId, updates) => {
    const { apartments, residents, setApartments, setResidents } =
      useDbStore.getState();

    setApartments(
      apartments.map((apt) =>
        apt.id === oldId ? { ...apt, ...updates } : apt,
      ),
    );

    if (updates.id && updates.id !== oldId) {
      setResidents(
        residents.map((res) =>
          res.apartment_id === oldId
            ? { ...res, apartment_id: updates.id }
            : res,
        ),
      );
    }
  },

  removeApartment: (unitId) => {
    const { apartments, residents, setApartments, setResidents } =
      useDbStore.getState();

    setApartments(apartments.filter((apt) => apt.id !== unitId));
    setResidents(
      residents.map((res) =>
        res.apartment_id === unitId
          ? { ...res, apartment_id: null, is_head: false }
          : res,
      ),
    );
  },
};
