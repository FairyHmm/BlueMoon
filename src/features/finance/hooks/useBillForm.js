import { useEffect, useMemo, useState, useCallback } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";
import { financeActions } from "../store/financeActions";
import { BILL_STATUS, DEFAULT_BILL_FORM } from "../utils/constants";
import { getBillCalculation, arrayToMapById } from "../utils/billing";

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

  const formulaResult = useMemo(
    () =>
      getBillCalculation({
        fee: selectedFee,
        apartment: selectedApartment,
        customRate: formData.custom_rate,
        customQuantity: formData.custom_quantity,
      }),
    [
      selectedFee,
      selectedApartment,
      formData.custom_rate,
      formData.custom_quantity,
    ],
  );

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
    });

    onSaveSuccess?.();
    return true;
  }, [formData, formulaResult.total, onSaveSuccess]);

  return {
    formData,
    feeTypes,
    selectedFee,
    formulaResult,
    updateField,
    submitForm,
  };
};
