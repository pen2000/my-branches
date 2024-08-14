import { Action, Icon } from "@raycast/api";
import CreateForm from "./createForm";

export default function CreateAction() {
  return (
    <Action.Push
      icon={Icon.Plus}
      title="Add Branch"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CreateForm />}
    />
  );
}
