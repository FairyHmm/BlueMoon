import { CALC_METHODS } from "./constants.js";

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

// Generic helper: convert an array of objects into a map keyed by string ID
export function arrayToMapById(array) {
  const map = {};
  if (!Array.isArray(array)) return map;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    map[String(item.id)] = item;
  }

  return map;
}
