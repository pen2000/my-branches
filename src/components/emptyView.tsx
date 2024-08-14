import { ActionPanel, List, Icon } from "@raycast/api";
import CreateAction from "./createAction";

export default function EmptyView() {
  return (
    <List.EmptyView
      icon={{ source: Icon.MagnifyingGlass }}
      title="Not found"
      actions={
        <ActionPanel>
          <CreateAction />
        </ActionPanel>
      }
    />
  );
}
