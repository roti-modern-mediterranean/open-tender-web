import React, { useMemo, useCallback, useContext, useEffect, useState } from 'react'
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
import { ArrowRight } from '../../icons'
import HighlightedMenu, {MenuContent} from '../../HighlightedMenu'
import OptionsMenu, { BackForwardButtons } from '../../OptionsMenu'
import RangeSlider from '../../RangeSlider'
import GroupOf3People from '../../icons/GroupOf3People'
import Person from '../../icons/Person'
import GroupOf6People from '../../icons/GroupOf6People'
import Recommendation from './Recommendation'
import AllergenOptions from './AllergenOptions'
import {
  eventTypeOptions, numberOfPeopleOptions,
  selectEventType,
  selectNumberOfPeople, selectNumberOfPeopleIndex,
  setEventType, setNumberOfPeople, setNumberOfPeopleIndex
} from '../../../slices/recommendationSlice'

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
  min-height: 44rem;
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
    background-color: ${(props) => props.theme.bgColors.primary};
  }
`

const CateringContent = styled('div')`
  label: CateringContent;
  
  display: grid;
  grid-template-areas: ${(props) => props.hasNoShortcut 
          ? `"cateringMessage options"`
          : `"cateringMessage options" 
             "shortcut        options"`};
  
  grid-template-columns: minmax(10%, auto) minmax(36%, 36rem);
  column-gap: 4.2rem;
  row-gap: 3rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 auto;
    padding: calc(4rem + ${(props) => props.theme.border.radiusLarge}) ${(props) => props.theme.layout.paddingMobile} 0;
    text-align: center;
    max-width: 44rem;
    margin: 0 auto;

    grid-template-areas: "cateringMessage"
                        "options"
                        ${(props) => !props.hasNoShortcut && `"shortcut"`};
    grid-template-columns: auto;
  }
`

const CateringMessage = styled('div')`
  label: CateringMessage;
  
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  
  grid-area: cateringMessage;

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

const AnimatedHighlightedMenu = styled(HighlightedMenu)`
  label: AnimatedHighlightedMenu;

  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  display: flex;
  flex-direction: column;
  
  grid-area: options;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: relative;
    flex: 1 1 auto;
    max-width: none;
  }
`;

const SliderRangeMessage = styled.div`
  label: SliderRangeMessage;
  
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.pepper};
  font-family: ${(props) => props.theme.fonts.headings.family};
  font-size: 24px;
  font-weight: ${(props) => props.theme.fonts.headings.weight};
  margin: 5px 0px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 20px;
  }
`

const SkipRecommendations = styled.button`
  label: SkipRecommendations;

  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;

  text-align: left;
  color: ${(props) => props.theme.colors.light};
  border-top: 1px solid #ffffff50;
  padding-top: 1rem;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.25s ease;
  
  grid-area: shortcut;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: auto;
    border: none;
    margin-top: 0;
  }
  
  h2 {
    opacity: 0;
    animation: slide-up 0.25s ease-in-out 0.25s forwards;
    
    font-size: 30px;
    font-weight: 500;
    
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: 6rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-family: ${(props) => props.theme.fonts.preface.family};
      font-weight: 500;
      font-size: 2.8rem;
      letter-spacing: 0.01em;
      margin: 0 0 1rem;
    }
  }
  
  p {
    opacity: 0;
    animation: slide-up 0.25s ease-in-out 0.25s forwards;
    
    font-size: 18px;
    line-height: 28px;
    
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: 2.3rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1.5rem;
      line-height: 1.45;
      font-weight: 500;
    }
  }
  
  span {
    color: ${(props) => props.theme.colors.paprika};
  }
`

