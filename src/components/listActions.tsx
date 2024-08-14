import { ActionPanel, Action, Icon } from "@raycast/api";
import { BranchInfoFile } from "../types";
import CreateBranchAction from "./createBranchAction";
import EditBranchAction from "./editBranchAction";
import DeleteBranchAction from "./deleteBranchAction";

export default function ListActions(file: BranchInfoFile) {
  return (
    <ActionPanel>
      <ActionPanel.Submenu title="Action">
        <Action.OpenInBrowser
          title="Open Issue"
          icon={{ source: Icon.Globe }}
          url={`https://github.com/${file.branchInfo.owner}/${file.branchInfo.issueRepository}/issues/${file.branchInfo.issueNumber}`}
          shortcut={{ modifiers: ["cmd"], key: "i" }}
        />
        <Action.OpenInBrowser
          title="Open PullRequest"
          icon={{ source: Icon.Globe }}
          url={`https://github.com/${file.branchInfo.owner}/${file.branchInfo.prRepository}/pull/${file.branchInfo.prNumber}`}
          shortcut={{ modifiers: ["cmd"], key: "r" }}
        />
        <Action.CopyToClipboard
          title="Copy Branch Name"
          icon={{ source: Icon.CopyClipboard }}
          content={file.branchInfo.branch}
          shortcut={{ modifiers: ["cmd"], key: "c" }}
        />
        <ActionPanel.Submenu title="Edit" shortcut={{ modifiers: ["cmd"], key: "e" }}>
          <EditBranchAction file={file} />
          <DeleteBranchAction file={file} />
        </ActionPanel.Submenu>
      </ActionPanel.Submenu>
      <CreateBranchAction />
    </ActionPanel>
  );
}
