import { calcTimeOffset } from "../../../helpers";
import type { CommitI } from "../../../interfaces";

export const CommitInfo = ({ commit }: { commit: CommitI }) => {
  return (
    <article>
        <a href={commit?.html_url} target="_blank" className="font-medium block mb-1 hover:underline">
          {commit?.commit?.message?.slice(0, 70)}{commit?.commit?.message?.length > 70 && '...'}
        </a>
        <div className="flex gap-2">
          <a href={`https://github.com/${commit?.committer?.login}`} target="_blank">
            <img
              className="hover:scale-110 transition-transform w-6 rounded-full aspect-square"
              src={commit?.committer?.avatar_url}
              alt={commit?.committer?.login}
            />
          </a>
          <a
            className="text-sm font-medium hover:underline"
            href={`https://github.com/${commit?.committer?.login}`}
            target="_blank"
          >
            {commit?.committer?.login}
          </a>
          <p className="text-sm text-slate-400">
            {calcTimeOffset(new Date(commit?.commit?.committer?.date))}
          </p>
        </div>
      </article>
  )
}
