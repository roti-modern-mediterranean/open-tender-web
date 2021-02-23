import React from 'react'
import { useDispatch } from 'react-redux'
import { ButtonStyled } from '@open-tender/components'
import { openModal } from '../../../slices'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'

const GiftCardButtonsView = styled('div')`
  display: flex;
  margin: 0 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: -1rem 0 3rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }

  button {
    max-width: 24rem;
    margin: 0 1rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0 0 1rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      max-width: 100%;
    }

    &:last-of-type {
      margin: 0;
    }
  }
`

const GiftCardButtons = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <GiftCardButtonsView>
      <ButtonStyled onClick={() => dispatch(openModal({ type: 'giftCard' }))}>
        Buy a New Gift Card
      </ButtonStyled>
      <ButtonStyled onClick={() => history.push('/gift-cards')}>
        Buy Gift Cards For Others
      </ButtonStyled>
      <ButtonStyled
        onClick={() => dispatch(openModal({ type: 'giftCardAssign' }))}
      >
        Add Gift Card To Account
      </ButtonStyled>
    </GiftCardButtonsView>
  )
}

GiftCardButtons.displayName = 'GiftCardButtons'
export default GiftCardButtons
