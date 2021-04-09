import React, { useCallback, useContext, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  fetchOrderFulfillment,
  selectOrderFulfillment,
  updateOrderFulfillment,
  resetOrderFulfillment,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectFulfillment } from '../../../slices'
import { AppContext } from '../../../App'
import {
  CheckoutHeader,
  Content,
  Header,
  Loading,
  Logo,
  Main,
  PageContainer,
  ScreenreaderTitle,
} from '../..'
import { ErrMsg, FormWrapper } from '../../inputs'
import { OrderFulfillmentForm } from '../../forms'
import { NavMenu } from '../../buttons'
import styled from '@emotion/styled'
import { CurbsidePickupArrival } from '../../icons'

const FulfillmentHeader = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 100%;
    margin: 1.5rem 0 1rem;
    text-align: center;

    p {
      line-height: ${(props) => props.theme.lineHeight};
      font-weight: 600;
    }
  }
`

const FulfillmentEmpty = styled('div')`
  width: 100%;
  margin: 5rem 0 0;
  text-align: center;
`

const Fulfillment = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { windowRef } = useContext(AppContext)
  const { id: orderId } = useParams()
  const { title: siteTitle } = useSelector(selectBrand)
  const fulfillmentSettings = useSelector(selectFulfillment)
  const fulfillment = useSelector(selectOrderFulfillment)
  const { orderFulfillment, loading, error } = fulfillment
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const update = useCallback(
    (orderId, data) => dispatch(updateOrderFulfillment(orderId, data)),
    [dispatch]
  )

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    return () => dispatch(resetOrderFulfillment())
  }, [windowRef, dispatch])

  useEffect(() => {
    if (!fulfillmentSettings) return history.push('/')
  }, [fulfillmentSettings, history])

  useEffect(() => {
    dispatch(fetchOrderFulfillment(orderId))
  }, [dispatch, orderId])

  // if (!orderFulfillment) return null

  return (
    <>
      <Helmet>
        <title>Curbside Pickup | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header
          left={<NavMenu />}
          title={
            <Link to="/">
              <Logo />
            </Link>
          }
          bgColor={isBrowser ? 'dark' : 'primary'}
          borderColor={isBrowser ? 'dark' : 'primary'}
        />
        <Main>
          <ScreenreaderTitle>Order Fulfillment</ScreenreaderTitle>
          <PageContainer>
            <CheckoutHeader title="Curbside Info" />
            <FormWrapper>
              <FulfillmentHeader>
                <CurbsidePickupArrival />
                <div>
                  <p>Ready to pickup?</p>
                  <p>Let us know some info about your car</p>
                </div>
              </FulfillmentHeader>
              {isLoading && !orderFulfillment ? (
                <Loading text="Retrieving..." />
              ) : errMsg ? (
                <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
              ) : orderFulfillment ? (
                <OrderFulfillmentForm
                  orderId={orderId}
                  fulfillment={orderFulfillment}
                  loading={loading}
                  error={error}
                  update={update}
                  settings={fulfillmentSettings}
                  showAllFields={true}
                />
              ) : (
                <FulfillmentEmpty>
                  <p>Curbside pickup is not available for this order</p>
                </FulfillmentEmpty>
              )}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Fulfillment.displayName = 'Fulfillment'
export default Fulfillment
