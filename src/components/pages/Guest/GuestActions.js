import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'
import { resetOrder } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import iconMap from '../../iconMap'
import { openModal } from '../../../slices'

const ButtonText = styled('span')`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const GuestActionsView = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 2.5rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: -0.3rem -0.5rem 1.9rem;
  }

  button {
    margin: 0 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: block;
      flex: 1 1 50%;
      padding: 1.25rem 1rem;
      margin: 0 0.5rem;
      border-radius: 2.5rem;
      line-height: 1.2;
      overflow: hidden;
    }
  }
`

const GuestActions = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const buttonSize = isBrowser ? 'default' : 'small'

  const startNewOrder = () => {
    dispatch(resetOrder())
    history.push(`/order-type`)
  }

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  return (
    <GuestActionsView>
      <ButtonStyled
        icon={iconMap.ShoppingBag}
        onClick={startNewOrder}
        size={buttonSize}
      >
        <ButtonText>Start New Order</ButtonText>
      </ButtonStyled>
      <ButtonStyled
        icon={iconMap.User}
        onClick={login}
        size={buttonSize}
        color="secondary"
      >
        <ButtonText>Log In / Sign Up</ButtonText>
      </ButtonStyled>
    </GuestActionsView>
  )
}

GuestActions.displayName = 'GuestActions'

export default GuestActions
