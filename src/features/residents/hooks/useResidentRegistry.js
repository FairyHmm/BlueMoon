import { useMemo } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";
import { $ } from "../../../shared/utils/dataEngine";

export const useResidentRegistry = (query = "") => {
  // 1. Reactive database tracking
  const apartments = useDbStore((s) => s.apartments);
  const residents = useDbStore((s) => s.residents);
  const bills = useDbStore((s) => s.bills);

  // 2. Perform relational mapping and filtering safely
  const displayData = useMemo(() => {
    const mockDbForEngine = { apartments, residents, bills };
    const safeQuery =
      typeof query === "string" ? query.toLowerCase().trim() : "";

    // Run the data relationship engine
    let data = $(mockDbForEngine, apartments)
      .with("residents")
      .with("bills")
      .map((a) => ({
        ...a,
        hasUnpaidBills: a.bills?.some((b) => b.status === "unpaid") ?? false,
      }))
      .unwrap();

    // Apply lookahead query matching if text exists
    if (safeQuery) {
      data = data.filter(
        (apt) =>
          String(apt.id).toLowerCase().includes(safeQuery) ||
          apt.residents?.some((r) => r.name.toLowerCase().includes(safeQuery)),
      );
    }

    return data;
  }, [apartments, residents, bills, query]);

  // 3. Compute structural lookups for unassigned members
  const availableResidents = useMemo(() => {
    return residents.filter((r) => !r.apartment_id);
  }, [residents]);

  return {
    displayData,
    availableResidents,
  };
};
