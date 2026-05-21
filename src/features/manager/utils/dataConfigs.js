import {
  IconUsers,
  IconCar,
  IconCurrencyDollar,
  IconAlertCircle,
} from "@tabler/icons-react";

export const chartConfig = (stats) => [
  {
    key: "residents-status",
    title: "Resident Status",
    data: [
      {
        name: "Active",
        value: stats.residents.status.active || 0,
        color: "var(--color-success)",
      },
      {
        name: "Pending",
        value: stats.residents.status.pending || 0,
        color: "var(--color-incomplete)",
      },
      {
        name: "Inactive",
        value: stats.residents.status.inactive || 0,
        color: "var(--color-danger)",
      },
    ],
  },
  {
    key: "vehicle-types",
    title: "Vehicle Types",
    data: [
      {
        name: "Car",
        value: stats.vehicles.types.car || 0,
        color: "var(--color-warning)",
      },
      {
        name: "Motorbike",
        value: stats.vehicles.types.motorbike || 0,
        color: "var(--color-incomplete)",
      },
    ],
  },
  {
    key: "unit-occupancy",
    title: "Unit Occupancy",
    data: [
      {
        name: "Occupied",
        value: stats.units.occupied,
        color: "var(--color-primary)",
      },
      {
        name: "Vacant",
        value: stats.units.vacant,
        color: "var(--color-text-muted)",
      },
    ],
  },

  {
    key: "apartment-types",
    title: "Apartment Types",
    data: [
      {
        name: "Standard",
        value: stats.units.types.Standard,
        color: "var(--color-primary)",
      },
      {
        name: "Studio",
        value: stats.units.types.Studio,
        color: "var(--color-warning)",
      },
      {
        name: "Duplex",
        value: stats.units.types.Duplex,
        color: "var(--color-success)",
      },
      {
        name: "Penthouse",
        value: stats.units.types.Penthouse,
        color: "var(--color-danger)",
      },
    ],
  },
];

export const kpiConfig = (stats) => [
  {
    key: "revenue",
    label: "Recent Revenue",
    value: `$${stats.billing.revenue.toLocaleString()}`,
    description: `${stats.billing.paid} bills paid`,
    icon: IconCurrencyDollar,
    color: "var(--color-success)",
  },
  {
    key: "debt",
    label: "Outstanding Debt",
    value: `$${stats.billing.outstanding.toLocaleString()}`,
    description: `${stats.billing.unpaid} unpaid bills`,
    icon: IconAlertCircle,
    color: "var(--color-danger)",
  },
  {
    key: "vacancy-alert",
    label: "Vacant Units",
    value: stats.units.vacant,
    description: `${stats.units.total} total units`,
    icon: IconAlertCircle,
    color: "var(--color-danger)",
  },
  {
    key: "residents",
    label: "Residents",
    value: stats.residents.total,
    description: `${stats.residents.status.pending || 0} pending approval`,
    icon: IconUsers,
    color: "var(--color-primary)",
  },
  {
    key: "resident-heads",
    label: "Resident Heads",
    value: stats.residents.heads,
    description: `${stats.residents.dependents} dependents`,
    icon: IconUsers,
    color: "var(--color-success)",
  },
  {
    key: "vehicles",
    label: "Vehicles",
    value: stats.vehicles.total,
    description: "Registered permits",
    icon: IconCar,
    color: "var(--color-text-muted)",
  },
];
