import {
  IconCalendar,
  IconCalendarEvent,
  IconCalendarMonth,
  IconCalculator,
  IconRulerMeasure
} from "@tabler/icons-react";

export const CALC_METHODS = {
  FIXED: "fixed",
  PER_M2: "per_m2",
  PER_UNIT: "per_unit",
};

export const CALC_METHOD_OPTIONS = [
  {
    value:  CALC_METHODS.FIXED,
    label: "Flat Rate",
    color: "blue",
    icon: IconCalculator,
    priceLabel: "Flat Rate Cost",
  },
  {
    value: CALC_METHODS.PER_M2,
    label: "Per m²",
    color: "grape",
    icon: IconRulerMeasure,
    priceLabel: "Price Rate per m²",
  },
  {
    value: CALC_METHODS.PER_UNIT,
    label: "Per Unit",
    color: "oramge",
    icon: IconRulerMeasure,
    priceLabel: "Price Rate per Unit",
  },
];

export const CALC_METHOD_MAP = Object.fromEntries(
  CALC_METHOD_OPTIONS.map((opt) => [opt.value, opt]),
);

export const BILLING_INTERVALS = {
  ONE_TIME: "one_time",
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

// User-friendly UI Select labels for Billing Intervals
export const INTERVAL_OPTIONS = [
  {
    value: BILLING_INTERVALS.ONE_TIME,
    label: "One-time",
    color: "gray",
    icon: IconCalendarEvent,
  },
  {
    value: BILLING_INTERVALS.MONTHLY,
    label: "Monthly",
    color: "blue",
    icon: IconCalendarMonth,
  },
  {
    value: BILLING_INTERVALS.YEARLY,
    label: "Yearly",
    color: "violet",
    icon: IconCalendar,
  },
];

export const INTERVAL_MAP = Object.fromEntries(
  INTERVAL_OPTIONS.map((opt) => [opt.value, opt]),
);

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

export const FILTER_OPTIONS = [
  { label: "Due", value: "due" },
  { label: "Paid", value: "paid" },
  { label: "All", value: "all" },
  { label: "Wait", value: "wait" },
];

/**
 * Resolves context labels dynamically based on current calculation method rules
 */
export const getBillingLabels = (method) => {
  const isPerM2 = method === CALC_METHODS.PER_M2;
  const isFixed = method === CALC_METHODS.FIXED;

  return {
    quantityDisabled: isPerM2 || isFixed,
    quantityLabel: isPerM2 ? "Area (m²)" : "Quantity",
    rateLabel: isPerM2 ? "Rate per m²" : "Unit Price",
  };
};

/**
 * Returns configuration colors/labels matching a specific string token
 */
export const getBillStatusConfig = (status) =>
  Object.values(BILL_STATUS).find((s) => s.value === status) || BILL_STATUS.DUE;

/**
 * Filter ledger matrices securely using global status logic pipelines
 */
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
