import { useMemo } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";
import { indexOne } from "../../../shared/utils/dataEngine";

export const useFinanceRegistry = (query = "") => {
  const db = useDbStore();

  const apartments = db.apartments || [];
  const bills = db.bills || [];
  const feeTypes = db.fee_types || [];

  const filteredApartments = useMemo(() => {
    const safeQuery =
      typeof query === "string" ? query.toLowerCase().trim() : "";

    if (!safeQuery) return apartments;

    const terms = safeQuery.split(" ").filter(Boolean);
    const feeTypeIndex = indexOne(feeTypes, "id");

    return apartments.filter((apt) => {
      const aptBills = bills.filter((b) => b.apartment_id === apt.id);

      return terms.every(
        (term) =>
          String(apt.id).toLowerCase().includes(term) ||
          aptBills.some((b) => {
            const feeType = feeTypeIndex[b.fee_id];
            return (
              feeType?.name?.toLowerCase().includes(term) ||
              feeType?.interval?.toLowerCase().includes(term) ||
              (feeType?.optional !== undefined &&
                (term === "optional"
                  ? feeType.optional === true
                  : term === "mandatory"
                    ? feeType.optional === false
                    : false)) ||
              b.status?.toLowerCase().includes(term) ||
              b.due_date?.toLowerCase().includes(term) ||
              b.paid_date?.toLowerCase().includes(term) ||
              String(b.amount).includes(term)
            );
          }),
      );
    });
  }, [apartments, bills, feeTypes, query]);

  return {
    apartments: filteredApartments,
    bills,
    feeTypes,
  };
};
