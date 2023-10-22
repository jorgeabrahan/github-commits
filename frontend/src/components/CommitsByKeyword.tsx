import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/apiConfig";
import { showToastError, showToastSuccess } from "../helpers";
import { CommitsAndFilters, LabeledInputFilter } from "./global";

export const CommitsByKeyword = () => {
  const [commits, setCommits] = useState([])
  const [keyword, setKeyword] = useState('create')
  const [isLoading, setIsLoading] = useState(true)
  const debouncedKeyword = useDebounce(keyword, 300)
  useEffect(() => {
    const fetchCommitsByKeyword = () => {
      axios
        .get(`${API_BASE_URL}/commits/keyword?keyword=${encodeURIComponent(debouncedKeyword)}`)
        .then((res) => {
          setCommits(res?.data || [])
          if (res?.data?.length === 0) {
            showToastSuccess('Query returned no results')
            return
          }
          showToastSuccess(`Query returned ${res?.data?.length} results`)
        })
        .catch((_) => showToastError("Couldn't get commits by author"))
        .finally(() => setIsLoading(false))
    }
    if (debouncedKeyword?.trim()?.length === 0) return
    setIsLoading(true)
    fetchCommitsByKeyword()
  }, [debouncedKeyword])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target === null) return
    setKeyword(e?.target?.value)
  }
  return (
    <CommitsAndFilters isLoading={isLoading} commits={commits}>
      <form className="flex gap-4 my-3 justify-end">
        <LabeledInputFilter handleInputChange={handleInputChange} value={keyword} label="Keyword" id='keyword' />
      </form>
    </CommitsAndFilters>
  )
}
