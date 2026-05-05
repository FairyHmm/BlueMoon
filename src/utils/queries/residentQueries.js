import { join } from "../dataEngine";

export const getResidentRegistry = (db, search = "") => {
  // 1. Perform the Join
  let data = join(
    db.apartments,
    db.residents,
    "id",
    "apartment_id",
    "residents",
  );

  // 2. Apply View-Specific Logic (Search)
  if (search) {
    const q = search.toLowerCase();
    data = data.filter(
      (apt) =>
        apt.id.includes(q) ||
        apt.residents.some((r) => r.name.toLowerCase().includes(q)),
    );
  }

  return data;
};

export const getDebtSummary = (db) => {
  const data = join(db.apartments, db.bills, "id", "apartment_id", "bills");
  return data.map((apt) => ({
    id: apt.id,
    totalDebt: apt.bills
      .filter((b) => b.status === "unpaid")
      .reduce((sum, b) => sum + b.amount, 0),
  }));
};
