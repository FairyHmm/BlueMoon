import { useMemo } from "react";
import { rem, SegmentedControl } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { NAV_ITEMS } from "../utils/navigationConfigs";
import { useAuthStore } from "../../shared/store/useAuthStore";

import classes from "../styles/navigation.module.css";
import scClasses from "../../shared/styles/mantine/segmented-control.module.css";

export default function Navigation({ value, onChange }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user?.role) return null;

  const filteredItems = useMemo(() => {
    if (!user?.role) return [];
    return NAV_ITEMS.filter((item) => item.allowedRoles.includes(user.role));
  }, [user]);

  const data = filteredItems.map((item) => ({
    value: item.value,
    label: (
      <item.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
    ),
  }));

  return (
    <SegmentedControl
      value={value}
      onChange={(val) => {
        onChange(val);
        navigate(`/${val}`);
      }}
      data={data}
      orientation="vertical"
      fullWidth
      classNames={{
        root: `${scClasses["base-control"]} ${classes["nav-root"]}`,
        control: scClasses["control-item"],
        label: scClasses["control-label"],
        indicator: scClasses["control-indicator"],
      }}
    />
  );
}
