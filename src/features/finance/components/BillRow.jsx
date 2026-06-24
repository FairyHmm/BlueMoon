import { Text, ActionIcon, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import RecordRow from "../../../shared/components/RecordRow";
import StatusMenu from "../../../shared/components/StatusMenu";
import { BILL_STATUS } from "../utils/constants";
import {
  getBillStatusConfig,
  getBillDisplayStatus,
  formatDate,
} from "../utils/billing";

export default function BillRow({ bill, feeType, onUpdate, onDelete }) {
  const displayStatus = getBillDisplayStatus(bill);
  const isPaid = bill.status === "paid";

  const rawInterval = bill.interval || feeType?.interval || "monthly";

  const intervals = {
    one_time: "One-Time",
    yearly: "Yearly",
    monthly: "Monthly",
  };

  const readableInterval = intervals[rawInterval] || "Monthly";

  return (
    <RecordRow
      boldTitle={!bill.optional}
      title={
        <Tooltip
          label={`${bill.optional ? "Optional" : "Mandatory"}. ${
            feeType?.description || ""
          }`}
          position="bottom-start"
          withArrow
          color="indigo.9"
        >
          <span>
            {feeType?.name || "Unknown"} • {readableInterval}
          </span>
        </Tooltip>
      }
      subtext={
        <>
          Due: {formatDate(bill.due_date)}
          {isPaid && ` • Paid: ${formatDate(bill.paid_date) || "—"}`}
        </>
      }
      right={
        <>
          <Text size="sm" fw={900} className="mono">
            ${bill.amount.toLocaleString()}
          </Text>

          {onDelete && (
            <ActionIcon
              color="red"
              variant="subtle"
              size="xs"
              onClick={() => onDelete(bill.id)}
            >
              <IconTrash size={14} />
            </ActionIcon>
          )}

          <StatusMenu
            value={displayStatus}
            options={BILL_STATUS}
            getConfig={getBillStatusConfig}
            onUpdate={
              onUpdate ? (status) => onUpdate(bill.id, status) : undefined
            }
            readOnly={!onUpdate}
          />
        </>
      }
    />
  );
}