const SkipIcon = styled.span`
  display: inline-flex;
  width: 12px;
  margin-left: 10px;
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
  recommendations: "recommendations",
  inbetween: "inbetween"
}

const numberOfPeopleMessage = (index) =>{
  if(index < 1){
    return "How many are we?";
  }
  if(index < 4){
    return "Zzz!";
  }
  return "Wow, it's gonna be a party!"
}

const NumberOfPeopleImage = ({index, size, color}) => {
  if(index < 1){
    return <Person size={size} color={color}/>;
  }
  if(index < 4){
    return <GroupOf3People size={size} color={color}/>;
  }
  return <GroupOf6People size={size} color={color}/>
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
  const selectedEventTypes = useSelector(selectEventType)
  const setSelectedEventTypes = useCallback((eventType) => dispatch(setEventType(eventType)), [dispatch])
  const _numberOfPeopleIndex = useSelector(selectNumberOfPeopleIndex)
  const _setNumberOfPeopleIndex = useCallback((numberOfPeopleIndex) => dispatch(setNumberOfPeopleIndex(numberOfPeopleIndex)), [dispatch])

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
      setFetching(true)
    }
    // history.push('/locations')
  }

  const skipRecommendationsOnCLick = useCallback(()=>{
    if(revenueCenter){
      history.push(`/menu/${revenueCenter.slug}`)
    }
  }, [history, revenueCenter])

  const highlightedMenuOnBackClick = useMemo(() => {
    switch(stage){
      case stages.eventType:
        return () => setStage(stages.address)
      case stages.numberOfPeople:
        return () => setStage(stages.eventType)
      case stages.dietaryRestrictions:
        return () => setStage(stages.numberOfPeople)
      default:
        return null
    }
  }, [stage])

  const highlightedMenuOnForwardClick = useMemo(() => {
    switch(stage){
      case stages.eventType:
        if(selectedEventTypes.length === 0) {
          return null;
        }
        return () => setStage(stages.numberOfPeople)
      case stages.numberOfPeople:
        if(_numberOfPeopleIndex < 1){
          return null;
        }
        return () => setStage(stages.dietaryRestrictions)
      case stages.dietaryRestrictions:
        return () => setStage(stages.recommendations)
      default:
        return null
    }
  }, [stage, selectedEventTypes, _numberOfPeopleIndex])

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
                || stage === stages.dietaryRestrictions) && (
                  <CateringContent>
                    <CateringMessage>
                      <h2>Build the main event</h2>
                      <p>
                        Choose how many people you're serving, when, and where and build your own menu.
                      </p>
                    </CateringMessage>
                    <SkipRecommendations onClick={skipRecommendationsOnCLick}>
                      {
                        revenueCenter
                          ? (
                            <>
                              <h2>Take a shortcut</h2>
                              <p>
                                Skip straight to the menu to browse all our packages and start your order
                                <SkipIcon><ArrowRight /></SkipIcon>
                              </p>
                            </>)
                          : <Loading text="Loading store..." color={theme.colors.tahini} />
                      }
                    </SkipRecommendations>
                    <AnimatedHighlightedMenu>
                      {stage === stages.eventType &&
                      <MenuContent title="Type of event" subtitle="What kind of get together are we having?">
                        <OptionsMenu
                          options={eventTypeOptions}
                          selectedOptions={selectedEventTypes}
                          setSelectedOptions={setSelectedEventTypes}
                        />
                      </MenuContent>
                      }
                      {stage === stages.numberOfPeople &&
                      <MenuContent title="Number of people" subtitle="How big is your group?">
                        <RangeSlider options={numberOfPeopleOptions} index={_numberOfPeopleIndex} setIndex={_setNumberOfPeopleIndex}>
                          <NumberOfPeopleImage index={_numberOfPeopleIndex} size="60px"/>
                        </RangeSlider>
                        <SliderRangeMessage>{numberOfPeopleMessage(_numberOfPeopleIndex)}</SliderRangeMessage>
                      </MenuContent>
                      }
                      {stage === stages.dietaryRestrictions &&
                      <MenuContent title="Dietary restrictions" subtitle="Any ingredients we should rule out?">
                        <AllergenOptions/>
                      </MenuContent>
                      }
                      <BackForwardButtons
                        onBackClick={highlightedMenuOnBackClick}
                        onForwardClick={highlightedMenuOnForwardClick}
                        forwardText="Confirm"
                      />
                    </AnimatedHighlightedMenu>
                  </CateringContent>
              )}
              {stage === stages.recommendations && (
                <Recommendation/>
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
