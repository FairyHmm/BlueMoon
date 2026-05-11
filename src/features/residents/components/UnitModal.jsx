import { useState } from "react";
import { TextInput, Select, NumberInput, Button, Box } from "@mantine/core";
import { UNIT_TYPES } from "../../../shared/data/registryConfigs";
import classes from "../styles/unit-modal.module.css";

export default function UnitModal({ onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    area: 0,
    type: UNIT_TYPES.STANDARD.value,
  });

  const selectData = Object.values(UNIT_TYPES).map((t) => ({
    value: t.value,
    label: t.label,
  }));

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Box className={classes["form-container"]}>
      <TextInput
        label="Unit ID"
        placeholder="e.g. 101"
        className={classes["modal-input"]}
        classNames={{ input: "mono" }} // Ensure ID stays monospace
        value={formData.id}
        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
      />

      <NumberInput
        label="Area (m²)"
        className={classes["modal-input"]}
        classNames={{ input: "mono" }}
        value={formData.area}
        onChange={(val) => setFormData({ ...formData, area: val })}
        min={0}
        decimalScale={1}
      />

      <Select
        label="Unit Type"
        className={classes["modal-input"]}
        value={formData.type}
        onChange={(val) => setFormData({ ...formData, type: val })}
        data={selectData}
        comboboxProps={{
          zIndex: 2000,
          withinPortal: true,
          transitionProps: { transition: "pop", duration: 200 },
        }}
      />

      <Button
        fullWidth
        onClick={handleSubmit}
        className={classes["submit-button"]}
      >
        Create Unit
      </Button>
    </Box>
  );
}
