import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  selectOrder,
  setServiceType,
  setRequestedAt,
  setOrderServiceType,
  fetchValidTimes,
  selectValidTimes,
} from '@open-tender/redux'
import {
  isoToDate,
  dateToIso,
  timezoneMap,
  getUserTimezone,
  time24ToDate,
  makeLocalDate,
  makeLocalDateStr,
  todayDate,
  makeWeekdayIndices,
  getMinutesfromDate,
} from '@open-tender/js'
import { BgImage } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import { Content, Loading, Main, HeaderDefault, RequestedAtPicker } from '../..'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const CateringView = styled(BgImage)`
  width: 100%;
  flex-grow: 1;
  min-height: 50rem;
  // background-color: ${(props) => props.theme.bgColors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
`

const CateringContent = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 108rem;
  max-width: 100%;
  padding: 4rem 4.5rem;
  border-radius: 2.2rem;
  // background-color: ${(props) => props.theme.colors.primary};
  background-color: rgba(37, 39, 42, 0.6);

  h2 {
    margin: 0 0 1rem;
    font-size: 9rem;
    line-height: 0.9;
    color: ${(props) => props.theme.colors.light};
  }

  p {
    font-size: 2.7rem;
    line-height: 1.33333;
    color: ${(props) => props.theme.colors.light};
  }
`

const CateringMessage = styled('div')`
  flex: 1 1 auto;
  padding: 0 3rem 0 0;
`

const CateringCalendar = styled('div')`
  flex: 0 0 36rem;
  min-height: 35rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

// const CateringDatepicker = styled('div')`
//   position: relative;
//   width: 100%;
//   height: 35rem;
//   padding: 1rem;
//   font-size: ${(props) => props.theme.fonts.sizes.small};
//   border-radius: ${(props) => props.theme.border.radius};
//   background-color: ${(props) => props.theme.colors.light};
// `

const CateringPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { title: siteTitle } = useSelector(selectBrand)
  const { catering: config } = useSelector(selectConfig)
  const { title, subtitle, background } = config
  const { orderType, serviceType, requestedAt, revenueCenter } = useSelector(
    selectOrder
  )
  const hasTypes = orderType && serviceType
  const { timezone } = revenueCenter || {}
  const tz = timezone ? timezoneMap[timezone] : getUserTimezone()
  const [date, setDate] = useState(null)
  const [minTime, setMinTime] = useState(new Date())
  const [settings, setSettings] = useState(null)
  const { entity: validTimes, loading } = useSelector(selectValidTimes)
  const isLoading = loading === 'pending'
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!hasTypes) {
      dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    }
    dispatch(fetchValidTimes('CATERING'))
  }, [hasTypes, dispatch])

  useEffect(() => {
    if (validTimes) {
      const {
        first_time,
        holidays,
        hours,
        interval,
        closed_weekdays,
      } = validTimes
      const firstDate = isoToDate(first_time.utc, tz)
      const closedWeekdays = makeWeekdayIndices(closed_weekdays)
      const isClosed = (date) => {
        return !closedWeekdays.includes(date.getDay())
      }
      const newSettings = {
        minDate: firstDate,
        minTime: time24ToDate(hours.open),
        maxTime: time24ToDate(hours.close),
        excludeDates: holidays.map((i) => makeLocalDate(i)),
        interval: interval,
        isClosed: isClosed,
      }
      setSettings(newSettings)
    }
  }, [validTimes, requestedAt, tz])

  useEffect(() => {
    if (settings && date) {
      const dateStr = makeLocalDateStr(date)
      if (dateStr === todayDate()) {
        const newMinTime =
          settings.minDate > settings.minTime
            ? settings.minDate
            : settings.minTime
        setMinTime(newMinTime)
      } else {
        setMinTime(settings.minTime)
      }
    }
  }, [date, settings])

  const selectTime = (time) => {
    setDate(null)
    setTimeout(() => {
      dispatch(setServiceType('DELIVERY'))
      const reqestedAtIso = time ? dateToIso(time, tz) : 'asap'
      dispatch(setRequestedAt(reqestedAtIso))
      history.push('/locations')
    }, 300)
  }

  const startMin = getMinutesfromDate(minTime || settings.minTime)
  const endMin = settings ? getMinutesfromDate(settings.maxTime) : null

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main
          imageUrl={background}
          style={{ backgroundPosition: 'center top' }}
        >
          <CateringView>
            <CateringContent>
              <CateringMessage>
                <h2>{title}</h2>
                <p>{subtitle}</p>
              </CateringMessage>
              <CateringCalendar>
                {isLoading || !settings ? (
                  <Loading type="Clip" color={theme.colors.light} size={50} />
                ) : (
                  <RequestedAtPicker
                    tz={tz}
                    date={date}
                    setDate={(date) => setDate(date)}
                    minDate={settings.minDate}
                    maxDate={null}
                    excludeDates={settings.excludeDates}
                    filterDate={settings.isClosed}
                    minTime={startMin}
                    maxTime={endMin}
                    interval={settings.interval || 15}
                    excludeTimes={[]}
                    selectTime={selectTime}
                  />
                )}
              </CateringCalendar>
            </CateringContent>
          </CateringView>
        </Main>
      </Content>
    </>
  )
}

CateringPage.displayName = 'CateringPage'
export default CateringPage
