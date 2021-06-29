import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { makeDisplayedRevenueCenters } from '@open-tender/js'
import {
  selectOrder,
  setRequestedAt,
  setOrderServiceType,
  setAddress,
  resetRevenueCenters,
  resetRevenueCenter,
  fetchValidTimes,
  selectValidTimes,
  selectMenuSlug,
  fetchRevenueCenters,
  setRevenueCenter,
  selectRevenueCenters
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
import {
  selectBrand,
  selectConfig,
  selectSettings,
  selectGeoLatLng
} from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  Loading,
  Main,
  HeaderDefault,
  RequestedAtPicker,
  InlineLink
} from '../..'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { isBrowser } from 'react-device-detect'
import CateringAutocomplete from './CateringAutocomplete'
import { CateringContent, CateringMessage } from './common'
import RecommendationsWizard from './RecommendationsWizard'

const CateringView = styled(BgImage)`
  label: CateringView;
  
  width: 100%;
  flex-grow: 1;
  min-height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: relative;
    display: block;
    padding: ${(props) => props.theme.border.radius} 0 0;
    margin-top: -${(props) => props.theme.border.radiusLarge};
    background-image: linear-gradient(
            0deg,
            rgba(37, 39, 42, 1) 30%,
            rgba(37, 39, 42, 0.9) 60%,
            rgba(37, 39, 42, 0.1) 100%
    ), url(${(props) => props.imageUrl});
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${(props) => props.theme.bgColors.dark};
  }
`

const CateringContainer = styled('div')`
  label: CateringContainer;
  
  display: flex;
  justify-content: space-between;
  width: 112rem;
  max-width: 100%;
  min-height: 53rem;
  padding: 4rem 4.5rem;
  border-radius: 2.2rem;
  background-color: rgba(37, 39, 42, 0.6);
  margin: ${(props) => props.theme.layout.padding} 0;

  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: calc(${(props) => props.theme.layout.padding} + ${(props) => props.theme.border.radiusLarge}) 
      0 ${(props) => props.theme.layout.padding};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: relative;
    z-index: 1;
    flex-direction: column;
    padding: 0;
    border-radius: 0;
    background-color: transparent;
    margin-bottom: 0;
  }
`

const CateringCurrentOrder = styled('div')`
  label: CateringCurrentOrder;
  
  margin: 0;
  border-top: 0.1rem solid rgba(255, 255, 255, 0.3);
  padding: 2.5rem 0 0;
  
  grid-area: shortcut;
  
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
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.6;
    }

    button {
      font-weight: 400;
      color: ${(props) => props.theme.colors.light};
      padding-bottom: 0.2rem;
      border-bottom: 0.1rem solid ${(props) => props.theme.colors.light};
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        font-size: 1.3rem;
      }

      &:hover,
      &:active,
      &:focus {
        color: ${(props) => props.theme.colors.paprika};
        border-color: ${(props) => props.theme.colors.paprika};
      }
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
    font-weight: 500;
  }
`

const CateringCalendar = styled('div')`
  label: CateringCalendar;
  
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.5s forwards;
  flex: 0 0 36rem;
  min-height: 35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  grid-area: options;
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: relative;
    flex: 1 1 auto;
    max-width: 100%;
  }
`

