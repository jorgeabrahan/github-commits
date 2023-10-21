import type { CommitI } from '../../interfaces'
import { CommitButtons, CommitInfo } from './commit-c';

export const Commit = ({ commit }: { commit: CommitI }) => {
  return (
    <li className="px-4 py-3 border-b border-solid border-slate-700 bg-rich-black/75 backdrop-blur-lg backdrop-saturate-150 flex flex-col lg:flex-row lg:justify-between gap-5">
      <CommitInfo commit={commit} />
      <CommitButtons commit={commit} />
    </li>
  )
}
