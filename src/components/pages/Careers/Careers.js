import React, { useContext, useEffect, useState, useCallback } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { handleRespError } from '@open-tender/js'

import { maybeRefreshVersion } from '../../../app/version'
import { selectAPI, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import { ButtonStyled } from '@open-tender/components'
import { PageHero, PageView } from '../..'
import {
  Content,
  Main,
  PageTitle,
  PageContainer,
  PageContent,
  HeaderDefault,
} from '../..'
import styled from '@emotion/styled'

const OneMoreThingWrapper = styled('div')`
  background-color: #c6d0dd;
  h3 {
    font-weight: normal;
    font-size: 2em;
    margin: 0.5rem 0 0.5em 0;
    color: ${(props) => props.theme.colors.pepper};
    font-family: ${(props) => props.theme.fonts.preface.family};
  }
  > div {
    display: flex;
    align-items: center;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      flex-direction: column;
    }
  }
  .one-wrapper {
    width: 70%;
    margin-right: 2em;
  }
  button {
    height: 3em;
  }
`
const BenefitsWrapper = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
  }
  li {
    width: calc(25% - 1em);
    margin: 1em 0.5em 0 0;
    text-align: center;
    display: flex;
    align-items: center;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: calc(50% - 1em);
      flex-direction: column;
    }
  }
  h4 {
    font-weight: normal;
    font-size: 1em;
    text-align: left;
    margin: 0.75rem 0 0 1em;
    color: ${(props) => props.theme.colors.pepper};
    font-family: ${(props) => props.theme.fonts.preface.family};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: 1.25em;
      text-align: center;
    }
  }
  img {
    width: 3.75em;
    display: inline-block;
  }
`

const FrameImage = styled('div')`
  background-image: ${(props) => `url(${props.src})`};
  width: 4em;
  height: 4em;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const ContentListOfItems = styled('ul')`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    background: transparent;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;

    li {
      margin-bottom: 1em;
    }
  }
  li {
    flex: 1;
    margin-right: 1em;
    h3 {
      font-weight: normal;
      font-size: 1.5em;
      margin: 0.75rem 0;
      color: ${(props) => {
        return props.theme.colors.pepper
      }};
      font-family: ${(props) => props.theme.fonts.preface.family};
    }
    p {
      font-size: 0.85em;
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        font-size: 1em;
      }
    }
  }
  img {
    position: relative;
    border-radius: 0.75rem;
  }
`

const ContentCards = styled('ul')`
  display: flex;
  flex-direction: row;
  margin: 4em 0;

  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    background: transparent;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;

    li {
      margin-bottom: 1em;
    }
  }
  li {
    flex: 1 1 auto;
    margin-right: 1em;
    width: 50%;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 100%;
    }
    h3 {
      font-weight: normal;
      font-size: 1.5em;
      margin: 0.75rem 0;
      color: ${(props) => {
        return props.theme.colors.pepper
      }};
      font-family: ${(props) => props.theme.fonts.preface.family};
    }
    p {
      font-size: 0.85em;
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        font-size: 1em;
      }
    }
  }
  img {
    position: relative;
    flex: 0 0 200px;
  }
  .card-body {
    flex: 0 0 50%;
  }
`

