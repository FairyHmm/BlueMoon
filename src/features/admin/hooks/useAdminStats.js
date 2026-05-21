import { useMemo } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";

export function useAdminStats() {
  const apartments = useDbStore((s) => s.apartments) || [];
  const residents = useDbStore((s) => s.residents) || [];
  const vehicles = useDbStore((s) => s.vehicles) || [];
  const bills = useDbStore((s) => s.bills) || [];
  const absenceLogs = useDbStore((s) => s.absence_logs) || [];

  return useMemo(() => {
    // Apartments
    const occupiedUnits = new Set(
      residents.filter((r) => r.status === "active").map((r) => r.apartment_id),
    ).size;
    const totalUnits = apartments.length;

    // Residents
    const residentStatus = residents.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {});
    const heads = residents.filter((r) => r.is_head).length;
    const dependents = residents.filter((r) => !r.is_head).length;

    // Vehicles
    const vehicleTypes = vehicles.reduce((acc, v) => {
      acc[v.type] = (acc[v.type] || 0) + 1;
      return acc;
    }, {});

    // Billing
    const billing = bills.reduce(
      (acc, { status, amount, fee_id }) => {
        if (status === "paid") {
          acc.revenue += amount;
          acc.paid += 1;
          acc.byFee[fee_id] = (acc.byFee[fee_id] || 0) + amount;
        } else {
          acc.outstanding += amount;
          acc.unpaid += 1;
        }
        return acc;
      },
      { revenue: 0, outstanding: 0, paid: 0, unpaid: 0, byFee: {} },
    );

    // Recent Activity
    const recentActivity = bills
      .filter((b) => b.status === "paid" && b.paid_date)
      .sort((a, b) => new Date(b.paid_date) - new Date(a.paid_date))
      .slice(0, 5)
      .map((b) => ({
        id: b.id,
        apt: b.apartment_id,
        amount: b.amount,
        date: b.paid_date,
      }));

    // Absences
    const absencesByType = absenceLogs.reduce((acc, log) => {
      acc[log.type] = (acc[log.type] || 0) + 1;
      return acc;
    }, {});
    const monthlyAbsences = absenceLogs.filter(
      (log) => new Date(log.log_date).getMonth() === new Date().getMonth(),
    ).length;

    // Apartment types
    const apartmentTypes = apartments.reduce((acc, { type }) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return {
      units: {
        total: totalUnits,
        occupied: occupiedUnits,
        vacant: totalUnits - occupiedUnits,
        types: apartmentTypes,
      },
      residents: {
        total: residents.length,
        status: residentStatus,
        heads,
        dependents,
      },
      vehicles: {
        total: vehicles.length,
        types: vehicleTypes,
      },
      billing,
      recentActivity,
      absences: {
        total: absenceLogs.length,
        byType: absencesByType,
      },
    };
  }, [apartments, residents, vehicles, bills, absenceLogs]);
}
