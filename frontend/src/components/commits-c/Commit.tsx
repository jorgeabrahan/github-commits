import { calcTimeOffset } from "../../helpers";
import type { CommitI } from "../../interfaces";

export const Commit = ({ commit }: { commit: CommitI }) => {
  return (
    <li className="px-4 py-3 border-b border-solid border-slate-700 hover:bg-black/20">
      <article>
        <a href={commit?.html_url} target="_blank" className="font-medium mb-1">{commit?.commit?.message}</a>
        <div className="flex gap-2">
          <a href={commit?.committer?.avatar_url} target="_blank">
            <img className="w-6 rounded-full aspect-square" src={commit?.committer?.avatar_url} alt={commit?.committer?.login} />
          </a>
          <a className="text-sm font-medium" href={commit?.committer?.url}>{commit?.committer?.login}</a>
          <p className="text-sm text-slate-400">{calcTimeOffset(new Date(commit?.commit?.committer?.date))}</p>
        </div>
      </article>
    </li>
  );
}
