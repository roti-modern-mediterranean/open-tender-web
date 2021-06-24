import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectGroupOrder,
  resetGroupOrder,
  removeCustomerGroupOrder,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../../slices'
import { GroupOrderLink, GroupOrderTime } from '../..'
import { ModalContent } from '../../Modal'
import ButtonGroupBig from '../../ButtonGroupBig'
import InlineLink from '../../InlineLink'

const GroupOrderShare = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { token, cartId } = useSelector(selectGroupOrder)

  const proceed = () => {
    history.push('/review')
    dispatch(closeModal())
  }

  const backToMenu = () => {
    dispatch(closeModal())
  }

  const save = () => {
    dispatch(resetGroupOrder())
    dispatch(closeModal())
  }

  const cancel = () => {
    dispatch(removeCustomerGroupOrder(cartId))
    dispatch(closeModal())
  }

  return (
    <ModalContent
      title="Spread the love!"
      subtitle={
        <p>
          Share the link below with your friends so they can add their orders
        </p>
      }
      footer={
        <>
          <p>
            Change your mind?{' '}
            <InlineLink onClick={save}>Save this order for later</InlineLink> or{' '}
            <InlineLink onClick={cancel}>cancel it altogether.</InlineLink>
          </p>
        </>
      }
    >
      <div>
        <GroupOrderLink token={token} />
        <GroupOrderTime />
        <p>
          Once you've added your own items, proceed to the next page to review
          the orders that have been submitted by others.
        </p>
        <ButtonGroupBig>
          <ButtonStyled onClick={proceed} size="big">
            Review All Orders
          </ButtonStyled>
          <ButtonStyled onClick={backToMenu} size="big" color="secondary">
            Back To Menu
          </ButtonStyled>
        </ButtonGroupBig>
      </div>
    </ModalContent>
  )
}

GroupOrderShare.displayName = 'GroupOrderShare'

export default GroupOrderShare
