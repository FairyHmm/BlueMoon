import { useMemo } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";

export const useFinanceRegistry = (query = "") => {
  const apartments = useDbStore((s) => s.apartments);
  const bills = useDbStore((s) => s.bills);

  const feeTypes = useDbStore((s) => s.fee_types || []);

  const filteredApartments = useMemo(() => {
    const safeQuery =
      typeof query === "string" ? query.toLowerCase().trim() : "";
    if (!safeQuery) return apartments;

    return apartments.filter((apt) =>
      String(apt.id).toLowerCase().includes(safeQuery),
    );
  }, [apartments, query]);

  return {
    apartments: filteredApartments,
    bills,
    feeTypes,
  };
};
