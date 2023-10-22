import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/apiConfig'
import { areDatesValid, showToastError, showToastSuccess } from '../helpers'
import { CommitsAndFilters } from './global'
import { useDebounce } from '@uidotdev/usehooks'
import { InputDateFilter } from './global/InputDateFilter'

export const CommitsByDate = () => {
  const [commits, setCommits] = useState([])
  const [datesForm, setDatesForm] = useState({
    dateSince: '2023-10-01',
    dateUntil: '2023-10-31'
  })
  const [isLoading, setIsLoading] = useState(true)
  const debouncedDatesForm = useDebounce(datesForm, 300)
  useEffect(() => {
    const fetchCommitsByDate = () => {
      axios
        .get(`${API_BASE_URL}/commits/date?dateSince=${debouncedDatesForm.dateSince}&dateUntil=${debouncedDatesForm.dateUntil}`)
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
    if (!areDatesValid(debouncedDatesForm)) return
    setIsLoading(true)
    fetchCommitsByDate()
  }, [debouncedDatesForm])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target === null || e?.target?.value === null || e?.target?.value?.length === 0) return
    setDatesForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <CommitsAndFilters isLoading={isLoading} commits={commits}>
      <form className='flex gap-4 my-3 justify-end'>
        <InputDateFilter handleInputChange={handleInputChange} value={datesForm.dateSince} id='dateSince' label='Since' />
        <InputDateFilter handleInputChange={handleInputChange} value={datesForm.dateUntil} id='dateUntil' label='Until' />
      </form>
    </CommitsAndFilters>
  )
}
