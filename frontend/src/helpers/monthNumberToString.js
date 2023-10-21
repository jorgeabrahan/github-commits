export const monthNumberToString = (monthNum) => {
  if (monthNum === 11) return 'Dec.'
  if (monthNum === 10) return 'Nov.'
  if (monthNum === 9) return 'Oct.'
  if (monthNum === 8) return 'Sept.'
  if (monthNum === 7) return 'Aug.'
  if (monthNum === 6) return 'July'
  if (monthNum === 5) return 'June'
  if (monthNum === 4) return 'May.'
  if (monthNum === 3) return 'Apr.'
  if (monthNum === 2) return 'Mar.'
  if (monthNum === 1) return 'Feb.'
  return 'Jan.'
}
