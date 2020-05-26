import { parseISO, add } from 'date-fns'
import { format, toDate, zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

/* CONSTANTS */

const DATE = 'yyyy-MM-dd'
const HUMAN_DATE = 'MMM d, yyyy'
const DATETIME = 'yyyy-MM-dd h:mma'
const TIME = 'h:mma'

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

// https://stackoverflow.com/questions/54555491/how-to-guess-users-timezone-using-date-fns-in-a-vuejs-app
export const getUserTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch (err) {
    return 'America/New_York'
  }
}

export const makeLocalDate = (dateStr) => {
  const tz = getUserTimezone()
  return toDate(dateStr, { timezone: tz })
}

// returns a date string in a user's local time
export const makeLocalDateStr = (date, days = 0, fmt = DATE) => {
  return format(add(date || new Date(), { days: days }), fmt)
}

export const todayDate = () => makeLocalDateStr(0)
export const tomorrowDate = () => makeLocalDateStr(1)

export const dateToIso = (date, tz) => {
  return zonedTimeToUtc(date, tz).toISOString()
}

export const isoToDate = (iso, tz) => {
  return utcToZonedTime(parseISO(iso), tz)
}

export const isoToDateStr = (iso, tz, fmt = DATETIME) => {
  return format(isoToDate(iso, tz), fmt)
}

export const formatDateStr = (str, fmt = HUMAN_DATE) => {
  return format(toDate(str), fmt)
}

export const formatTimeStr = (str) => {
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

export const makeRequestedAtString = (requestedAt, tz) => {
  if (requestedAt.toLowerCase() === 'asap') return 'ASAP'
  const date = utcToZonedTime(parseISO(requestedAt), tz)
  const timeString = format(date, TIME).toLowerCase()
  const dateString = makeLocalDateStr(date)
  if (dateString === todayDate()) {
    return timeString
  } else if (dateString === tomorrowDate()) {
    return `Tmrw @ ${timeString}`
  } else {
    return `${format(date, 'M/d')} @ ${timeString}`
  }
}

function* range(start, end, step) {
  for (let i = start; i <= end; i += step) {
    yield i
  }
}

export const makeOppositeTimes = (times, interval, min = 0, max = 1440) => {
  return [...range(min, max - interval, interval)].filter(
    (i) => !times.includes(i)
  )
}

export const makeWeekdaysExcluded = (validTimes) => {
  return Object.entries(validTimes).reduce((obj, entry) => {
    const [weekday, dayparts] = entry
    const orderableDayparts = dayparts.filter((d) => d.is_orderable)
    if (!orderableDayparts.length) {
      obj[weekday.toUpperCase()] = null
      return obj
    }
    const interval = orderableDayparts[0].interval
    const orderableTimes = orderableDayparts.reduce((all, daypart) => {
      return all.concat(
        daypart.times.filter((i) => i.is_orderable).map((i) => i.minutes)
      )
    }, [])
    obj[weekday.toUpperCase()] = makeOppositeTimes(orderableTimes, interval)
    return obj
  }, {})
}

export const makeClosedWeekdays = (weekdayTimes) => {
  return Object.entries(weekdayTimes)
    .filter(([, times]) => !times)
    .map(([weekday]) => weekdaysUpper.indexOf(weekday))
}

export const minutesToDates = (minutes) => {
  return minutes.map((minute) => {
    const hours = Math.floor(minute / 60)
    const mins = minute % 60
    const d = new Date()
    d.setHours(hours)
    d.setMinutes(mins)
    return d
  })
}

export const getMinutesfromDate = (date) => {
  return date.getHours() * 60 + date.getMinutes()
}

export const makeDatepickerArgs = (
  requestedAtDate,
  weekdayTimes,
  excludedTimes,
  firstMinute,
  interval = 15,
  daysAhead
) => {
  const maxDate =
    daysAhead != null ? add(new Date(), { days: daysAhead }) : null
  const currentDate = requestedAtDate || new Date()
  const weekday = format(currentDate, 'EEEE').toUpperCase()
  const dateStr = format(currentDate, 'yyyy-MM-dd')
  const minutes = requestedAtDate ? getMinutesfromDate(requestedAtDate) : null
  const isToday = dateStr === todayDate()
  /* if today, excluded all times before the first minute */
  const todayExcludeded = isToday
    ? [...range(0, firstMinute - interval, interval)]
    : []
  /* weekdayExcluded = times excluded based on regular hours + blocked hours */
  const weekdayExcluded = weekdayTimes[weekday] || []
  /* otherExcluded = times excluded due to holiday hours + throttled times */
  const otherExcluded = excludedTimes[dateStr] || []
  const allExcluded = [
    ...new Set([...todayExcludeded, ...weekdayExcluded, ...otherExcluded]),
  ].sort()
  let updatedDate = null
  if (minutes && allExcluded.includes(minutes)) {
    const orderableTimes = makeOppositeTimes(allExcluded, interval)
    const minOrderableTime = Math.min(...orderableTimes)
    updatedDate = new Date(requestedAtDate.getTime())
    updatedDate.setHours(Math.floor(minOrderableTime / 60))
    updatedDate.setMinutes(minOrderableTime % 60)
  }
  /* TODO: figure out how to use this to hide times before open & after close */
  // const minOrderableTime = Math.min(...orderableTimes)
  // const maxOrderableTime = Math.max(...orderableTimes)
  // const adjustedExcluded = makeOppositeTimes(
  //   orderableTimes,
  //   interval,
  //   minOrderableTime,
  //   maxOrderableTime
  // )
  // const injectTimes = minutesToDates(orderableTimes)
  // const excludeTimes = minutesToDates(adjustedExcluded)
  /* convert excluded minutes to excluded dates */
  const excludeTimes = minutesToDates(allExcluded)
  /* filter out days of the week that are always closed */
  const closedWeekdays = makeClosedWeekdays(weekdayTimes)
  const isClosed = (date) => {
    return !closedWeekdays.includes(date.getDay())
  }
  return { excludeTimes, isClosed, updatedDate, maxDate }
}
