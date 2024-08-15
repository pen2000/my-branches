import { List, getPreferenceValues } from "@raycast/api";
import EmptyView from "./components/emptyView";
import fs from "fs";
import path from "path";
import { useEffect, useState } from "react";
import { Preferences, BranchInfo, Filter, BranchInfoFile } from "./types";
import ListItem from "./components/listItem";

type State = {
  filter: Filter;
  isLoading: boolean;
  searchText: string;
  files: BranchInfoFile[];
  visibleFiles: BranchInfoFile[];
  reload: boolean;
};

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();
  const { directory } = preferences;

  const [state, setState] = useState<State>({
    filter: Filter.Working,
    isLoading: true,
    searchText: "",
    files: [],
    visibleFiles: [],
    reload: false,
  });

  useEffect(() => {
    setState((previous) => ({ ...previous, reload: true }));
  }, []);

  useEffect(() => {
    const files = convertFiles();
    setState((previous) => ({ ...previous, files: files, visibleFiles: files, reload: false, isLoading: false }));
  }, [state.reload]);

  // searchTextが空の場合は全てを表示
  const filterBySearchText = (branchInfo: BranchInfo) => {
    if (state.searchText === "") {
      return true;
    } else {
      return branchInfo.branch.includes(state.searchText) || branchInfo.description.includes(state.searchText);
    }
  };

  const convertFiles = () => {
    try {
      const files = fs.readdirSync(directory);
      return files
        .filter((file) => path.extname(file) === ".json")
        .map((file) => {
          const filePath = path.join(directory, file);
          const fileContent = fs.readFileSync(filePath, "utf-8");
          return {
            fileName: file,
            filePath: filePath,
            branchInfo: JSON.parse(fileContent) as BranchInfo,
          };
        });
    } catch (err) {
      console.error("Failed to parse JSON", err);
      return [];
    }
  };

  const filterFiles = () => {
    if (state.filter === Filter.All) {
      return state.files.filter((file) => filterBySearchText(file.branchInfo));
    } else {
      return state.files
        .filter((file) => file.branchInfo.status === state.filter)
        .filter((file) => filterBySearchText(file.branchInfo));
    }
  };

  const handleReload = () => {
    setState((previous) => ({ ...previous, reload: true }));
  };

  return (
    <List
      navigationTitle="Branches"
      isLoading={state.isLoading}
      searchText={state.searchText}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select Todo List"
          value={state.filter}
          onChange={(newValue) => setState((previous) => ({ ...previous, filter: newValue as Filter }))}
        >
          <List.Dropdown.Item title="All" value={Filter.All} />
          <List.Dropdown.Item title="Working" value={Filter.Working} />
          <List.Dropdown.Item title="Closed" value={Filter.Closed} />
        </List.Dropdown>
      }
      filtering={false}
      onSearchTextChange={(newValue) => {
        setState((previous) => ({ ...previous, searchText: newValue }));
      }}
    >
      {filterFiles().length === 0 ? (
        <EmptyView onReload={handleReload} />
      ) : (
        filterFiles().map((file) => ListItem(file, handleReload))
      )}
    </List>
  );
}
