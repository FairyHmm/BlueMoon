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
        rate,
        total: area * rate,
        schedule,
      };
    }

    case CALC_METHODS.FIXED:
      return {
        base: 1,
        rate,
        total: rate,
        schedule,
      };

    default: {
      const quantity = customQuantity !== "" ? Number(customQuantity) : 1;

      return {
        base: quantity,
        rate,
        total: quantity * rate,
        schedule,
      };
    }
  }
}

// Returns configuration colors/labels matching a specific string token
export const getBillStatusConfig = (status) =>
  Object.values(BILL_STATUS).find((s) => s.value === status) || BILL_STATUS.DUE;

export const getUnpaidBills = (bills) =>
  bills.filter(
    (b) =>
      b.status !== BILL_STATUS.PAID.value &&
      b.status !== BILL_STATUS.WAIT.value &&
      b.optional !== true,
  );

export const getBillsTotal = (bills) =>
  bills.reduce((sum, bill) => sum + Number(bill.amount || 0), 0);

export const getBalanceDue = (bills) => getBillsTotal(getUnpaidBills(bills));

export const filterBills = (bills, activeFilter) => {
  const now = new Date();

  return bills.filter((bill) => {
    const isFuture = new Date(bill.due_date) > now;

    switch (activeFilter) {
      case BILL_STATUS.PAID.value:
        return bill.status === BILL_STATUS.PAID.value;

      case BILL_STATUS.DUE.value:
        return (
          bill.status === BILL_STATUS.DUE.value ||
          bill.status === BILL_STATUS.OVERDUE.value
        );

      case "all":
        return [
          BILL_STATUS.PAID.value,
          BILL_STATUS.DUE.value,
          BILL_STATUS.OVERDUE.value,
        ].includes(bill.status);

      case BILL_STATUS.WAIT.value:
        return bill.status === BILL_STATUS.WAIT.value || isFuture;

      default:
        return true;
    }
  });
};

const normaliseDate = (dateStr) => {
  if (!dateStr) return null;

  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);

  return date;
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
  if (bill.status === BILL_STATUS.PAID.value) {
    return BILL_STATUS.PAID.value;
  }

  const overdue = isDateOverdue(bill.due_date);

  if (bill.status === BILL_STATUS.WAIT.value) {
    return overdue ? BILL_STATUS.OVERDUE.value : BILL_STATUS.WAIT.value;
  }

  return overdue ? BILL_STATUS.OVERDUE.value : BILL_STATUS.DUE.value;
};

// Format date string to DD/MM/YYYY
export const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
};
