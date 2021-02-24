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
  Deals,
  PageHeader,
  Container,
} from '../..'
import { makeSlides } from '../../HeroSlides'
import GuestActions from './GuestActions'
import { Link } from 'react-router-dom'

const GuestHeader = styled('div')`
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: 0 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0.5rem 0 2.5rem;
  }
`

const GuestHeaderFootnote = styled('p')`
  margin: 2rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 2rem 0 0;
    text-align: center;
  }
`

const GuestHeaderLinks = styled('p')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  margin: 2.5rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    text-align: center;
  }
`

const GuestFooter = styled('div')`
  border-top: 0.1rem solid ${(props) => props.theme.border.color};

  // & > div:first-of-type {
  //   @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
  //     margin-top: ${(props) => props.theme.layout.paddingMobile};
  //   }
  // }
`

const GuestContent = styled('div')`
  line-height: ${(props) => props.theme.lineHeight};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  margin: 2.5rem 0;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 2rem 0;
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
  const { has_deals = true } = brand
  const { home } = useSelector(selectConfig)
  const { background, mobile, content, title, subtitle } = home
  const footnote = "Hint: you don't need an account to place an order."
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
        <Main bgColor="secondary">
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
            <GuestHeader>
              <PageHeader title={title} subtitle={subtitle} />
              <Container>
                <GuestActions />
                {footnote && (
                  <GuestHeaderFootnote>{footnote}</GuestHeaderFootnote>
                )}
                <GuestHeaderLinks>
                  <Link to="/gift-cards">Purchase gift cards</Link> |{' '}
                  <Link to="/donations">make a donation</Link> |{' '}
                  <Link to="/contact">get in touch</Link>
                </GuestHeaderLinks>
              </Container>
            </GuestHeader>
            <GuestFooter>
              {has_deals && <Deals />}
              {hasContent && (
                <GuestContent hasDeals={has_deals}>
                  {content.map((i, index) => (
                    <p key={index}>{i}</p>
                  ))}
                </GuestContent>
              )}
            </GuestFooter>
          </PageView>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
