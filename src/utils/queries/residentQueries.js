import { join } from "../dataEngine";

export const getResidentRegistry = (db, search = "") => {
  // Defensive destructuring: default to empty arrays if db is loading/empty
  const { apartments = [], residents = [], bills = [] } = db || {};

  // 1. Join Residents and Bills to Apartments
  let data = join(apartments, residents, "id", "apartment_id", "residents");
  data = join(data, bills, "id", "apartment_id", "bills");

  // 2. Add derived UI state (like the Debt Badge requirement)
  data = data.map(apt => ({
    ...apt,
    hasUnpaidBills: apt.bills?.some(b => b.status === "unpaid") ?? false
  }));

  // 3. Apply Search
  if (search) {
    const q = search.toLowerCase();
    return data.filter(
      (apt) =>
        apt.id.toLowerCase().includes(q) ||
        apt.residents.some((r) => r.name.toLowerCase().includes(q))
    );
  }

  return data;
};

export const getDebtSummary = (db) => {
  const { apartments = [], bills = [] } = db || {};

  const data = join(apartments, bills, "id", "apartment_id", "bills");

  return data.map((apt) => ({
    id: apt.id,
    totalDebt: (apt.bills || [])
      .filter((b) => b.status === "unpaid")
      .reduce((sum, b) => sum + b.amount, 0),
  }));
};
