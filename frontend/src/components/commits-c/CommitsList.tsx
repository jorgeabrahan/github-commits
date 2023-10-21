import { Commit } from '.'
import type { CommitI } from '../../interfaces'

export const CommitsList = ({ commits }: { commits: CommitI[] }) => {
  return (
    <ul className="border border-solid border-slate-700 rounded-xl [&>li:first-child]:rounded-t-xl [&>li:last-child]:border-none [&>li:last-child]:rounded-b-xl">
      {commits?.map((commit: CommitI) => (
        <Commit key={commit?.sha} commit={commit} />
      ))}
    </ul>
  )
}
