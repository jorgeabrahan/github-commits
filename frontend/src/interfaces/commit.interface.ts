export interface CommitI {
  sha: string;
  html_url: string;
  comments_url: string;
  commit: {
    committer: {
      date: string,
    }
    message: string,
    url: string,
  };
  author: {
    login: string,
    id: number,
    avatar_url: string
  };
  committer: {
    login: string,
    id: number,
    avatar_url: string,
    url: string,
  };
}
