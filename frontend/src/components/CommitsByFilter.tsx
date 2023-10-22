import { useDebounce } from '@uidotdev/usehooks'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/apiConfig'
import { areDatesValid, showToastError, showToastSuccess } from '../helpers'
import { CommitsAndFilters, LabeledInputFilter } from './global'
import { InputDateFilter } from './global/InputDateFilter'

export const CommitsByFilter = () => {
  const [commits, setCommits] = useState([])
  const [filtersForm, setFiltersForm] = useState({
    author: 'jorgeabrahan',
    keyword: 'create',
    dateSince: '2023-10-01',
    dateUntil: '2023-10-31'
  })
  const [isLoading, setIsLoading] = useState(true)
  const debouncedFiltersForm = useDebounce(filtersForm, 300)
  useEffect(() => {
    const fetchCommitsByFilters = () => {
      axios
        .get(
          `${API_BASE_URL}/commits/filters?author=${encodeURIComponent(
            debouncedFiltersForm.author
          )}&dateSince=${debouncedFiltersForm.dateSince}&dateUntil=${
            debouncedFiltersForm.dateUntil
          }&keyword=${encodeURIComponent(debouncedFiltersForm.keyword)}`
        )
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
    if (!areDatesValid({ dateSince: debouncedFiltersForm.dateSince, dateUntil: debouncedFiltersForm.dateUntil })) return
    setIsLoading(true)
    fetchCommitsByFilters()
  }, [debouncedFiltersForm])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target === null || e?.target?.value === null) return
    if (e?.target?.name?.includes('date') && e?.target?.value?.length === 0) return
    setFiltersForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <CommitsAndFilters isLoading={isLoading} commits={commits}>
      <form className="flex gap-4 my-3 justify-end">
        <LabeledInputFilter
          handleInputChange={handleInputChange}
          value={filtersForm.author}
          id="author"
          label="Author"
        />
        <LabeledInputFilter
          handleInputChange={handleInputChange}
          value={filtersForm.keyword}
          id="keyword"
          label="Keyword"
        />
        <InputDateFilter
          handleInputChange={handleInputChange}
          value={filtersForm.dateSince}
          id="dateSince"
          label="Since"
        />
        <InputDateFilter
          handleInputChange={handleInputChange}
          value={filtersForm.dateUntil}
          id="dateUntil"
          label="Until"
        />
      </form>
    </CommitsAndFilters>
  )
}
