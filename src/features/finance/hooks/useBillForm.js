import { useEffect, useMemo, useState, useCallback } from "react";
import { useDbStore } from "../../../shared/store/useDbStore";
import { financeActions } from "../store/financeActions";
import { BILL_STATUS, DEFAULT_BILL_FORM } from "../utils/constants";
import { getBillCalculation } from "../utils/billing";
import { indexOne } from "../../../shared/utils/dataEngine";

export const useBillForm = (initialData, onSaveSuccess) => {
  const db = useDbStore();
  const feeTypes = db.fee_types || [];
  const apartments = db.apartments || [];

  const [formData, setFormData] = useState(DEFAULT_BILL_FORM);

  useEffect(() => {
    if (!initialData) return;
    setFormData({
      ...DEFAULT_BILL_FORM,
      ...initialData,
      fee_id: initialData.fee_id ? String(initialData.fee_id) : "",
    });
  }, [initialData]);

  const feeTypeMap = useMemo(() => indexOne(feeTypes, "id"), [feeTypes]);
  const apartmentMap = useMemo(() => indexOne(apartments, "id"), [apartments]);

  const selectedFee = feeTypeMap[formData.fee_id];
  const selectedApartment = apartmentMap[formData.apartment_id];

  const formulaResult = useMemo(() => {
    return getBillCalculation({
      fee: selectedFee,
      apartment: selectedApartment,
      customRate: formData.custom_rate,
      customQuantity: formData.custom_quantity,
    });
  }, [
    selectedFee,
    selectedApartment,
    formData.custom_rate,
    formData.custom_quantity,
  ]);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => {
      if (field === "fee_id") {
        const fee = feeTypeMap[value];
        return {
          ...prev,
          fee_id: value,
          custom_rate: "",
          custom_quantity: "",
          optional: fee?.optional ?? false,
        };
      }
      return { ...prev, [field]: value };
    });
  }, [feeTypeMap]);

  const submitForm = useCallback(() => {
    if (!formData.apartment_id || !formData.fee_id) return false;

    financeActions.addBill({
      apartment_id: formData.apartment_id,
      fee_id: formData.fee_id,
      amount: formulaResult.total,
      due_date: formData.due_date,
      status: BILL_STATUS.DUE.value,
      interval: selectedFee?.interval || "monthly",
      optional: formData.optional,
    });

    onSaveSuccess?.();
    return true;
  }, [formData, formulaResult, selectedFee, onSaveSuccess]);

  return {
    formData,
    feeTypes,
    selectedFee,
    formulaResult,
    updateField,
    submitForm,
  };
};
