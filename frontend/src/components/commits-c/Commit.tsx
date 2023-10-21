import { calcTimeOffset, showToastError, showToastSuccess } from '../../helpers'
import type { CommitI } from '../../interfaces'

export const Commit = ({ commit }: { commit: CommitI }) => {
  return (
    <li className="px-4 py-3 border-b border-solid border-slate-700 bg-rich-black/75 backdrop-blur-lg backdrop-saturate-150 flex flex-col lg:flex-row lg:justify-between gap-5">
      <article>
        <a href={commit?.html_url} target="_blank" className="font-medium block mb-1">
          {commit?.commit?.message?.slice(0, 70)}{commit?.commit?.message?.length > 70 && '...'}
        </a>
        <div className="flex gap-2">
          <a href={`https://github.com/${commit?.committer?.login}`} target="_blank">
            <img
              className="w-6 rounded-full aspect-square"
              src={commit?.committer?.avatar_url}
              alt={commit?.committer?.login}
            />
          </a>
          <a
            className="text-sm font-medium"
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
      <div className="flex items-start gap-2 lg:gap-3 self-end lg:self-auto">
        <div className='flex items-center bg-neutral-800 border border-solid border-white/10 backdrop-blur-md rounded-lg px-2 h-8'>
          <button
            className="pr-2 [&>*]:pointer-events-none [&>span.material-symbols-outlined]:text-lg"
            title="copy full SHA"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(commit.sha);
                showToastSuccess('SHA copied to clipboard')
                return
              }
              showToastError("Couldn't copy to clipboard")
            }}
          >
            <span className="material-symbols-outlined">content_copy</span>
            <span className="sr-only">Copy full SHA</span>
          </button>
          <a
            className="pl-2 flex border-l border-solid border-white/10"
            href={`https://github.com/${commit?.committer?.login}/github-commits/commit/${commit?.sha}`}
            target='_blank'
            title='View commit details'
          >
            <span className="font-mono font-thin text-xs">{commit?.sha?.slice(0, 7)}</span>
            <span className='sr-only'>View commit details</span>
          </a>
        </div>
        <a
          href={`https://github.com/${commit?.committer?.login}/github-commits/tree/${commit?.sha}`}
          target="_blank"
          className="[&>*]:pointer-events-none [&>span.material-symbols-outlined]:text-lg flex items-center px-2 h-8 bg-neutral-800 border border-solid border-white/10 backdrop-blur-md rounded-lg"
          title="Browse repository at this point in history"
        >
          <span className="material-symbols-outlined">history</span>
          <span className="sr-only">Browse repository at this point in history</span>
        </a>
      </div>
    </li>
  )
}
