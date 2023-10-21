import type { CommitI } from "./commit.interface";

export interface CommitGroupI {
  date: Date;
  group: CommitI[];
}
