import { Paper, SegmentedControl, Stack, Text } from "@mantine/core";

import { IconUserShield } from "@tabler/icons-react";

import DashboardCard from "../../../shared/components/DashboardCard";
import RegistryRow from "../../residents/components/RegistryRow";

import { FILTER_OPTIONS, USER_ROLES, getRoleConfig } from "../utils/constants";

import scClasses from "../../../shared/styles/mantine/segmented-control.module.css";

export default function AccountDirectoryPanel({
  filteredUsers,
  residents,
  currentUser,
  filter,
  setFilter,
  handleRoleUpdate,
}) {
  const residentMap = new Map(
    residents.map((resident) => [resident.id, resident.name]),
  );

  const renderEmptyState = () => (
    <Text size="xs" c="dimmed" ta="center" py="xl">
      No record found.
    </Text>
  );

  const renderAccount = (account) => {
    const residentName = residentMap.get(account.resident_id);

    const isCurrentUser = account.id === currentUser?.id;

    return (
      <Paper key={account.id} bg="var(--color-bg-input)">
        <RegistryRow
          title={account.username}
          boldTitle={isCurrentUser}
          subtext={
            residentName
              ? `Linked Resident: ${residentName}`
              : "Staff Account / No linked resident"
          }
          icon={
            <IconUserShield
              size={14}
              color={
                isCurrentUser
                  ? "var(--color-primary)"
                  : "var(--color-text-muted)"
              }
            />
          }
          status={{
            value: account.role,
            options: USER_ROLES,
            getConfig: getRoleConfig,
            onUpdate: (role) => handleRoleUpdate(account.id, role),
          }}
          readOnly={isCurrentUser}
        />
      </Paper>
    );
  };

  return (
    <DashboardCard title="Account Directory & Permissions">
      <SegmentedControl
        size="xs"
        fullWidth
        value={filter}
        onChange={setFilter}
        data={FILTER_OPTIONS}
        classNames={{
          root: scClasses["base-control"],
          control: scClasses["control-item"],
          label: scClasses["control-label"],
          indicator: scClasses["control-indicator"],
        }}
      />

      <Stack gap="sm">
        {filteredUsers.length
          ? filteredUsers.map(renderAccount)
          : renderEmptyState()}
      </Stack>
    </DashboardCard>
  );
}
