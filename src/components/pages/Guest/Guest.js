import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'

import { maybeRefreshVersion } from '../../../app/version'
import { selectConfig, closeModal, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import { Account } from '../../buttons'
import { Content, HeaderLogo, HeaderMobile, Hero, Main, Slider } from '../..'
import { makeSlides } from '../../HeroSlides'
import GuestActions from './GuestActions'
import GuestHeader from './GuestHeader'

const GuestView = styled('div')`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`

const GuestContent = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 32rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-height: 100%;
  }

  & > div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    & > div {
      flex-grow: 1;
    }
  }
`

const Guest = () => {
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const { home: homeConfig } = useSelector(selectConfig)
  const { background, mobile } = homeConfig
  const { windowRef } = useContext(AppContext)
  const slides = makeSlides([])

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
      <Content>
        <HeaderMobile
          bgColor="primary"
          borderColor="primary"
          left={<HeaderLogo />}
          right={<Account />}
        />
        <Main>
          <GuestView>
            <GuestContent>
              {slides ? (
                <Slider slides={slides} />
              ) : (
                <Hero imageUrl={isBrowser ? background : mobile}>&nbsp;</Hero>
              )}
            </GuestContent>
            <GuestHeader
              title="Hi there!"
              subtitle="Let's get things started."
              footnote="Hint: you don't need an account to place an order."
            >
              <GuestActions />
            </GuestHeader>
          </GuestView>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
