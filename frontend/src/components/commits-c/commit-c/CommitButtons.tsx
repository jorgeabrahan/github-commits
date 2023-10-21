import { showToastError, showToastSuccess } from '../../../helpers'
import type { CommitI } from '../../../interfaces'

export const CommitButtons = ({ commit }: { commit: CommitI }) => {
  const handleCommitSHACopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(commit.sha)
      showToastSuccess('SHA copied to clipboard')
      return
    }
    showToastError("Couldn't copy to clipboard")
  }
  return (
    <div className="flex items-start gap-2 lg:gap-3 self-end lg:self-auto">
      <div className="flex items-center bg-rich-black border border-solid border-white/10 backdrop-blur-md rounded-lg px-2 h-8">
        <button
          className="pr-2 [&>*]:pointer-events-none [&>span.material-symbols-outlined]:text-lg"
          title="copy full SHA"
          onClick={handleCommitSHACopy}
        >
          <span className="material-symbols-outlined">content_copy</span>
          <span className="sr-only">Copy full SHA</span>
        </button>
        <a
          className="pl-2 flex border-l border-solid border-white/10"
          href={`https://github.com/${commit?.committer?.login}/github-commits/commit/${commit?.sha}`}
          target="_blank"
          title="View commit details"
        >
          <span className="font-mono font-thin text-xs">{commit?.sha?.slice(0, 7)}</span>
          <span className="sr-only">View commit details</span>
        </a>
      </div>
      <a
        href={`https://github.com/${commit?.committer?.login}/github-commits/tree/${commit?.sha}`}
        target="_blank"
        className="[&>*]:pointer-events-none [&>span.material-symbols-outlined]:text-lg flex items-center px-2 h-8 bg-rich-black border border-solid border-white/10 backdrop-blur-md rounded-lg"
        title="Browse repository at this point in history"
      >
        <span className="material-symbols-outlined">history</span>
        <span className="sr-only">Browse repository at this point in history</span>
      </a>
    </div>
  )
}
