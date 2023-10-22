import { showToastError } from "."

const validateDate = (date) => {
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

export const areDatesValid = (dates) => {
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
