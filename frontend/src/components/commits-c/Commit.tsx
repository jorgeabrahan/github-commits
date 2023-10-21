import type { CommitI } from "../../interfaces";

export const Commit = ({ commit }: { commit: CommitI }) => {
  const [date, time] = commit?.commit?.committer?.date?.replace('Z', '')?.split('T')
  return (
    <li>
      <p>{commit?.commit?.message}</p>
      <div>
        <a href={commit?.committer?.avatar_url}>
          <img src={commit?.committer?.avatar_url} alt={commit?.committer?.login} />
        </a>
        <a href={commit?.committer?.url}>{commit?.committer?.login}</a>
        <span>{date}</span>
        <br />
        <span>{time}</span>
      </div>
    </li>
  );
}
