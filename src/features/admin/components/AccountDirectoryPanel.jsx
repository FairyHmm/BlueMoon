import { SegmentedControl } from "@mantine/core";
import { IconUserShield } from "@tabler/icons-react";
import CardSection from "../../../shared/components/CardSection";
import RecordRow from "../../../shared/components/RecordRow";
import StatusMenu from "../../../shared/components/StatusMenu";

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

  const renderAccount = (account) => {
    const residentName = residentMap.get(account.resident_id);

    const isCurrentUser = account.id === currentUser?.id;

    return (
      <RecordRow
        key={account.id}
        title={account.username}
        boldTitle={isCurrentUser}
        subtext={
          residentName
            ? `Cư dân liên kết: ${residentName}`
            : "Tài khoản nhân viên / Không có cư dân liên kết"
        }
        icon={
          <IconUserShield
            size={14}
            color={
              isCurrentUser ? "var(--color-primary)" : "var(--color-text-muted)"
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
    );
  };

  return (
    <CardSection
      title="Danh bạ tài khoản & Phân quyền"
      items={filteredUsers}
      emptyMessage="Không có dữ liệu."
      renderItem={(account) => {
        const residentName = residentMap.get(account.resident_id);

        const isCurrentUser = account.id === currentUser?.id;

        return (
          <RecordRow
            key={account.id}
            title={account.username}
            boldTitle={isCurrentUser}
            subtext={
              residentName
                ? `Cư dân liên kết: ${residentName}`
                : "Tài khoản nhân viên / Không có cư dân liên kết"
            }
            icon={<IconUserShield size={14} />}
            right={
              <StatusMenu
                value={account.role}
                options={Object.values(USER_ROLES)}
                getConfig={getRoleConfig}
                onUpdate={(role) => handleRoleUpdate(account.id, role)}
                readOnly={isCurrentUser}
              />
            }
          />
        );
      }}
    >
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
    </CardSection>
  );
}
