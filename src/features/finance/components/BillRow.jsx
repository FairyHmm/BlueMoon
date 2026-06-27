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
    one_time: "Một lần",
    yearly: "Hàng năm",
    monthly: "Hàng tháng",
  };

  const readableInterval = intervals[rawInterval] || "Hàng tháng";

  return (
    <RecordRow
      boldTitle={!bill.optional}
      title={
        <Tooltip
          label={`${bill.optional ? "Tự nguyện" : "Bắt buộc"}. ${
            feeType?.description || ""
          }`}
          position="bottom-start"
          withArrow
          color="indigo.9"
        >
          <span>
            {feeType?.name || "Không xác định"} • {readableInterval}
          </span>
        </Tooltip>
      }
      subtext={
        <>
          Đến hạn: {formatDate(bill.due_date)}
          {isPaid && ` • Đã thanh toán: ${formatDate(bill.paid_date) || "—"}`}
        </>
      }
      right={
        <>
          <Text size="sm" fw={900} className="mono">
            {bill.amount.toLocaleString()} ₫
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
            options={Object.fromEntries(
              Object.entries(BILL_STATUS).filter(
                ([k]) =>
                  (k !== "OVERDUE" && k !== "DUE") ||
                  k === (displayStatus === "overdue" ? "OVERDUE" : "DUE"),
              ),
            )}
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
