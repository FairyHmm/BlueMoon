import {
  IconCalendar,
  IconCalendarEvent,
  IconCalendarMonth,
  IconCalculator,
  IconRulerMeasure,
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
    quantityDisabled: false,
    quantityLabel: "Units",
  },
  {
    value: CALC_METHODS.PER_M2,
    label: "Per m²",
    color: "grape",
    icon: IconRulerMeasure,
    priceLabel: "Price Rate per m²",
    quantityDisabled: true,
    quantityLabel: "Area (m²)",
  },
  {
    value: CALC_METHODS.PER_UNIT,
    label: "Per Unit",
    color: "orange",
    icon: IconRulerMeasure,
    priceLabel: "Price Rate per Unit",
    quantityDisabled: false,
    quantityLabel: "Quantity",
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
