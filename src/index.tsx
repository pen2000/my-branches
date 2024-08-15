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
    filter: Filter.All,
    isLoading: true,
    searchText: "",
    files: [],
    visibleFiles: [],
    reload: false,
  });

  // 初回時の描画
  useEffect(() => {
    setState((previous) => ({ ...previous, reload: true }));
  }, []);

  // reload指定時の描画
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

  // ファイルをオブジェクトに変換s
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
        <>
          <List.Section title="Working">
            {filterFiles()
              .filter((file) => file.branchInfo.status === Filter.Working)
              .map((file) => ListItem(file, handleReload))}
          </List.Section>
          <List.Section title="Closed">
            {filterFiles()
              .filter((file) => file.branchInfo.status === Filter.Closed)
              .map((file) => ListItem(file, handleReload))}
          </List.Section>
        </>
      )}
    </List>
  );
}
