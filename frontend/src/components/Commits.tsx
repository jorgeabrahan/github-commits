import axios from 'axios'
import { useEffect, useState } from 'react'
import { monthNumberToString, showToastError } from '../helpers'
import type { CommitI, CommitGroupI } from '../interfaces'
import { Commit } from './commits-c/Commit'

export const Commits = () => {
  const [commitGroups, setCommitGroups] = useState<CommitGroupI[]>([])
  useEffect(() => {
    const fetchCommits = () => {
      axios
        .get('http://localhost:3000/commits')
        .then((res) => {
          setCommitGroups(groupCommitsByDate(res?.data || []))
        })
        .catch((_) => showToastError("Couldn't get commits"))
    }
    fetchCommits()
  }, [])
  return (
    <>
      {commitGroups?.map((commitGroup) => {
        const commitGroupDate = new Date(commitGroup?.date)
        return (
          <section className="relative my-6" key={commitGroupDate.getTime()}>
            <h2 className="text-slate-400 mb-3">
              Commits on {monthNumberToString(commitGroupDate.getMonth())}{' '}
              {commitGroupDate.getDate()}, {commitGroupDate.getFullYear()}
            </h2>
            <ul className="border border-solid border-slate-700 rounded-xl [&>li:first-child]:rounded-t-xl [&>li:last-child]:border-none [&>li:last-child]:rounded-b-xl">
              {commitGroup?.group?.map((commit: CommitI) => (
                <Commit key={commit?.sha} commit={commit} />
              ))}
            </ul>
          </section>
        )
      })}
    </>
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
