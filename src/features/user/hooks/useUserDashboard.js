import { useMemo } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";
import { useAuthStore } from "../../../shared/store/useAuthStore";
import { getBalanceDue } from "../../finance/utils/billing";

export function useUserDashboard() {
  const db = useDbStore();
  const { user: currentUser } = useAuthStore();

  const apartments = db.apartments || [];
  const residents = db.residents || [];
  const vehicles = db.vehicles || [];
  const bills = db.bills || [];
  const feeTypes = db.fee_types || [];
  const absenceLogs = db.absence_logs || [];

  return useMemo(() => {
    if (!currentUser?.resident_id) return null;

    const myResidentProfile = residents.find(
      (r) => r.id === currentUser.resident_id && r.status === "active",
    );

    const apartmentId = myResidentProfile?.apartment_id;

    if (!apartmentId) return null;

    const myApartment = apartments.find(
      (a) => a.id === apartmentId,
    );

    const householdMembers = residents.filter(
      (r) => r.apartment_id === apartmentId,
    );

    const registeredVehicles = vehicles.filter(
      (v) => v.apartment_id === apartmentId,
    );

    const myBills = bills.filter(
      (b) => b.apartment_id === apartmentId,
    );

    return {
      profile: myResidentProfile,
      apartment: myApartment,
      household: householdMembers,
      vehicles: registeredVehicles,
      bills: myBills,
      feeTypes,
      absenceLogs,
      stats: {
        balanceDue: getBalanceDue(myBills),
        vehicleCount: registeredVehicles.length,
        householdSize: householdMembers.length,
      },
    };
  }, [
    apartments,
    residents,
    vehicles,
    bills,
    feeTypes,
    absenceLogs,
    currentUser,
  ]);
}
