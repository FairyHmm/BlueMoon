import { useEffect, useMemo, useState, useCallback } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";
import { financeActions } from "../store/financeActions";
import { BILL_STATUS, DEFAULT_BILL_FORM, INTERVAL_OPTIONS } from "../utils/constants";
import { arrayToMapById } from "../utils/billing";

export const useBillForm = (initialData, onSaveSuccess) => {
  const apartments = useDbStore((s) => s.apartments || []);
  const feeTypes = useDbStore((s) => s.fee_types || []);

  const [formData, setFormData] = useState(DEFAULT_BILL_FORM);

  useEffect(() => {
    if (!initialData) return;
    setFormData({
      ...DEFAULT_BILL_FORM,
      ...initialData,
      fee_id: initialData.fee_id ? String(initialData.fee_id) : "",
    });
  }, [initialData]);

  // Cleaned up using the utility function
  const feeTypeMap = useMemo(() => arrayToMapById(feeTypes), [feeTypes]);

  const apartmentMap = useMemo(() => arrayToMapById(apartments), [apartments]);

  const selectedFee = feeTypeMap[formData.fee_id];
  const selectedApartment = apartmentMap[formData.apartment_id];

const formulaResult = useMemo(() => {
  // 1. Calculate your base and total sums (keeping your existing formulas)
  const base = formData.custom_quantity !== undefined ? formData.custom_quantity : (selectedFee?.base_quantity || 1);
  const rate = formData.custom_rate !== "" ? Number(formData.custom_rate) : Number(selectedFee?.price || 0);
  const total = base * rate;

  // 2. Resolve the matching readable human label from your constants lookup array
  const matchedInterval = INTERVAL_OPTIONS.find(i => i.value === selectedFee?.interval);

  // 3. Fallback safely to "Monthly" if no configuration exists yet
  const scheduleText = matchedInterval ? matchedInterval.label : "Monthly";

  return {
    base,
    total,
    schedule: scheduleText, // <-- Baked right into the formula payload object!
  };
}, [formData.custom_quantity, formData.custom_rate, selectedFee]);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => {
      if (field === "fee_id") {
        return { ...prev, fee_id: value, custom_rate: "", custom_quantity: "" };
      }
      return { ...prev, [field]: value };
    });
  }, []);

const submitForm = useCallback(() => {
  if (!formData.apartment_id || !formData.fee_id) return false;

  financeActions.addBill({
    apartment_id: formData.apartment_id,
    fee_id: Number(formData.fee_id),
    amount: formulaResult.total,
    due_date: formData.due_date,
    status: BILL_STATUS.DUE.value,

    // CRITICAL: Ensure the interval gets stamped directly onto the generated bill record!
    interval: selectedFee?.interval || "monthly",
  });

  onSaveSuccess?.();
  return true;
}, [formData, formulaResult.total, selectedFee, onSaveSuccess]);

  return {
    formData,
    feeTypes,
    selectedFee,
    formulaResult,
    updateField,
    submitForm,
  };
};
