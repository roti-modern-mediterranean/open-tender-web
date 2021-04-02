import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { selectMenuSlug, selectOrder } from '@open-tender/redux'
import { makeServiceTypeName } from '@open-tender/js'
import { Preface } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectOutpostName } from '../../../slices'
import { AppContext } from '../../../App'
import { Content, Header, Main, PageContainer } from '../..'
import { Back, Cart } from '../../buttons'
import styled from '@emotion/styled'
import {} from '../../forms'

const CheckoutTitle = styled(Preface)`
  display: block;
  width: 100%;
  margin: 0 0 3rem;
  text-align: center;
  font-weight: 500;
  font-size: 2.8rem;
  line-height: 1;
  letter-spacing: 0.01em;
`

const CheckoutDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle } = useSelector(selectBrand)
  const menuSlug = useSelector(selectMenuSlug)
  const { orderType, serviceType, isOutpost } = useSelector(selectOrder)
  const outpostName = useSelector(selectOutpostName)
  const isCatering = orderType === 'CATERING'
  const serviceTypeName = makeServiceTypeName(
    serviceType,
    isCatering,
    isOutpost,
    outpostName
  )

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef, dispatch])

  // useEffect(() => {
  //   if (error) windowRef.current.scrollTop = 0
  // }, [error, windowRef])

  return (
    <>
      <Helmet>
        <title>Checkout Details | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header
          left={<Back onClick={() => history.push(menuSlug)} />}
          right={<Cart />}
        />
        <Main>
          <PageContainer style={{ marginTop: '0' }}>
            <CheckoutTitle as="h1">{serviceTypeName} Details</CheckoutTitle>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CheckoutDetails.displayName = 'CheckoutDetails'
export default CheckoutDetails
