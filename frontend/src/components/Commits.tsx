import axios from 'axios'
import { useEffect, useState } from 'react'
import { showToastError } from '../helpers'
import type { CommitI } from '../interfaces'
import { Commit } from './commits-c/Commit'

export const Commits = () => {
  const [commits, setCommits] = useState<CommitI[]>([])
  useEffect(() => {
    const fetchCommits = () => {
      axios
        .get('http://localhost:3000/commits')
        .then((res) => {
          setCommits(res?.data || [])
        })
        .catch((_) => {
          showToastError("Couldn't get commits")
        })
    }
    fetchCommits()
  }, [])
  return (
    <ul>
      {commits?.map((commit) => (
        <Commit key={commit?.sha} commit={commit} />
      ))}
    </ul>
  )
}
