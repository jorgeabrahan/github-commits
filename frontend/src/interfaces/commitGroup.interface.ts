import type { CommitI } from "./commit.interface";

export interface CommitGroupI {
  date: string;
  group: CommitI[];
}
