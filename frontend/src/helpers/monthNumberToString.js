export const monthNumberToString = (monthNum) => {
  if (monthNum === 12) return 'Dec.'
  if (monthNum === 11) return 'Nov.'
  if (monthNum === 10) return 'Oct.'
  if (monthNum === 9) return 'Sept.'
  if (monthNum === 8) return 'Aug.'
  if (monthNum === 7) return 'July'
  if (monthNum === 6) return 'June'
  if (monthNum === 5) return 'May.'
  if (monthNum === 4) return 'Apr.'
  if (monthNum === 3) return 'Mar.'
  if (monthNum === 2) return 'Feb.'
  return 'Jan.'
}
