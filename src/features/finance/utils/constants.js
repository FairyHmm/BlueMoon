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
    value: CALC_METHODS.FIXED,
    label: "Mức cố định",
    color: "blue",
    icon: IconCalculator,
    priceLabel: "Chi phí cố định",
    quantityDisabled: false,
    quantityLabel: "Số lượng",
  },
  {
    value: CALC_METHODS.PER_M2,
    label: "Theo m²",
    color: "grape",
    icon: IconRulerMeasure,
    priceLabel: "Đơn giá theo m²",
    quantityDisabled: true,
    quantityLabel: "Diện tích (m²)",
  },
  {
    value: CALC_METHODS.PER_UNIT,
    label: "Theo đơn vị",
    color: "orange",
    icon: IconRulerMeasure,
    priceLabel: "Đơn giá theo đơn vị",
    quantityDisabled: false,
    quantityLabel: "Số lượng",
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
    label: "Một lần",
    color: "gray",
    icon: IconCalendarEvent,
  },
  {
    value: BILLING_INTERVALS.MONTHLY,
    label: "Hàng tháng",
    color: "blue",
    icon: IconCalendarMonth,
  },
  {
    value: BILLING_INTERVALS.YEARLY,
    label: "Hàng năm",
    color: "violet",
    icon: IconCalendar,
  },
];

export const INTERVAL_MAP = Object.fromEntries(
  INTERVAL_OPTIONS.map((opt) => [opt.value, opt]),
);

export const BILL_STATUS = {
  PAID: { value: "paid", label: "Thanh toán", color: "teal" },
  DUE: { value: "due", label: "Đến hạn", color: "blue" },
  OVERDUE: { value: "overdue", label: "Quá hạn", color: "red" },
  WAIT: { value: "wait", label: "Chờ", color: "gray" },
};

export const FILTER_OPTIONS = [
  {
    label: BILL_STATUS.DUE.label,
    value: BILL_STATUS.DUE.value,
  },
  {
    label: BILL_STATUS.PAID.label,
    value: BILL_STATUS.PAID.value,
  },
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: BILL_STATUS.WAIT.label,
    value: BILL_STATUS.WAIT.value,
  },
];

export const DEFAULT_BILL_FORM = {
  apartment_id: "",
  fee_id: "",
  custom_rate: "",
  custom_quantity: "",
  due_date: new Date().toISOString().split("T")[0],
  optional: false,
};
