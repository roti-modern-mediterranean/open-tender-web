import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'

import { maybeRefreshVersion } from '../../../app/version'
import { selectConfig, closeModal } from '../../../slices'
import { AppContext } from '../../../App'
import { Logout, StartOver } from '../../buttons'
import {
  Background,
  Content,
  HeaderMobile,
  Main,
  OrderTypes,
  Welcome,
  WelcomeHeader,
} from '../..'

const ChooseOrderTypeHeader = styled('div')`
  padding: 2.5rem;
`

const ChooseOrderType = () => {
  const dispatch = useDispatch()
  const { home: homeConfig } = useSelector(selectConfig)
  const { background, mobile } = homeConfig
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  return (
    <>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor={isBrowser ? 'primary' : 'transparent'}
          borderColor={isBrowser ? 'primary' : 'transparent'}
          maxWidth="76.8rem"
          left={<StartOver text="Back" color="light" />}
          right={<Logout color="light" />}
        />
        <Main padding="0" imageUrl={mobile || background}>
          <Welcome footer={<OrderTypes />}>
            <ChooseOrderTypeHeader>
              <WelcomeHeader title="Choose your order type" />
            </ChooseOrderTypeHeader>
          </Welcome>
        </Main>
      </Content>
    </>
  )
}

ChooseOrderType.displayName = 'ChooseOrderType'
export default ChooseOrderType
