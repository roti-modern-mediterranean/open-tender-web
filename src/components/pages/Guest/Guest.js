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
  Background,
  Content,
  HeaderLogo,
  HeaderMobile,
  Hero,
  Main,
  PageView,
  PageHero,
  Slider,
} from '../..'
import { makeSlides } from '../../HeroSlides'
import GuestHeader from './GuestHeader'

const GuestContent = styled('div')`
  line-height: ${(props) => props.theme.lineHeight};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  margin: 0 0 2.5rem;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 2rem;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    text-align: center;
  }

  p {
    margin: 0.5em 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

const Guest = () => {
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const brand = useSelector(selectBrand)
  const { home } = useSelector(selectConfig)
  const { background, mobile, content } = home
  const hasContent = !!(content && content.length && content[0].length)
  const slides = makeSlides([])
  // const slides = null

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
      {isBrowser && (
        <Background imageUrl={slides ? null : background}>
          {slides && <Slider slides={slides} />}
        </Background>
      )}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor="primary"
          borderColor="primary"
          maxWidth="76.8rem"
          left={<HeaderLogo />}
          right={<Account />}
        />
        <Main>
          <PageView>
            {!isBrowser && (
              <PageHero>
                {slides ? (
                  <Slider slides={slides} />
                ) : (
                  <Hero imageUrl={mobile}>&nbsp;</Hero>
                )}
              </PageHero>
            )}
            <GuestHeader />
          </PageView>
          {hasContent && (
            <GuestContent>
              {content.map((i, index) => (
                <p key={index}>{i}</p>
              ))}
            </GuestContent>
          )}
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
