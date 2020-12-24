import React from 'react'
import { useDispatch } from 'react-redux'
import { ButtonStyled } from '@open-tender/components'
import { openModal } from '../../../slices'
import { useHistory } from 'react-router-dom'

const GiftCardButtons = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div style={{ margin: '0 0 4rem' }}>
      <ButtonStyled onClick={() => dispatch(openModal({ type: 'giftCard' }))}>
        Buy a New Gift Card
      </ButtonStyled>{' '}
      <ButtonStyled onClick={() => history.push('/gift-cards')}>
        Buy Gift Cards For Others
      </ButtonStyled>{' '}
      <ButtonStyled
        onClick={() => dispatch(openModal({ type: 'giftCardAssign' }))}
      >
        Add Gift Card To Account
      </ButtonStyled>
    </div>
  )
}

GiftCardButtons.displayName = 'GiftCardButtons'
export default GiftCardButtons
