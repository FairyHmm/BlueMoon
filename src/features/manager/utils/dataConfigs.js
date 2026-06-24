import {
  IconUsers,
  IconCar,
  IconCurrencyDollar,
  IconAlertCircle,
  IconHeartHandshake,
} from "@tabler/icons-react";

export const chartConfig = (stats) => [
  {
    key: "residents-status",
    title: "Trạng thái cư dân",
    data: [
      {
        name: "Hoạt động",
        value: stats.residents.status.active || 0,
        color: "var(--color-success)",
      },
      {
        name: "Đang chờ",
        value: stats.residents.status.pending || 0,
        color: "var(--color-incomplete)",
      },
      {
        name: "Ngừng hoạt động",
        value: stats.residents.status.inactive || 0,
        color: "var(--color-danger)",
      },
    ],
  },
  {
    key: "vehicle-types",
    title: "Loại xe",
    data: [
      {
        name: "Ô tô",
        value: stats.vehicles.types.car || 0,
        color: "var(--color-warning)",
      },
      {
        name: "Xe máy",
        value: stats.vehicles.types.motorbike || 0,
        color: "var(--color-incomplete)",
      },
    ],
  },
  {
    key: "unit-occupancy",
    title: "Tình trạng căn hộ",
    data: [
      {
        name: "Có người ở",
        value: stats.units.occupied,
        color: "var(--color-primary)",
      },
      {
        name: "Trống",
        value: stats.units.vacant,
        color: "var(--color-text-muted)",
      },
    ],
  },

  {
    key: "apartment-types",
    title: "Loại căn hộ",
    data: [
      {
        name: "Tiêu chuẩn",
        value: stats.units.types.standard || 0,
        color: "var(--color-primary)",
      },
      {
        name: "Studio",
        value: stats.units.types.studio || 0,
        color: "var(--color-warning)",
      },
      {
        name: "Duplex",
        value: stats.units.types.duplex || 0,
        color: "var(--color-success)",
      },
    ],
  },
];

export const kpiConfig = (stats) => [
  {
    key: "revenue",
    label: "Doanh thu gần đây",
    value: `$${stats.billing.revenue.toLocaleString()}`,
    description: `${stats.billing.paid} hóa đơn đã thanh toán`,
    icon: IconCurrencyDollar,
    color: "var(--color-success)",
  },
  {
    key: "debt",
    label: "Nợ chưa thanh toán",
    value: `$${stats.billing.outstanding.toLocaleString()}`,
    description: `${stats.billing.unpaid} hóa đơn chưa thanh toán`,
    icon: IconAlertCircle,
    color: "var(--color-danger)",
  },
  {
    key: "vacancy-alert",
    label: "Căn hộ trống",
    value: stats.units.vacant,
    description: `${stats.units.total} tổng số căn hộ`,
    icon: IconAlertCircle,
    color: "var(--color-danger)",
  },
  {
    key: "residents",
    label: "Cư dân",
    value: stats.residents.total,
    description: `${stats.residents.status.pending || 0} đang chờ phê duyệt`,
    icon: IconUsers,
    color: "var(--color-primary)",
  },
  {
    key: "resident-heads",
    label: "Chủ hộ",
    value: stats.residents.heads,
    description: `${stats.residents.dependents} người phụ thuộc`,
    icon: IconUsers,
    color: "var(--color-success)",
  },
  {
    key: "vehicles",
    label: "Xe cộ",
    value: stats.vehicles.total,
    description: "Giấy phép đã đăng ký",
    icon: IconCar,
    color: "var(--color-text-muted)",
  },
  {
    key: "voluntary-payments",
    label: "Thanh toán tự nguyện",
    value: `$${stats.billing.optional.revenue.toLocaleString()}`,
    description: `${stats.billing.optional.paid} hóa đơn tự nguyện đã thanh toán`,
    icon: IconHeartHandshake,
    color: "var(--color-success)",
  },
];
