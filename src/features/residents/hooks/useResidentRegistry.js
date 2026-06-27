import { useMemo } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";
import { $ } from "../../../shared/utils/dataEngine";
import {
  matchesSearch,
  searchTerms,
} from "../../../shared/utils/queryManipulation";

export const useResidentRegistry = (query = "") => {
  const db = useDbStore();
  const apartments = db.apartments || [];
  const residents = db.residents || [];
  const bills = db.bills || [];
  const vehicles = db.vehicles || [];
  const absenceLogs = db.absence_logs || [];

  const displayData = useMemo(() => {
    const mockDbForEngine = { apartments, residents, bills, vehicles };

    let data = $(mockDbForEngine, apartments)
      .with("residents")
      .with("bills")
      .with("vehicles")
      .unwrap();

    data = data.map((apt) => {
      const enhancedResidents = (apt.residents || []).map((member) => {
        const matchingLog = absenceLogs.find(
          (log) =>
            log.resident_id === member.id &&
            (log.status === "pending" || log.status === "approved"),
        );

        return {
          ...member,
          absenceStatus: matchingLog?.status ?? null,
          absenceLogId: matchingLog?.id ?? null,
          absenceType: matchingLog?.type ?? null,
          absenceDate: matchingLog?.log_date ?? null,
        };
      });

      return {
        ...apt,
        hasUnpaidBills: apt.bills?.some((b) => b.status === "unpaid") ?? false,
        residents: enhancedResidents,
        allVehicles: apt.vehicles || [],
      };
    });

    const terms = searchTerms(query);

    if (terms.length) {
      data = data.filter((apt) =>
        terms.every(
          (term) =>
            matchesSearch(term, apt.id, apt.type) ||
            apt.residents?.some((r) =>
              matchesSearch(
                term,
                r.name,
                r.status,
                r.absenceStatus,
                r.absenceType,
              ),
            ) ||
            apt.allVehicles?.some((v) =>
              matchesSearch(term, v.plate_number, v.type, v.status),
            ),
        ),
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
