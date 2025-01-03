import { Action, ActionPanel, Form, getPreferenceValues, showToast, Toast, useNavigation } from "@raycast/api";
import { useForm, FormValidation } from "@raycast/utils";
import { ISSUE_STATUS } from "../costants/issueStatus";
import fs from "fs";
import path from "path";
import { Preferences, BranchInfo } from "../types";

export default function CreateForm(props: { onReload: () => void }) {
  const preferences = getPreferenceValues<Preferences>();
  const { directory, issueRepository, prRepository, owner } = preferences;
  const { pop } = useNavigation();

  const { handleSubmit, itemProps } = useForm<BranchInfo>({
    onSubmit(values) {
      const fileName = `${values.branch}.json`;
      const filePath = path.join(directory, fileName);
      const jsonString = JSON.stringify(values, null, 2);
      fs.writeFile(filePath, jsonString, "utf8", (err) => {
        if (err) {
          showToast({
            style: Toast.Style.Failure,
            title: "An error occurred",
            message: err.message,
          });
        } else {
          showToast({
            style: Toast.Style.Success,
            title: "Successfully created",
            message: fileName,
          });
          props.onReload();
          pop();
        }
      });
    },
    initialValues: {
      owner: owner || "",
      issueRepository: issueRepository || "",
      prRepository: prRepository || "",
    },
    validation: {
      owner: FormValidation.Required,
      issueRepository: FormValidation.Required,
      issueNumber: FormValidation.Required,
      branch: FormValidation.Required,
      description: FormValidation.Required,
    },
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField title="Owner" placeholder="owner_name" {...itemProps.owner} />
      <Form.TextField title="Issue repository" placeholder="issue_repository" {...itemProps.issueRepository} />
      <Form.TextField title="PullRequest repository" placeholder="branch_repository" {...itemProps.prRepository} />
      <Form.TextField title="Issue number" placeholder="1234" autoFocus={true} {...itemProps.issueNumber} />
      <Form.TextField title="PullRequest number" placeholder="5678" {...itemProps.prNumber} />
      <Form.TextField title="Branch" placeholder="my_branch_1234" {...itemProps.branch} />
      <Form.TextField title="Description" placeholder="〇〇機能開発" {...itemProps.description} />
      <Form.Dropdown id="status" title="Status" defaultValue={ISSUE_STATUS.WORKING.value}>
        {Object.values(ISSUE_STATUS).map((status) => (
          <Form.Dropdown.Item value={status.value} title={status.label} key={status.value} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
