// constants.js
export const CALC_METHODS = {
  FIXED: "fixed",
  PER_M2: "per_m2",
  PER_UNIT: "per_unit",
};

export const BILL_STATUS = {
  PAID: { value: "paid", label: "Paid", color: "teal" },
  DUE: { value: "due", label: "Due", color: "blue" },
  OVERDUE: { value: "overdue", label: "Overdue", color: "red" },
  WAIT: { value: "wait", label: "Wait", color: "gray" },
};

export const DEFAULT_BILL_FORM = {
  apartment_id: "",
  fee_id: "",
  custom_rate: "",
  custom_quantity: "",
  due_date: new Date().toISOString().split("T")[0],
};

export const getBillingLabels = (method) => {
  const isPerM2 = method === CALC_METHODS.PER_M2;
  const isFixed = method === CALC_METHODS.FIXED;

  return {
    quantityDisabled: isPerM2 || isFixed,
    quantityLabel: isPerM2 ? "Area (m²)" : "Quantity",
    rateLabel: isPerM2 ? "Rate per m²" : "Unit Price",
  };
};

export const FILTER_OPTIONS = [
  { label: "Due", value: "due" },
  { label: "Paid", value: "paid" },
  { label: "All", value: "all" },
  { label: "Wait", value: "wait" },
];

export const getBillStatusConfig = (status) =>
  Object.values(BILL_STATUS).find((s) => s.value === status) || BILL_STATUS.DUE;

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
