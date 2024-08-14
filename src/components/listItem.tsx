import { List, Color } from "@raycast/api";
import { BranchInfoFile } from "../types";
import { ISSUE_STATUS } from "../costants/issueStatus";
import ListActions from "./listActions";

export default function ListItem(file: BranchInfoFile, onReload: () => void) {
  const statusColor = (status: string) => {
    switch (status) {
      case ISSUE_STATUS.WORKING.value:
        return Color.Green;
      case ISSUE_STATUS.CLOSED.value:
        return Color.Blue;
      default:
        return Color.PrimaryText;
    }
  };

  return (
    <List.Item
      key={file.filePath}
      title={file.branchInfo.branch}
      subtitle={file.branchInfo.description}
      keywords={[file.branchInfo.description]}
      accessories={[{ tag: { value: file.branchInfo.status, color: statusColor(file.branchInfo.status) } }]}
      actions={ListActions(file, onReload)}
    />
  );
}
