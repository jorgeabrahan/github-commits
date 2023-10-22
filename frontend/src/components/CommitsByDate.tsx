import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/apiConfig'
import { showToastError, showToastSuccess } from '../helpers'
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

const validateDate = (date: string): boolean => {
  const [year, month, day] = date.split('-')
  if (isNaN(Number(year)) || isNaN(Number(month)) || isNaN(Number(day))) {
    showToastError(`Date ${date} is not valid`)
    return false
  }
  if (year.length > 4 || year.length < 1) {
    showToastError(`Year ${year} is not valid!`)
    return false
  }
  if (Number(year) < 2023) {
    showToastError(`Year ${year} should be greater than 2023`)
    return false
  }
  if (month.length > 2 || month.length < 1) {
    showToastError(`Month ${month} is not valid!`)
    return false
  }
  if (Number(year) === 2023 && Number(month) < 10) {
    showToastError(`Month ${month} should be greater than 10 if year is ${year}`)
    return false
  }
  if (day.length > 2 || day.length < 1) {
    showToastError(`Day ${day} is not valid!`)
    return false
  }
  
  return true
}

const areDatesValid = (dates: { dateSince: string; dateUntil: string }): boolean => {
  // for each date
  for (const date of Object.values(dates)) {
    if (!validateDate(date)) {
      return false;
    }
  }

  const datesOffset = new Date(dates?.dateUntil).getTime() - new Date(dates?.dateSince).getTime()
  
  if (datesOffset < 0) {
    showToastError('Date until should be greater or equal to date since')
    return false
  }

  return true
}
