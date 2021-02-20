import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'

import { maybeRefreshVersion } from '../../../app/version'
import { selectConfig, closeModal, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import { Account } from '../../buttons'
import {
  Content,
  HeaderLogo,
  HeaderMobile,
  Main,
  OrderTypes,
  Welcome,
  WelcomeHeader,
} from '../..'

const GuestHeader = styled('div')`
  padding: 2.5rem;
`

const Guest = () => {
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const { home: homeConfig } = useSelector(selectConfig)
  const { background, mobile, title, subtitle } = homeConfig
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  return (
    <>
      <Helmet>
        <title>{brand.title}</title>
      </Helmet>
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor={isBrowser ? 'primary' : 'transparent'}
          borderColor={isBrowser ? 'primary' : 'transparent'}
          maxWidth="76.8rem"
          left={<HeaderLogo />}
          right={<Account color="light" />}
        />
        <Main padding="0" imageUrl={mobile || background}>
          <Welcome footer={<OrderTypes />}>
            <GuestHeader>
              <WelcomeHeader title={title} subtitle={subtitle} />
            </GuestHeader>
          </Welcome>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
