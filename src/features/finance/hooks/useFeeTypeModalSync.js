import { useEffect, useCallback } from "react";
import { useFeeTypes } from "../store/financeActions";
import { useFeeTypeModalStore } from "../store/feeTypeModalStore";

export function useFeeTypeModalSync(opened) {
  const feeTypes = useFeeTypes();
  const { selectedId, syncFormData, selectItem, reset } = useFeeTypeModalStore();

  // Sync form data whenever selection or master data changes
  useEffect(() => {
    const item = feeTypes.find((f) => f.id === selectedId);
    syncFormData(item);
  }, [selectedId, feeTypes, syncFormData]);

  // Handle modal open/close & fallback selection
  useEffect(() => {
    if (opened && feeTypes.length > 0) {
      const isValid = feeTypes.some((f) => f.id === selectedId);
      if (!isValid) selectItem(feeTypes[0].id);
    } else if (!opened) {
      reset();
    }
  }, [opened, feeTypes, selectedId, selectItem, reset]);

  // Provide safe delete with fallback logic
  const handleDelete = useCallback(
    (id) => {
      const remaining = feeTypes.filter((f) => f.id !== id);
      useFeeTypeModalStore.getState().deleteItem(id);
      if (remaining.length > 0) selectItem(remaining[0].id);
    },
    [feeTypes, selectItem]
  );

  return { feeTypes, handleDelete };
}
