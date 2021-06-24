import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectGroupOrder } from '@open-tender/redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'

import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import GroupOrderReviewGuest from './GroupOrderReviewGuest'
import GroupOrderReviewOwner from './GroupOrderReviewOwner'

export const GroupOrderReviewIntro = styled('div')`
  text-align: center;
  margin: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} 0 0;
  }

  p {
    margin: 1em 0;
    line-height: ${(props) => props.theme.lineHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

export const GroupOrderReviewCart = styled('div')`
  margin: 6rem auto;
  max-width: ${(props) => props.theme.breakpoints.tablet};
  padding: ${(props) => props.theme.layout.padding};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.light};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: ${(props) => props.theme.layout.paddingMobile};
    margin: 3rem auto;
  }

  & > div {
    margin: 0 0 3rem;

    &:last-of-type {
      margin: 0;
    }
  }

  & > div > div {
    border: 0;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.line};
    border-top-width: 0.1rem;
    padding-top: 1.1rem;
    margin-top: 0.6rem;

    &:first-of-type {
      border: 0;
      padding-top: 0.8rem;
      margin: 0;
      span {
        font-weight: 500;
      }
    }

    &:last-of-type {
      span {
        font-weight: 500;
      }
    }
  }
`

const GroupOrderReview = () => {
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const groupOrder = useSelector(selectGroupOrder)
  const { cartId, cartOwner, cartGuest } = groupOrder
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    if (!cartId) history.push(`/`)
  }, [windowRef, cartId, history])

  return (
    <>
      <Helmet>
        <title>Review Group Order | {siteTitle}</title>
      </Helmet>
      {cartGuest ? (
        <GroupOrderReviewGuest />
      ) : cartOwner ? (
        <GroupOrderReviewOwner />
      ) : null}
    </>
  )
}

GroupOrderReview.displayName = 'GroupOrderReview'
export default GroupOrderReview
