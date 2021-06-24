import React from 'react'
import { useDispatch } from 'react-redux'
import { ButtonStyled } from '@open-tender/components'

import { openModal, closeModal } from '../../../slices'
import { ModalContent } from '../../Modal'
import ButtonGroupBig from '../../ButtonGroupBig'
import InlineLink from '../../InlineLink'

const GroupOrderGuest = () => {
  const dispatch = useDispatch()

  const login = (type) => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(openModal({ type }))
    }, 300)
  }

  return (
    <ModalContent
      title="Start a group order"
      footer={
        <p>
          Don't have an account?{' '}
          <InlineLink onClick={() => login('signUp')}>
            Click here to create one.
          </InlineLink>
        </p>
      }
    >
      <div>
        <p>You must be logged into your accout to start a group order.</p>
        <ButtonGroupBig>
          <ButtonStyled onClick={() => login('login')} size="big">
            Log into your account
          </ButtonStyled>
          <ButtonStyled
            onClick={() => dispatch(closeModal())}
            size="big"
            color="secondary"
          >
            Nevermind
          </ButtonStyled>
        </ButtonGroupBig>
      </div>
    </ModalContent>
  )
}

GroupOrderGuest.displayName = 'GroupOrderGuest'

export default GroupOrderGuest
