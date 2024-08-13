import { ActionPanel, Action, Icon } from "@raycast/api";
import { BranchInfo } from "../types";
import CreateBranchAction from "./createBranchAction";

export default function ListActions(branchInfo: BranchInfo) {
  return (
    <ActionPanel>
      <ActionPanel.Submenu title="Action">
        <Action.OpenInBrowser
          title="Open Issue"
          icon={{ source: Icon.Globe }}
          url={`https://github.com/${branchInfo.owner}/${branchInfo.prRepository}/issue/${branchInfo.prNumber}`}
          shortcut={{ modifiers: ["cmd"], key: "i" }}
        />
        <Action.OpenInBrowser
          title="Open PullRequest"
          icon={{ source: Icon.Globe }}
          url={`https://github.com/${branchInfo.owner}/${branchInfo.issueRepository}/pull/${branchInfo.issueNumber}`}
          shortcut={{ modifiers: ["cmd"], key: "r" }}
        />
        <Action.CopyToClipboard
          title="Copy Branch Name"
          icon={{ source: Icon.CopyClipboard }}
          content={branchInfo.branch}
          shortcut={{ modifiers: ["cmd"], key: "c" }}
        />
        <ActionPanel.Submenu title="Edit" shortcut={{ modifiers: ["cmd"], key: "e" }}>
          <Action title="Edit" icon={{ source: Icon.Pencil }} onAction={() => console.log("Add help wanted label")} />
          <Action title="Delete" icon={{ source: Icon.Trash }} onAction={() => console.log("Add help wanted label")} />
        </ActionPanel.Submenu>
      </ActionPanel.Submenu>
      <CreateBranchAction />
    </ActionPanel>
  );
}
