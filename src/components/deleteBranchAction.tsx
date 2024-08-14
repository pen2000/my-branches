import { Action, Icon, showToast, Toast, useNavigation } from "@raycast/api";
import { BranchInfoFile } from "../types";
import fs from "fs";

export default function DeleteBranchAction(props: { file: BranchInfoFile }) {
  const { pop } = useNavigation();

  const deleteAction = (filePath: string) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        showToast({
          style: Toast.Style.Failure,
          title: "Failure",
          message: err.message,
        });
      } else {
        showToast({
          style: Toast.Style.Success,
          title: "Success",
          message: "Delete file",
        });
        pop();
      }
    });
  };

  return <Action title="Delete" icon={{ source: Icon.Trash }} onAction={() => deleteAction(props.file.filePath)} />;
}