const CateringPlace = styled(CateringCalendar)`
  label: CateringPlace;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 3rem;
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
  const tz = timezoneMap[timezone]
  const requestedAtStr = makeReadableDateStrFromIso(requestedAt, tz, true)
  return `You currently have a catering order in process for ${requestedAtStr} from our ${name} location.`
}

const stages = {
  date: "date",
  address: "address",
  eventType: "eventType",
  numberOfPeople: "numberOfPeople",
  dietaryRestrictions: "dietaryRestrictions",
  recommendations: "recommendations"
}

const CateringPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { title: siteTitle } = useSelector(selectBrand)
  const { catering: config } = useSelector(selectConfig)
  const { title, subtitle, background } = config
  const { orderType, serviceType, requestedAt, revenueCenter, address } =
    useSelector(selectOrder)
  const { maxDistance } = useSelector(selectSettings)
  const geoLatLng = useSelector(selectGeoLatLng)
  const hasTypes = orderType && serviceType
  const { timezone } = revenueCenter || {}
  const tz = timezone ? timezoneMap[timezone] : getUserTimezone()
  const [date, setDate] = useState(null)
  const [minTime, setMinTime] = useState(new Date())
  const [settings, setSettings] = useState(null)
  const [stage, setStage] = useState(stages.date)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)
  const { entity: validTimes, loading } = useSelector(selectValidTimes)
  const isLoading = loading === 'pending'
  const { revenueCenters, loading: loadingRCs } =
    useSelector(selectRevenueCenters)
  const { windowRef } = useContext(AppContext)
  const orderMsg = makeOrderMessage(orderType, requestedAt, revenueCenter)
  const menuSlug = useSelector(selectMenuSlug)
  const requestedAtStr = requestedAt
    ? makeReadableDateStrFromIso(requestedAt, tz, true)
    : null

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
      const { first_time, holidays, hours, interval, closed_weekdays } =
        validTimes
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

  const selectRevenueCenter = useCallback(
    (revenueCenter) => {
      dispatch(setRevenueCenter(revenueCenter))
    },
    [dispatch]
  )

  useEffect(() => {
    if (fetching && loadingRCs === 'idle') {
      setFetching(false)
      const { error, displayed } = makeDisplayedRevenueCenters(
        revenueCenters,
        serviceType,
        address,
        geoLatLng,
        maxDistance
      )
      if (error) {
        setError(error)
      } else if (displayed.length) {
        selectRevenueCenter(displayed[0])
        setStage(stages.eventType)
      } else if (serviceType === 'PICKUP') {
        const msg = `We're sorry, but we don't have any locations within ${maxDistance} miles of your address.`
        setError(msg)
      } else {
        const msg = `We're sorry, but we don't deliver to your address. Please try switching to pickup.`
        setError(msg)
      }
    }
  }, [
    fetching,
    loadingRCs,
    revenueCenters,
    serviceType,
    address,
    geoLatLng,
    maxDistance,
    selectRevenueCenter,
  ])

  const selectTime = (time) => {
    setDate(null)
    dispatch(setAddress(null))
    setTimeout(() => {
      const reqestedAtIso = time ? dateToIso(time, tz) : 'asap'
      dispatch(setRequestedAt(reqestedAtIso))
      setStage(stages.address)
    }, 50)
  }

  const clearTime = () => {
    setDate(null)
    setTimeout(() => {
      dispatch(setRequestedAt(null))
      setStage(stages.date)
    }, 50)
  }

  const selectServiceType = (serviceType) => {
    setError(null)
    dispatch(resetRevenueCenters())
    dispatch(resetRevenueCenter())
    dispatch(setOrderServiceType('CATERING', serviceType))
    const { lat, lng } = address
    const params = { type: 'CATERING', lat, lng }
    if (lat && lng) {
      dispatch(fetchRevenueCenters(params))
      setFetching(true)
    }
    // history.push('/locations')
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
            backgroundColor: theme.bgColors.dark
          }}
        >
          <CateringView imageUrl={isBrowser ? null : background}>
            <CateringContainer>
              {stage === stages.date && (
                <CateringContent hasNoShortcut={!orderMsg}>
                  <CateringMessage>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                  </CateringMessage>
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
                  <CateringCalendar>
                    {isLoading || !settings ? (
                      <Loading
                        type="Clip"
                        color={theme.colors.light}
                        size={50}
                      />
                    ) : (
                      <RequestedAtPicker
                        date={date}
                        setDate={(date) => setDate(date)}
                        selectTime={selectTime}
                        minDate={settings.minDate}
                        maxDate={null}
                        excludeDates={settings.excludeDates}
                        filterDate={settings.isClosed}
                        interval={settings.interval || 15}
                        excludeTimes={[]}
                        minTime={startMin}
                        maxTime={endMin}
                      />
                    )}
                  </CateringCalendar>
                </CateringContent>
              )}
              {stage === stages.address && (
                <CateringContent hasNoShortcut={true}>
                  <CateringMessage>
                    <h2>Where are you located?</h2>
                    <p>
                      Please enter your address and choose an order type to
                      get started.
                    </p>
                  </CateringMessage>
                  <CateringPlace>
                    <CateringAutocomplete
                      requestedAtStr={requestedAtStr}
                      clearTime={clearTime}
                      selectServiceType={selectServiceType}
                      disabled={fetching}
                      error={error}
                    />
                  </CateringPlace>
                </CateringContent>
              )}
              {(stage === stages.eventType
                || stage === stages.numberOfPeople
                || stage === stages.dietaryRestrictions
                || stage === stages.recommendations) && (
                  <RecommendationsWizard stage={stage} setStage={setStage} />
              )}
            </CateringContainer>
          </CateringView>
        </Main>
      </Content>
    </>
  )
}

CateringPage.displayName = 'CateringPage'
export default CateringPage
