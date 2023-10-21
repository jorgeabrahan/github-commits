import type { ReactNode } from 'react'
import { LoadingIcon, NothingFound } from '.'
import type { CommitI } from '../../interfaces'
import { CommitsList } from '../commits-c/CommitsList'

export const CommitsAndFilters = ({
  children,
  isLoading,
  commits
}: {
  children: ReactNode
  isLoading: boolean
  commits: CommitI[]
}) => {
  let content
  if (isLoading) content = <LoadingIcon />
  else if (commits?.length === 0) content = <NothingFound />
  else content = <CommitsList commits={commits} />
  return (
    <>
      {children}
      {content}
    </>
  )
}
