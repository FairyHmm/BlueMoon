import { useDbStore } from "../../../shared/store/useDbStore";

export const residentActions = {
  addMember: (apartmentId, residentId) => {
    const store = useDbStore.getState();
    const residents = store.residents || [];
    const isFirst = !residents.some((r) => r.apartment_id === apartmentId);

    const updated = residents.map((res) =>
      String(res.id) === String(residentId)
        ? {
            ...res,
            apartment_id: apartmentId,
            is_head: isFirst,
            status: "active",
          }
        : res,
    );
    store.setResidents(updated);
  },

  removeMember: (residentId) => {
    const store = useDbStore.getState();
    const residents = store.residents || [];
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
    store.setResidents(updated);
  },

  updateResident: (residentId, updates) => {
    const store = useDbStore.getState();
    const residents = store.residents || [];
    const targetRoom = residents.find((r) => r.id === residentId)?.apartment_id;

    const updated = residents.map((res) => {
      if (res.id === residentId) return { ...res, ...updates };
      if (updates.is_head && targetRoom && res.apartment_id === targetRoom) {
        return { ...res, is_head: false };
      }
      return res;
    });
    store.setResidents(updated);
  },

  addApartment: (newUnit) => {
    const store = useDbStore.getState();
    const apartments = store.apartments || [];
    const exists = apartments.some(
      (apt) =>
        String(apt.id).toLowerCase() === String(newUnit.id).toLowerCase(),
    );

    if (exists) return { success: false, error: "Mã căn hộ đã tồn tại" };

    store.addApartments(newUnit);
    return { success: true };
  },

  updateApartment: (oldId, updates) => {
    const store = useDbStore.getState();
    store.updateApartments(oldId, updates);

    if (updates.id && updates.id !== oldId) {
      const residents = store.residents || [];
      const updatedResidents = residents.map((res) =>
        res.apartment_id === oldId ? { ...res, apartment_id: updates.id } : res,
      );
      store.setResidents(updatedResidents);
    }
  },

  removeApartment: (unitId) => {
    const store = useDbStore.getState();
    store.deleteApartments(unitId);

    const residents = store.residents || [];
    const updatedResidents = residents.map((res) =>
      res.apartment_id === unitId
        ? { ...res, apartment_id: null, is_head: false }
        : res,
    );
    store.setResidents(updatedResidents);
  },

  // --- Dynamic Requests Workflows Leveraging Global Store Engines ---
  handleVehiclePermit: (plateNumber, statusValue) => {
    const store = useDbStore.getState();
    const vehicles = store.vehicles || [];

    // Use setVehicles with an array map targeted via plate_number to bypass the missing id bug
    const updatedVehicles = vehicles.map((v) => {
      if (v.plate_number === plateNumber) {
        return { ...v, status: statusValue };
      }
      return v;
    });

    store.setVehicles(updatedVehicles);
  },

  handleAbsenceLog: (logId, statusValue) => {
    const store = useDbStore.getState();

    // Pass the incoming string value ('pending' | 'approved') directly to your store action
    store.updateAbsenceLogs(logId, { status: statusValue });
  },
};
