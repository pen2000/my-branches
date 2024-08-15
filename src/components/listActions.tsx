import { ActionPanel, Action, Icon } from "@raycast/api";
import { BranchInfoFile } from "../types";
import CreateAction from "./createAction";
import EditAction from "./editAction";
import DeleteAction from "./deleteAction";

export default function ListActions(file: BranchInfoFile, onReload: () => void) {
  return (
    <ActionPanel>
      <ActionPanel.Submenu title="Action">
        <Action.OpenInBrowser
          title="Open Issue"
          icon={{ source: Icon.Globe }}
          url={`https://github.com/${file.branchInfo.owner}/${file.branchInfo.issueRepository}/issues/${file.branchInfo.issueNumber}`}
          shortcut={{ modifiers: ["cmd"], key: "i" }}
        />
        {file.branchInfo.prNumber && (
          <Action.OpenInBrowser
            title="Open PullRequest"
            icon={{ source: Icon.Globe }}
            url={`https://github.com/${file.branchInfo.owner}/${file.branchInfo.prRepository}/pull/${file.branchInfo.prNumber}`}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
          />
        )}
        <Action.CopyToClipboard
          title="Copy Branch Name"
          icon={{ source: Icon.CopyClipboard }}
          content={file.branchInfo.branch}
          shortcut={{ modifiers: ["cmd"], key: "c" }}
        />
        <EditAction file={file} onReload={onReload} />
        <DeleteAction file={file} onReload={onReload} />
      </ActionPanel.Submenu>
      <CreateAction onReload={onReload} />
    </ActionPanel>
  );
}
