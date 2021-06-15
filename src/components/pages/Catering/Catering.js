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
  selectRevenueCenters,
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
  selectGeoLatLng,
} from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  Loading,
  Main,
  HeaderDefault,
  RequestedAtPicker,
  InlineLink, ModalContent, AllergenForm
} from '../..'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { isBrowser } from 'react-device-detect'
import CateringAutocomplete from './CateringAutocomplete'
import { ArrowRight } from '../../icons'
import HighlightedMenu from '../../HighlightedMenu'

const CateringView = styled(BgImage)`
  width: 100%;
  flex-grow: 1;
  min-height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: relatiive;
    display: block;
    padding: 0;
    min-height: 64rem;
    background-image: url(${(props) => props.imageUrl});
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${(props) => props.theme.bgColors.dark};
  }

  &::after {
    display: none;
    position: absolute;
    content: ' ';
    z-index: 0;
    top: 25rem;
    left: 0;
    right: 0;
    bottom: -10rem;
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

const CateringContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 108rem;
  max-width: 100%;
  min-height: 43rem;
  padding: 4rem 4.5rem;
  border-radius: 2.2rem;
  background-color: rgba(37, 39, 42, 0.6);
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: relative;
    z-index: 1;
    flex-direction: column;
    padding: 0;
    border-radius: 0;
    background-color: rgba(37, 39, 42, 0.2);
  }
`

const CateringContent = styled('div')`
  flex: 1 1 auto;
  padding: 0 3rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 auto;
    padding: 6rem ${(props) => props.theme.layout.paddingMobile} 0;
    text-align: center;
    max-width: 44rem;
    margin: 0 auto;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding-top: 3rem;
  }
`

const CateringMessage = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;

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
      font-weight: 500;
      font-size: 2.8rem;
      letter-spacing: 0.01em;
    }
  }

  & > p {
    margin: 0 0 1rem;
    font-size: 2.7rem;
    line-height: 1.33333;
    color: ${(props) => props.theme.colors.light};
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: 2.3rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1.5rem;
      line-height: 1.45;
      font-weight: 500;
    }
  }
`

const SkipSuggestions = styled.button`
  label: SkipSuggestions;

  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;

  text-align: left;
  color: ${(props) => props.theme.colors.light};
  margin-top: 2rem;
  border-top: 1px solid #ffffff50;
  padding-top: 1rem;
  width: 80%;
  cursor: pointer;
  transition: background-color 0.25s ease;
  
  h2 {
    font-size: 30px;
    font-weight: 500;
  }
  
  p {
    font-size: 18px;
    line-height: 28px;
  }
  
  span {
    color: ${(props) => props.theme.colors.paprika};
  }
  
  &:hover {
    background-color: #ffffff20;
  }
`

const SkipIcon = styled.div`
  display: inline-flex;
  width: 12px;
  margin-left: 10px;
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
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.5s forwards;
  flex: 0 0 36rem;
  min-height: 35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: relative;
    flex: 1 1 auto;
    width: 44rem;
    max-width: 100%;
    margin: 0 auto;
    padding: 3rem ${(props) => props.theme.layout.paddingMobile} 3rem;
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
  inbetween: "inbetween"
}

const eventTypeOptions = [
  { allergen_id: 0, name: "Family"}, { allergen_id: 1, name: "Corporate"},
  { allergen_id: 2, name: "Party"}, { allergen_id: 3, name: "Adult"},
  { allergen_id: 4, name: "Teens"}, { allergen_id: 5, name: "Kids"},
  { allergen_id: 6, name: "Indoors"}, { allergen_id: 7, name: "Outdoors"},
  { allergen_id: 8, name: "Formal"}]

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
  const [selectedEventTypes, setSelectedEventTypes] = useState([])

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

  const autoRouteCallack = useCallback(
    (revenueCenter) => {
      dispatch(setRevenueCenter(revenueCenter))
      return history.push(`/menu/${revenueCenter.slug}`)
    },
    [dispatch, history]
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
        autoRouteCallack(displayed[0])
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
    autoRouteCallack,
  ])

  const selectTime = (time) => {
    setDate(null)
    setStage(stages.inbetween)
    dispatch(setAddress(null))
    setTimeout(() => {
      const reqestedAtIso = time ? dateToIso(time, tz) : 'asap'
      dispatch(setRequestedAt(reqestedAtIso))
      setStage(stages.address)
    }, 50)
  }

  const clearTime = () => {
    setDate(null)
    setStage(stages.inbetween)
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
      setStage(stages.eventType)
    }
    // history.push('/locations')
  }

  const skipSuggestionsOnCLick = useCallback(()=>{
    setFetching(true)
  }, [setFetching])

  const startMin = getMinutesfromDate(minTime || settings.minTime)
  const endMin = settings ? getMinutesfromDate(settings.maxTime) : null

  // TODO refactor HighlightedMenu, ModalContent and Allergens

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
          <CateringView imageUrl={isBrowser ? null : background}>
            <CateringContainer>
              {stage === stages.date && (
                <>
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
                  </CateringContent>
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
                </>
              )}
              {stage === stages.address && (
                <>
                  <CateringContent>
                    <CateringMessage>
                      <h2>Where are you located?</h2>
                      <p>
                        Please enter your address and choose an order type to
                        get started.
                      </p>
                    </CateringMessage>
                  </CateringContent>
                  <CateringCalendar>
                    <CateringAutocomplete
                      requestedAtStr={requestedAtStr}
                      clearTime={clearTime}
                      selectServiceType={selectServiceType}
                      disabled={fetching}
                      error={error}
                    />
                  </CateringCalendar>
                </>
              )}
              {stage === stages.eventType && (
                <>
                  <CateringContent>
                    <CateringMessage>
                      <h2>Build the main event</h2>
                      <p>
                        Choose how many people you're serving, when, and where and build your own menu.
                      </p>
                    </CateringMessage>
                    <SkipSuggestions onClick={skipSuggestionsOnCLick}>
                      <h2>Take a shortcut</h2>
                      <p>
                        Skip straight to the <span>menu</span> to browse all our packages and start your order
                        <SkipIcon><ArrowRight/></SkipIcon>
                      </p>
                    </SkipSuggestions>
                  </CateringContent>
                  <HighlightedMenu>
                    <ModalContent title="Type of event" subtitle="What kind of get together are we having?" close={false}>
                      <AllergenForm
                        allergens={eventTypeOptions}
                        selectedAllergens={selectedEventTypes}
                        isLoading={false}
                        error={null}
                        setAllergens={setSelectedEventTypes}
                        updateAllergens={()=>{}}
                        callback={()=> {}}
                      />
                    </ModalContent>
                  </HighlightedMenu>
                </>
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
