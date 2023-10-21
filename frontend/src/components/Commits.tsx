import axios from 'axios'
import { useEffect, useState } from 'react'
import { showToastError, showToastSuccess } from '../helpers'
import type { CommitI, CommitGroupI } from '../interfaces'
import { CommitAccordion } from './commits-c'
import { API_BASE_URL } from '../config/apiConfig'
import { CommitsList } from './commits-c/CommitsList'
import { LoadingIcon, NothingFound } from './global'

export const Commits = () => {
  const [commitGroups, setCommitGroups] = useState<CommitGroupI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchCommits = () => {
      axios
        .get(`${API_BASE_URL}/commits`)
        .then((res) => {
          setCommitGroups(groupCommitsByDate(res?.data || []))
          if (res?.data?.length === 0) {
            showToastSuccess('Query returned no results')
            return
          }
          showToastSuccess(`Query returned ${res?.data?.length} results`)
        })
        .catch((_) => showToastError("Couldn't get commits"))
        .finally(() => setIsLoading(false))
    }
    setIsLoading(true)
    fetchCommits()
  }, [])
  if (isLoading) return <LoadingIcon />
  else if (commitGroups?.length === 0) return <NothingFound />
  return (
    commitGroups?.map((commitGroup) => {
      const commitGroupDate = new Date(commitGroup?.date)
      return (
        <CommitAccordion key={commitGroupDate.getTime()} commitGroupDate={commitGroupDate}>
          <CommitsList commits={commitGroup?.group} />
        </CommitAccordion>
      )
    })
  )
}

const groupCommitsByDate = (commits: CommitI[]) => {
  const groups = []
  const uniqueDates = new Set()
  for (const commit of commits) {
    const date = new Date(commit?.commit?.committer?.date)
    const commitDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    if (uniqueDates.has(commitDate)) {
      groups[groups.length - 1]?.group?.push(commit)
      continue
    }
    uniqueDates.add(commitDate)
    groups.push({ date: commit?.commit?.committer?.date, group: [commit] })
  }
  return groups
}
