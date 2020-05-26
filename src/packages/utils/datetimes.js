// import { parseISO, add, sub, differenceInDays } from 'date-fns'
// import { format, toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { format, toDate } from 'date-fns-tz'

/* CONSTANTS */

const DATE = 'yyyy-MM-dd'
const HUMAN_DATE = 'MMM d, yyyy'
// const DATETIME = 'yyyy-MM-dd h:mm a'

export const timezoneMap = {
  'US/Eastern': 'America/New_York',
  'US/Central': 'America/Chicago',
  'US/Mountain': 'America/Denver',
  'US/Pacific': 'America/Los_Angeles',
}

export const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const weekdaysUpper = weekdays.map((weekday) => weekday.toUpperCase())
export const weekdaysLower = weekdays.map((weekday) => weekday.toLowerCase())

export const weekdayOptions = weekdays.map((weekday) => ({
  value: weekday.toUpperCase(),
  name: weekday,
}))

/* HELPERS */

// export const getUserTimezone = () => {
//   try {
//     return Intl.DateTimeFormat().resolvedOptions().timeZone
//   } catch (err) {
//     return 'America/New_York'
//   }
// }

export const todayDate = () => format(new Date(), DATE)

export const formatDateString = (str, fmt = HUMAN_DATE) => {
  return format(toDate(str), fmt)
}

export const formatTimeString = (str) => {
  const clean = str.replace(/\s/g, '').toLowerCase()
  const parts = clean.split('-')
  if (parts.length === 1) return clean
  const [part1, part2] = parts
  const end1 = part1.substr(part1.length - 2)
  const end2 = part2.substr(part1.length - 2)
  const newPart1 =
    ['am', 'pm'].includes(end1) && end1 === end2
      ? part1.slice(0, part1.length - 2)
      : part1
  return [newPart1, part2].join('-')
}
