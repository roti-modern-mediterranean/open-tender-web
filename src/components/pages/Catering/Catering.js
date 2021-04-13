import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  selectOrder,
  setRequestedAt,
  setOrderServiceType,
  fetchValidTimes,
  selectValidTimes,
  selectMenuSlug,
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
  makeReadableDateStrFromIso,
} from '@open-tender/js'
import { BgImage, Preface } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  Loading,
  Main,
  HeaderDefault,
  RequestedAtPicker,
  InlineLink,
} from '../..'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { isBrowser } from 'react-device-detect'

const CateringView = styled(BgImage)`
  width: 100%;
  flex-grow: 1;
  min-height: 50rem;
  // background-color: ${(props) => props.theme.bgColors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: block;
    padding: 0;
    min-height: 0;
  }
`

const CateringContent = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 108rem;
  max-width: 100%;
  padding: 4rem 4.5rem;
  border-radius: 2.2rem;
  background-color: rgba(37, 39, 42, 0.6);
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    background-color: ${(props) => props.theme.bgColors.primary};
    flex-direction: column;
    padding: 0;
    border-radius: 0;
  }
`

const CateringMessage = styled('div')`
  flex: 1 1 auto;
  padding: 0 3rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 auto;
    padding: 1rem ${(props) => props.theme.layout.paddingMobile} 2rem;
    text-align: center;
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 9rem;
    line-height: 0.9;
    color: ${(props) => props.theme.colors.light};
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: 6rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-family: ${(props) => props.theme.fonts.preface.family};
      color: ${(props) => props.theme.colors.primary};
      font-weight: 500;
      font-size: 2.8rem;
      letter-spacing: 0.01em;
    }
  }

  & > p {
    font-size: 2.7rem;
    line-height: 1.33333;
    color: ${(props) => props.theme.colors.light};
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: 2.3rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.colors.primary};
      font-size: 1.5rem;
      line-height: 1.45;
    }
  }
`

const CateringCalendar = styled('div')`
  flex: 0 0 36rem;
  min-height: 35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: relative;
    flex: 1 1 auto;
    padding: 12rem ${(props) => props.theme.layout.paddingMobile} 5rem;
    background-image: url(${(props) => props.imageUrl});
    background-position: center-top;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-color: ${(props) => props.theme.bgColors.dark};
  }

  &::after {
    display: none;
    position: absolute;
    content: ' ';
    z-index: 0;
    top: 10rem;
    left: 0;
    right: 0;
    bottom: 0;
    // height: 23rem;
    background: linear-gradient(
      0deg,
      rgba(37, 39, 42, 1) 30%,
      rgba(37, 39, 42, 0.9) 60%,
      rgba(37, 39, 42, 0) 100%
    );
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      display: block;
    }
  }
`

const CateringCurrentOrder = styled('div')`
  margin: 2.5rem 0 0;
  border-top: 0.1rem solid rgba(255, 255, 255, 0.3);
  padding: 2.5rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0 0;
    border: 0;
    padding: 0;
  }

  p {
    font-size: 1.8rem;
    line-height: 1.4;
    color: ${(props) => props.theme.colors.light};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.colors.primary};
      font-size: 1.3rem;
      line-height: 1.6;
    }

    button {
      color: ${(props) => props.theme.colors.paprika};
    }
  }
`

const CateringCurrentOrderTitle = styled(Preface)`
  color: ${(props) => props.theme.colors.light};
  font-weight: 500;
  font-size: 3rem;
  letter-spacing: 0.01em;
  margin: 0 0 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 2.2rem;
    color: ${(props) => props.theme.colors.primary};
  }
`

const makeOrderMessage = (orderType, requestedAt, revenueCenter) => {
  const hasCateringOrder =
    orderType === 'CATERING' &&
    requestedAt &&
    requestedAt !== 'asap' &&
    revenueCenter
  if (!hasCateringOrder) return null
  const { timezone, name } = revenueCenter
  const requestedAtStr = makeReadableDateStrFromIso(requestedAt, timezone, true)
  return `You currently have a catering order in process for ${requestedAtStr} from our ${name} location.`
}

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
  const orderMsg = makeOrderMessage(orderType, requestedAt, revenueCenter)
  const menuSlug = useSelector(selectMenuSlug)

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
      dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
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
          imageUrl={isBrowser ? background : null}
          style={{
            backgroundPosition: 'center top',
            backgroundColor: theme.bgColors.dark,
          }}
        >
          <CateringView>
            <CateringContent>
              <CateringMessage>
                <h2>{title}</h2>
                <p>{subtitle}</p>
                {orderMsg && (
                  <CateringCurrentOrder>
                    <CateringCurrentOrderTitle as="h3">
                      Continue Current Order
                    </CateringCurrentOrderTitle>
                    <p>
                      {orderMsg}{' '}
                      <InlineLink onClick={() => history.push(menuSlug)}>
                        Continue this order.
                      </InlineLink>
                    </p>
                  </CateringCurrentOrder>
                )}
              </CateringMessage>
              <CateringCalendar imageUrl={background}>
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
