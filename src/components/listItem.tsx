import { List, Color } from "@raycast/api";
import { BranchInfo } from "../types";
import { ISSUE_STATUS } from "../costants/issueStatus";
import ListActions from "./listActions";

export default function ListItem(file: BranchInfo) {
  const statusColor = (status: string) => {
    if (status === ISSUE_STATUS.WORKING.value) {
      return Color.Green;
    } else if (status === ISSUE_STATUS.CLOSED.value) {
      return Color.Blue;
    }
  };

  return (
    <List.Item
      title={file.branch}
      subtitle={file.description}
      keywords={[file.description]}
      accessories={[{ tag: { value: file.status, color: statusColor(file.status) } }]}
      actions={ListActions(file)}
    />
  );
}
