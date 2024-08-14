import { Action, Icon } from "@raycast/api";
import EditForm from "./editBranchForm";
import { BranchInfoFile } from "../types";

export default function EditBranchAction(props: { file: BranchInfoFile }) {
  return (
    <Action.Push
      icon={{ source: Icon.Pencil }}
      title="Edit Branch"
      shortcut={{ modifiers: ["cmd"], key: "e" }}
      target={<EditForm file={props.file} />}
    />
  );
}
