export const RESIDENT_SCHEMA = [
  {
    label: "UID",
    key: "id",
    className: "mono color-primary",
    render: (v) => v.toString().slice(-6),
  },
  { label: "NAME", key: "name", className: "fw-bold" },
  { label: "APT", key: "apartment_id", className: "mono color-muted" },
  {
    label: "HEAD",
    key: "is_head",
    align: "center",
    type: "boolean",
  },
  {
    label: "STATUS",
    key: "status",
    type: "status",
  },
];
