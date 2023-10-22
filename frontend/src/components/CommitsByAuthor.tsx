import React, { useEffect, useState } from "react"
import { showToastError, showToastSuccess } from "../helpers"
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios"
import { API_BASE_URL } from "../config/apiConfig"
import { CommitsAndFilters, LabeledInputFilter } from "./global";

export const CommitsByAuthor = () => {
  const [commits, setCommits] = useState([])
  const [author, setAuthor] = useState('jorgeabrahan')
  const [isFiltering, setIsFiltering] = useState(true)
  const debouncedAuthor = useDebounce(author, 300)
  useEffect(() => {
    const fetchCommitsByAuthor = () => {
      axios
        .get(`${API_BASE_URL}/commits/author?author=${encodeURIComponent(debouncedAuthor)}`)
        .then((res) => {
          setCommits(res?.data || [])
          if (res?.data?.length === 0) {
            showToastSuccess('Query returned no results')
            return
          }
          showToastSuccess(`Query returned ${res?.data?.length} results`)
        })
        .catch((_) => showToastError("Couldn't get commits by author"))
        .finally(() => setIsFiltering(false))
    }
    if (debouncedAuthor?.trim()?.length === 0) return
    setIsFiltering(true)
    fetchCommitsByAuthor()
  }, [debouncedAuthor])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target === null) return
    setAuthor(e?.target?.value)
  }
  return (
    <CommitsAndFilters isLoading={isFiltering} commits={commits}>
      <form className="flex gap-4 my-3 justify-end">
        <LabeledInputFilter handleInputChange={handleInputChange} value={author} label="Author" id='author' />
      </form>
    </CommitsAndFilters>
  )
}
