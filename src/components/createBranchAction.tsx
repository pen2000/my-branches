import { Action, Icon } from "@raycast/api";
import CreateForm from "./createBranchForm";

export default function CreateBranchAction() {
  return (
    <Action.Push
      icon={Icon.Plus}
      title="Add Branch"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CreateForm />}
    />
  );
}
