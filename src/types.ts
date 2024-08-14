interface Preferences {
  directory: string;
  issueRepository: string;
  prRepository: string;
  owner: string;
}

interface BranchInfo {
  owner: string;
  issueRepository: string;
  prRepository: string;
  issueNumber: string;
  prNumber: string;
  branch: string;
  description: string;
  status: string;
}

interface BranchInfoFile {
  fileName: string;
  filePath: string;
  branchInfo: BranchInfo;
}

enum Filter {
  All = "all",
  Working = "working",
  Closed = "closed",
}

export { Filter };
export type { Preferences, BranchInfo, BranchInfoFile };
