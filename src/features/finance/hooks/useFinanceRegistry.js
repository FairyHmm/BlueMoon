import { useMemo } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";

export const useFinanceRegistry = (query = "") => {
  const db = useDbStore();

  const apartments = db.apartments || [];
  const bills = db.bills || [];
  const feeTypes = db.fee_types || [];

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
