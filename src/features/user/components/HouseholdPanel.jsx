import { Button, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMinus, IconClock, IconUser } from "@tabler/icons-react";
import CardSection from "../../../shared/components/CardSection";
import RecordRow from "../../../shared/components/RecordRow";

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
      <CardSection
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
            <RecordRow
              key={member.id}
              title={member.name}
              icon={
                pending ? (
                  <IconClock size={14} color="var(--color-warning)" />
                ) : (
                  <IconUser size={14} />
                )
              }
              badge={pending && <Badge size="xs">Absence Pending</Badge>}
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
