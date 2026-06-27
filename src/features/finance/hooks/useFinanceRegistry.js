import { useMemo } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";
import { indexOne } from "../../../shared/utils/dataEngine";
import {
  matchesSearch,
  searchTerms,
} from "../../../shared/utils/queryManipulation";

export const useFinanceRegistry = (query = "") => {
  const db = useDbStore();

  const apartments = db.apartments || [];
  const bills = db.bills || [];
  const feeTypes = db.fee_types || [];

  const filteredApartments = useMemo(() => {
    const terms = searchTerms(query);

    if (!terms.length) return apartments;

    const feeTypeIndex = indexOne(feeTypes, "id");

    return apartments.filter((apt) => {
      const aptBills = bills.filter((b) => b.apartment_id === apt.id);

      return terms.every(
        (term) =>
          matchesSearch(term, apt.id) ||
          aptBills.some((b) => {
            const feeType = feeTypeIndex[b.fee_id];

            const optionalText =
              feeType?.optional === undefined
                ? ""
                : feeType.optional
                  ? "tùy chọn optional"
                  : "bắt buộc required mandatory";

            return matchesSearch(
              term,
              feeType?.name,
              feeType?.interval,
              optionalText,
              b.status,
              b.due_date,
              b.paid_date,
              b.amount,
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
