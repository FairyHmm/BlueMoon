import { useMemo } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";
import { $ } from "../../../shared/utils/dataEngine";

export const useResidentRegistry = (query = "") => {
  const db = useDbStore();
  const apartments = db.apartments || [];
  const residents = db.residents || [];
  const bills = db.bills || [];
  const vehicles = db.vehicles || [];
  const absenceLogs = db.absence_logs || [];

  const displayData = useMemo(() => {
    const mockDbForEngine = { apartments, residents, bills, vehicles };
    const safeQuery =
      typeof query === "string" ? query.toLowerCase().trim() : "";

    // 1. Map tables that share direct apartment_id links
    let data = $(mockDbForEngine, apartments)
      .with("residents")
      .with("bills")
      .with("vehicles")
      .unwrap();

    // 2. Decorate residents with their active/pending absence statuses
    data = data.map((apt) => {
      const enhancedResidents = (apt.residents || []).map((member) => {
        // Find if this specific member has an unresolved absence record
        const matchingLog = absenceLogs.find(
          (log) =>
            log.resident_id === member.id &&
            (log.status === "pending" || log.status === "approved"),
        );

        return {
          ...member,
          absenceStatus: matchingLog ? matchingLog.status : null, // "pending", "approved", or null
          absenceLogId: matchingLog ? matchingLog.id : null,
          absenceType: matchingLog ? matchingLog.type : null,
          absenceDate: matchingLog ? matchingLog.log_date : null,
        };
      });

      return {
        ...apt,
        hasUnpaidBills: apt.bills?.some((b) => b.status === "unpaid") ?? false,
        residents: enhancedResidents,
        allVehicles: apt.vehicles || [],
      };
    });

    if (safeQuery) {
      data = data.filter(
        (apt) =>
          String(apt.id).toLowerCase().includes(safeQuery) ||
          apt.residents?.some((r) => r.name.toLowerCase().includes(safeQuery)),
      );
    }

    return data;
  }, [apartments, residents, bills, vehicles, absenceLogs, query]);

  return {
    displayData,
    availableResidents: useMemo(
      () => residents.filter((r) => !r.apartment_id),
      [residents],
    ),
  };
};
