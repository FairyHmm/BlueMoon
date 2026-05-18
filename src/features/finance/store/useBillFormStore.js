import { create } from "zustand";
import { DEFAULT_BILL_FORM } from "../utils/constants";

export const useBillFormStore = create((set) => ({
  formValues: DEFAULT_BILL_FORM,

  // Initialize or reset the form
  initForm: (initialData) =>
    set({
      formValues: {
        ...DEFAULT_BILL_FORM,
        ...initialData,
        fee_id: initialData?.fee_id ? String(initialData.fee_id) : "",
      },
    }),

  // Handle field changes with specific logic for Fee ID
  updateForm: (field, value) =>
    set((state) => {
      if (field === "fee_id") {
        return {
          formValues: {
            ...state.formValues,
            fee_id: value,
            custom_rate: "",
            custom_quantity: "",
          },
        };
      }
      return { formValues: { ...state.formValues, [field]: value } };
    }),
}));
