export const calcTimeOffset = (date) => {
  const currentDate = new Date()
  const millisecondsOffset = currentDate.getTime() - date.getTime()
  const offsetInSeconds = millisecondsOffset / 1000
  if (offsetInSeconds < 60) return `commited ${Math.floor(offsetInSeconds)} second${offsetInSeconds > 1 ? 's': ''} ago`
  const offsetInMinutes = offsetInSeconds / 60
  if (offsetInMinutes < 60) return `commited ${Math.floor(offsetInMinutes)} minute${offsetInMinutes > 1 ? 's': ''} ago`
  const offsetInHours = offsetInMinutes / 60
  if (offsetInHours < 24) return `commited ${Math.floor(offsetInHours)} hour${offsetInHours > 1 ? 's': ''} ago`
  const offsetInDays = offsetInHours / 24
  if (offsetInDays < 365) return `commited ${Math.floor(offsetInDays)} day${offsetInDays > 1 ? 's': ''} ago`
  const offsetInYears = offsetInDays / 365
  return `commited ${Math.floor(offsetInYears)} year${offsetInYears > 1 ? 's': ''} ago`
}
