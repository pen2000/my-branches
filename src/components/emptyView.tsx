import { ActionPanel, List, Icon } from "@raycast/api";
import CreateBranchAction from "./createBranchAction";

export default function EmptyView() {
  return (
    <List.EmptyView
      icon={{ source: Icon.MagnifyingGlass }}
      title="Not found"
      actions={
        <ActionPanel>
          <CreateBranchAction />
        </ActionPanel>
      }
    />
  );
}
