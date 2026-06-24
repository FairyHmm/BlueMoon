import { create } from "zustand";
import { financeActions } from "./financeActions";
import { BILLING_INTERVALS } from "../utils/constants";

const INITIAL_FORM = {
  name: "",
  calc_method: "fixed",
  price: "",
  interval: BILLING_INTERVALS.MONTHLY,
  optional: false,
  description: "",
  late_fee: "",
  late_fee_type: "flat",
};

export const useFeeTypeModalStore = create((set, get) => ({
  selectedId: null,
  formData: { ...INITIAL_FORM },

  selectItem: (id) => set({ selectedId: id }),

  syncFormData: (item) => {
    if (item) {
      set({
        formData: {
          name: item.name || "",
          calc_method: item.calc_method || "fixed",
          price: item.price ?? "",
          interval: item.interval || BILLING_INTERVALS.MONTHLY,
          optional: item.optional ?? false,
          description: item.description || "",
          late_fee: item.late_fee ?? "",
          late_fee_type: item.late_fee_type || "flat",
        },
      });
    }
  },

  updateField: (field, value) => {
    const { selectedId, formData } = get();
    if (!selectedId) return;

    const next = { ...formData, [field]: value };
    const price =
      field === "price" ? (value !== "" ? Number(value) : 0) : Number(next.price || 0);

    financeActions.updateFeeType({ id: selectedId, ...next, price });
    set({ formData: next });
  },

  addNew: (currentCount) => {
    const newId = crypto.randomUUID();
    financeActions.addFeeType({
      id: newId,
      name: `New Category Rule ${currentCount + 1}`,
      calc_method: "fixed",
      price: 0,
      interval: BILLING_INTERVALS.MONTHLY,
      optional: false,
      description: "",
      late_fee: "",
      late_fee_type: "flat",
    });
    set({ selectedId: newId });
  },

  deleteItem: (id) => {
    financeActions.deleteFeeType(id);
    // Fallback selection is handled in the sync hook to keep store pure
    set({ selectedId: null, formData: { ...INITIAL_FORM } });
  },

  reset: () => set({ selectedId: null, formData: { ...INITIAL_FORM } }),
}));