const Careers = () => {
  const { windowRef } = useContext(AppContext)
  const [page, setPage] = useState(null)
  const [error, setError] = useState(null)
  const { title: siteTitle } = useSelector(selectBrand)
  const api = useSelector(selectAPI)
  const slug = 'careers'
  const pageTitle = page ? page.title : 'Not Found'

  const createAnnouncement = useCallback(() => {
    return page
      ? {
          settings: {
            announcement_page_id: Math.floor(Math.random() * 18000) + 1,
            autoplay: false,
            duration: 3000,
            duration_mobile: 2500,
            page: 'Careers',
            show_arrows: false,
            show_arrows_mobile: false,
            show_dots: false,
            show_dots_mobile: false,
            transition: 1000,
            transition_mobile: 500,
          },
          entities: [
            {
              announcement_id: Math.floor(Math.random() * 18000) + 1,
              display_order: 1,
              horizontal: 'CENTER',
              images: page.files,
              background_size: 'contain',
              slide_color: '#B7C9D7',
              overlay_color: '25272A',
              overlay_opacity: 0.5,
              show_overlay: true,
              text_color: 'FBF8EA',
              title: 'JOIN THE ROTEAM',
              url: '',
              url_text: 'Apply today',
              vertical: 'BOTTOM',
            },
          ],
        }
      : {}
  }, [page])

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    let isCancelled = false
    const fetchPage = async () => {
      try {
        let page = await api.getPage(slug)
        if (!isCancelled) {
          setPage(page)
        }
      } catch (err) {
        if (!isCancelled) {
          let { detail } = handleRespError(err)
          if (detail.includes('does not exist')) {
            detail = 'Page not found. Please try again.'
          }
          setError(detail)
        }
      }
    }
    if (slug) fetchPage()
    return () => {
      isCancelled = true
    }
  }, [api, slug])

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault title={isBrowser ? null : pageTitle} />
        <Main>
          {page && (
            <PageView>
              <PageHero announcements={createAnnouncement()} showHero={true} />
            </PageView>
          )}
          <PageContainer style={{ maxWidth: '86.8rem', margin: '0rem auto' }}>
            {page ? (
              <>
                <h2>Our values</h2>
                <PageContent style={{ textAlign: 'left', marginTop: '3rem' }}>
                  <ContentListOfItems>
                    <li>
                      <img
                        alt=""
                        src="https://roti-website.s3.amazonaws.com/carousels/careers/small-image-careers-top-1.jpg"
                      />
                      <h3>Joy.</h3>
                      <p>
                        Rōti brings people together: over a meal, during a
                        shift, and across the country in our many locations.
                        Creating and being a part of these meaningful
                        connections gives us joy, and we’re committed to paying
                        that joy forward to every single person, every single
                        day. We know that joy - a smile, a laugh, or thoughtful
                        question - can turn any day around.
                      </p>
                    </li>
                    <li>
                      <img
                        alt=""
                        src="https://roti-website.s3.amazonaws.com/carousels/careers/small-image-careers-top-2.jpg"
                      />
                      <h3>Pride.</h3>
                      <p>
                        Our vibe is our superpower - we take pride in creating
                        an environment that focuses on hospitality in fun and
                        engaging ways. No task is too small to devote attention
                        to and to get right. This makes a difference in the
                        lives of our customers and our community, but also in
                        the lives of our team members.
                      </p>
                    </li>
                    <li>
                      <img
                        alt=""
                        src="https://roti-website.s3.amazonaws.com/carousels/careers/small-image-careers-top-3.png"
                      />
                      <h3>Progress.</h3>
                      <p>
                        We’re always looking for ways to improve ourselves and
                        our business - to get better, go farther, and grow
                        faster with every day. What does that mean for you? That
                        you’ll be on the fast track in a fast-paced environment.
                        We are big believers that big wins start from small
                        beginnings - so get your start towards a big future.
                      </p>
                    </li>
                  </ContentListOfItems>
                  <ContentCards>
                    <li>
                      <img alt="" src="https://roti-website.s3.amazonaws.com/images/image-c-1.png" />
                      <div className="card-body">
                        <h3>A Career that matters.</h3>
                        <p>
                          At Rōti it’s simple - we hire people with positive
                          energy, who accomplish goals by supporting each other
                          and are committed to serving Food That Matters.
                          Whether you start as a Team Member, Manager, or part
                          of our Support Team, we will empower your personal and
                          professional development.
                        </p>
                      </div>
                    </li>
                    <li>
                      <img alt="" src="https://roti-website.s3.amazonaws.com/images/image-c-2.png" />
                      <div className="card-body">
                        <h3>Inclusion, diversity &amp; equity.</h3>
                        <p>
                          We support and encourage a diverse workforce. We’re
                          looking for people to be themselves, whatever that
                          entails. After all, you’re at your best when you can
                          bring your whole self to work.
                        </p>
                      </div>
                    </li>
                  </ContentCards>
                  <div>
                    <h3>Benefits</h3>
                    <BenefitsWrapper>
                      <li>
                        <FrameImage src="https://roti-website.s3.amazonaws.com/images/icons/benefits-medical.png" />
                        <h4>Medical, dental, vision</h4>
                      </li>
                      <li>
                        <FrameImage src="https://roti-website.s3.amazonaws.com/images/icons/benefits-bonus.png" />
                        <h4>Bonus opportunities</h4>
                      </li>
                      <li>
                        <FrameImage src="https://roti-website.s3.amazonaws.com/images/icons/benefits-tip-pool.png" />
                        <h4>Tip pool program</h4>
                      </li>
                      <li>
                        <FrameImage src="https://roti-website.s3.amazonaws.com/images/icons/benefits-flexible.png" />
                        <h4>Flexible schedules</h4>
                      </li>
                      <li>
                        <FrameImage src="https://roti-website.s3.amazonaws.com/images/icons/benefits-career.png" />
                        <h4>career &amp; education opportunities</h4>
                      </li>
                      <li>
                        <FrameImage src="https://roti-website.s3.amazonaws.com/images/icons/benefits-timeoff.png" />
                        <h4>Paid time off</h4>
                      </li>
                      <li>
                        <FrameImage src="https://roti-website.s3.amazonaws.com/images/icons/benefits-401k.png" />
                        <h4>401k retirement savings</h4>
                      </li>
                      <li>
                        <FrameImage src="https://roti-website.s3.amazonaws.com/images/icons/benefits-freefood.png" />
                        <h4>discounts &amp; free food</h4>
                      </li>
                    </BenefitsWrapper>
                  </div>
                </PageContent>
              </>
            ) : error ? (
              <>
                <PageTitle title="Something went wrong" />
                <PageContent style={{ textAlign: 'left', marginTop: '3rem' }}>
                  <p>{error}</p>
                </PageContent>
              </>
            ) : null}
          </PageContainer>
          <OneMoreThingWrapper>
            <PageContainer style={{ maxWidth: '86.8rem', margin: '3rem auto' }}>
              <div className="one-wrapper">
                <h3>Hello, 2021. We’re hiring.</h3>
                <p>
                  We’ve got big plans for this year. Opening restaurants across
                  the country, updating and innovating our menus, and always,
                  always thinking of ways to bring our food to more people.
                  Think you could help us? We hope so. Check out our open roles
                  to see if anything is a match.{' '}
                </p>
              </div>
              <ButtonStyled
                onClick={() => {
                  window.open(
                    'https://recruiting.ultipro.com/ROT1002/JobBoard/4fc826aa-4426-6136-502d-c0778bee0567/?q=&o=postedDateDesc&w=&wc=&we=&wpst=',
                    '_blank'
                  )
                }}
                size="big"
                color="secondary"
              >
                Explore roles
              </ButtonStyled>
            </PageContainer>
          </OneMoreThingWrapper>
        </Main>
      </Content>
    </>
  )
}

Careers.displayName = 'Careers'
export default Careers
