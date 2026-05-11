import { useState, useEffect } from "react";
import { TextInput, Box, Text } from "@mantine/core";
import classes from "../styles/editable-field.module.css";

export default function EditableField({
  value,
  onSave,
  component: Component = TextInput,
  immediate = false,
  renderDisplay,
  readOnly = false,
  ...props
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  // Keep local state in sync with the source of truth (props)
  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleSave = (finalVal) => {
    if (finalVal === value) {
      setEditing(false);
      return;
    }

    // 1. Trigger the parent update (this hits setApartments)
    onSave(finalVal);

    // 2. Immediately close the toggle
    setEditing(false);
  };

  if (editing && !readOnly) {
    return (
      <Component
        {...props}
        className={classes["edit-input"]}
        size="xs"
        autoFocus
        value={val}
        onChange={(v) => {
          const newValue = v?.currentTarget ? v.currentTarget.value : v;
          setVal(newValue);
          if (immediate) handleSave(newValue);
        }}
        onBlur={() => !immediate && handleSave(val)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !immediate) {
            handleSave(val);
          }
          if (e.key === "Escape") {
            setVal(value);
            setEditing(false);
          }
        }}
      />
    );
  }

  return (
    <Box
      onDoubleClick={() => setEditing(true)}
      className={classes["clickable-box"]}
    >
      {/* Use the prop 'value' directly for display */}
      {renderDisplay ? renderDisplay(value) : <Text {...props}>{value}</Text>}
    </Box>
  );
}
