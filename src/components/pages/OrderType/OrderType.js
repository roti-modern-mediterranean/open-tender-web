import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'

import { maybeRefreshVersion } from '../../../app/version'
import { selectConfig, closeModal } from '../../../slices'
import { AppContext } from '../../../App'
import { Account, Home } from '../../buttons'
import { Background, Content, HeaderMobile, Main, PageHeader } from '../..'
import OrderTypes from './OrderTypes'

const OrderTypeContent = styled('div')`
  line-height: ${(props) => props.theme.lineHeight};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  padding: 2.5rem ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 2rem ${(props) => props.theme.layout.paddingMobile};
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

const OrderType = () => {
  const dispatch = useDispatch()
  const { home } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = home
  const hasContent = content && content.length && content[0].length
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  return (
    <>
      <Background imageUrl={isBrowser ? background : mobile} />
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor="primary"
          borderColor="primary"
          maxWidth="76.8rem"
          left={<Home />}
          // right={<Logout />}
          right={<Account />}
        />
        <Main>
          <PageHeader title={title} subtitle={subtitle} />
          <OrderTypes />
          {hasContent && (
            <OrderTypeContent>
              {content.map((i, index) => (
                <p key={index}>{i}</p>
              ))}
            </OrderTypeContent>
          )}
        </Main>
      </Content>
    </>
  )
}

OrderType.displayName = 'OrderType'
export default OrderType
