import { Button, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMinus, IconClock, IconUser } from "@tabler/icons-react";
import DashboardCard, { DashboardRow } from "../../../shared/components/DashboardCard";

import AbsenceModal from "./AbsenceModal";

export default function HouseholdPanel({
  household = [],
  residentId,
  absenceLogs = [],
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const pendingResidentIds = new Set(
    absenceLogs
      .filter((log) => log.status === "pending")
      .map((log) => log.resident_id),
  );

  return (
    <>
      <DashboardCard
        title="Members"
        items={household}
        emptyMessage="No members."
        footer={
          <Button
            size="xs"
            fullWidth
            onClick={open}
            leftSection={<IconCalendarMinus size={14} />}
          >
            Report Absence
          </Button>
        }
        renderItem={(member) => {
          const pending = pendingResidentIds.has(member.id);

          return (
            <DashboardRow
              rowKey={member.id}
              icon={pending ? IconClock : IconUser}
              iconColor={pending ? "yellow" : member.is_head ? "blue" : "gray"}
              label={member.name}
              badge={
                pending && (
                  <Badge size="xs" color="var(--color-warning)">
                    Absence Pending
                  </Badge>
                )
              }
            />
          );
        }}
      />

      <AbsenceModal
        opened={opened}
        onClose={close}
        household={household}
        defaultResidentId={residentId}
      />
    </>
  );
}
