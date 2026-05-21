import { CALC_METHODS, BILL_STATUS } from "./constants.js";

// Normalize a value into a number or empty string
export function normaliseNumber(value) {
  return value === "" || value === undefined ? "" : Number(value);
}

// Calculate a bill based on fee type, apartment, and optional custom rate/quantity
export function getBillCalculation({
  fee,
  apartment,
  customRate,
  customQuantity,
}) {
  if (!fee) {
    return {
      base: 1,
      rate: 0,
      total: 0,
      schedule: "—",
    };
  }

  const rate = customRate !== "" ? Number(customRate) : Number(fee.price || 0);
  const schedule =
    fee.recurrence && fee.recurrence !== "none" ? "Recurring" : "One-time";

  switch (fee.calc_method) {
    case CALC_METHODS.PER_M2: {
      const area = Number(apartment?.area || 0);
      return {
        base: area,
        rate: rate,
        total: area * rate,
        schedule: schedule,
      };
    }

    case CALC_METHODS.FIXED: {
      return {
        base: 1,
        rate: rate,
        total: rate,
        schedule: schedule,
      };
    }

    default: {
      const quantity = customQuantity !== "" ? Number(customQuantity) : 1;
      return {
        base: quantity,
        rate: rate,
        total: quantity * rate,
        schedule: schedule,
      };
    }
  }
}

// Returns configuration colors/labels matching a specific string token
export const getBillStatusConfig = (status) =>
  Object.values(BILL_STATUS).find((s) => s.value === status) || BILL_STATUS.DUE;

// Filter ledger matrices securely using global status logic pipelines
export const filterBills = (bills, activeFilter) => {
  const now = new Date();
  return bills.filter((b) => {
    const isFuture = new Date(b.due_date) > now;
    switch (activeFilter) {
      case "paid":
        return b.status === "paid";
      case "due":
        return b.status === "due" || b.status === "overdue";
      case "all":
        return ["paid", "due", "overdue"].includes(b.status);
      case "wait":
        return b.status === "wait" || isFuture;
      default:
        return true;
    }
  });
};

const normaliseDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const isDateFuture = (dateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = normaliseDate(dateStr);
  return target > today;
};

export const isDateOverdue = (dateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = normaliseDate(dateStr);
  return today > target;
};

// Determines the visual status of a bill
export const getBillDisplayStatus = (bill) => {
  if (bill.status === "paid") return "paid";
  const isDue = isDateOverdue(bill.due_date);
  if (bill.status === "wait")
    return isDue ? "overdue" : "wait";
  return isDue ? "overdue" : "due";
};

// Format date string to DD/MM/YYYY
export const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
};
