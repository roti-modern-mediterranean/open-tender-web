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
import { Box, ButtonLink, ButtonStyled, Message } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import iconMap from '../../iconMap'
import {
  Content,
  HeaderMobile,
  Loading,
  Main,
  PageTitle,
  PageContainer,
  PageContent,
} from '../..'
import { Account, StartOver } from '../../buttons'
import styled from '@emotion/styled'

const CateringDatepicker = styled(Box)`
  max-width: 48rem;
  margin: 0 auto;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const CateringButtons = styled('div')`
  margin: 3rem 0 1.5rem;
  button {
    margin: 0 1rem 1rem 0;
    &:last-child {
      margin: 0;
    }
  }
`

const CateringPolicy = styled('div')`
  margin: 3rem 0;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
  }

  h2 + p {
    margin: 0.5rem 0 2rem;
    // font-size: ${(props) => props.theme.fonts.sizes.main};
  }

  div {
    text-align: left;
  }

  div p {
    margin: 1em 0;
    // font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const CateringPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { catering: config } = useSelector(selectConfig)
  const { policy } = config
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
        setDate(requestedAtDate)
      } else {
        const firstDate = isoToDate(first_time.utc, tz)
        const newDate =
          !requestedAtDate || firstDate > requestedAtDate
            ? firstDate
            : requestedAtDate
        setDate(newDate)
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
      setDate(requestedAtDate)
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
    history.push(`/order-type`)
  }

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderMobile
          title={isBrowser ? null : 'Catering'}
          left={<StartOver />}
          right={<Account />}
        />
        <Main>
          <PageContainer>
            <PageTitle {...config} />
            <PageContent>
              {isLoading ? (
                <Loading text="Loading calendar..." />
              ) : error ? (
                <>
                  <Message color="error" style={{ width: '100%' }}>
                    {error}
                  </Message>
                  <p>
                    <ButtonStyled icon={iconMap.RefreshCw} onClick={startOver}>
                      Start Over
                    </ButtonStyled>
                  </p>
                </>
              ) : settings ? (
                <>
                  <CateringDatepicker>
                    <DatePicker
                      showPopperArrow={false}
                      showTimeSelect
                      timeCaption="Time"
                      timeFormat="h:mm aa"
                      dateFormat="yyyy-MM-dd h:mm aa"
                      timeIntervals={settings.interval || 15}
                      minDate={settings.minDate}
                      minTime={minTime || settings.minTime}
                      maxTime={settings.maxTime}
                      excludeDates={settings.excludeDates}
                      // excludeTimes={excludeTimes}
                      filterDate={settings.isClosed}
                      selected={date}
                      onChange={(date) => setDate(date)}
                      inline
                      shouldCloseOnSelect={false}
                    />
                  </CateringDatepicker>
                  <CateringButtons>
                    <ButtonStyled
                      icon={iconMap.Truck}
                      onClick={() => chooseServiceType('DELIVERY')}
                      disabled={!date}
                    >
                      Order Delivery
                    </ButtonStyled>
                    <ButtonStyled
                      icon={iconMap.ShoppingBag}
                      onClick={() => chooseServiceType('PICKUP')}
                      disabled={!date}
                    >
                      Order Pickup
                    </ButtonStyled>
                  </CateringButtons>
                  <div>
                    <ButtonLink onClick={startOver}>
                      Or switch to a regular Pickup or Delivery order
                    </ButtonLink>
                  </div>
                </>
              ) : (
                <Message color="error" style={{ width: '100%' }}>
                  This order type isn't currently available
                </Message>
              )}
              <CateringPolicy>
                {policy.title && <h2>{policy.title}</h2>}
                {policy.subtitle && <p>{policy.subtitle}</p>}
                {policy.content.length > 0 && (
                  <div>
                    {policy.content.map((i, index) => (
                      <p key={index}>{i}</p>
                    ))}
                  </div>
                )}
              </CateringPolicy>
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CateringPage.displayName = 'CateringPage'
export default CateringPage
