import { $, sumBy, groupBy } from "../../../shared/utils/dataEngine";

export const getResidentRegistry = (db, search = "") => {
  let data = $(db, db.apartments)
    .with("residents")
    .with("bills")
    .map((a) => ({
      ...a,
      hasUnpaidBills: a.bills?.some((b) => b.status.includes("due")) ?? false,
    }))
    .unwrap();

  if (search) {
    const q = search.toLowerCase();

    data = data.filter(
      (apt) =>
        apt.id.toLowerCase().includes(q) ||
        apt.residents?.some((r) => r.name.toLowerCase().includes(q)),
    );
  }

  return data;
};

export const getDebtSummary = (db) => {
  const bills = db?.bills || [];

  const grouped = groupBy(
    bills.filter((b) => b.includes("due")),
    "apartment_id",
  );

  return [...grouped.entries()].map(([id, items]) => ({
    id,
    totalDebt: sumBy(items, (b) => b.amount),
  }));
};
