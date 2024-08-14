import { Action, Icon, showToast, Toast } from "@raycast/api";
import { BranchInfoFile } from "../types";
import fs from "fs";

export default function DeleteAction(props: { file: BranchInfoFile; onReload: () => void }) {
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
        props.onReload();
      }
    });
  };

  return <Action title="Delete" icon={{ source: Icon.Trash }} onAction={() => deleteAction(props.file.filePath)} />;
}
