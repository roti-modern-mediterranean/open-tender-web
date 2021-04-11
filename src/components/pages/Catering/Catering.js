import React, { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectOrder,
  setServiceType,
  setRequestedAt,
  resetOrder,
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
} from '@open-tender/js'
import {
  BgImage,
  Box,
  ButtonLink,
  ButtonStyled,
  Message,
} from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import iconMap from '../../iconMap'
import {
  Content,
  Header,
  Loading,
  Main,
  PageTitle,
  PageContainer,
  PageContent,
  HeaderDefault,
} from '../..'
import { Account, StartOver } from '../../buttons'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import TimePicker from '../../TimePicker'

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

const CateringDatepicker = styled('div')`
  position: relative;
  width: 100%;
  height: 35rem;
  padding: 1rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.colors.light};
`

const CateringPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { title: siteTitle } = useSelector(selectBrand)
  const { catering: config } = useSelector(selectConfig)
  const { title, subtitle, policy, background } = config
  const { orderType, serviceType, requestedAt, revenueCenter } = useSelector(
    selectOrder
  )
  const hasTypes = orderType && serviceType
  const { timezone } = revenueCenter || {}
  const tz = timezone ? timezoneMap[timezone] : getUserTimezone()
  const [date, setDate] = useState(null)
  const [minTime, setMinTime] = useState(new Date())
  const [settings, setSettings] = useState(null)
  const { entity: validTimes, loading, error } = useSelector(selectValidTimes)
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
    const requestedAtDate =
      !requestedAt || requestedAt === 'asap' ? null : isoToDate(requestedAt, tz)
    if (validTimes) {
      const {
        first_time,
        holidays,
        hours,
        interval,
        closed_weekdays,
      } = validTimes
      if (!first_time) {
        // setDate(requestedAtDate)
      } else {
        const firstDate = isoToDate(first_time.utc, tz)
        const newDate =
          !requestedAtDate || firstDate > requestedAtDate
            ? firstDate
            : requestedAtDate
        // setDate(newDate)
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
    } else {
      // setDate(requestedAtDate)
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

  const chooseServiceType = (serviceType) => {
    dispatch(setServiceType(serviceType))
    const reqestedAtIso = date ? dateToIso(date, tz) : 'asap'
    dispatch(setRequestedAt(reqestedAtIso))
    history.push('/locations')
  }

  const startOver = () => {
    dispatch(resetOrder())
    history.push(`/locations`)
  }

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
                  <CateringDatepicker>
                    <DatePicker
                      showPopperArrow={false}
                      // showTimeSelect
                      // timeCaption="Time"
                      // timeFormat="h:mm aa"
                      // timeIntervals={settings.interval || 15}
                      // minTime={minTime || settings.minTime}
                      // maxTime={settings.maxTime}
                      // excludeTimes={excludeTimes}
                      dateFormat="yyyy-MM-dd h:mm aa"
                      minDate={settings.minDate}
                      excludeDates={settings.excludeDates}
                      filterDate={settings.isClosed}
                      selected={date}
                      onChange={(date) => setDate(date)}
                      inline
                      shouldCloseOnSelect={false}
                    />
                    <TimePicker
                      date={date}
                      setDate={setDate}
                      interval={settings.interval || 15}
                      minTime={minTime || settings.minTime}
                      maxTime={settings.maxTime}
                      // excludeTimes={excludeTimes}
                    />
                  </CateringDatepicker>
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
