import { Action, Icon } from "@raycast/api";
import EditForm from "./editForm";
import { BranchInfoFile } from "../types";

export default function EditAction(props: { file: BranchInfoFile; onReload: () => void }) {
  return (
    <Action.Push
      icon={{ source: Icon.Pencil }}
      title="Edit Branch"
      shortcut={{ modifiers: ["cmd"], key: "e" }}
      target={<EditForm file={props.file} onReload={props.onReload} />}
    />
  );
}
