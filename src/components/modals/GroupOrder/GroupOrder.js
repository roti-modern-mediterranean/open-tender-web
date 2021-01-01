import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomer, selectGroupOrderToken } from '@open-tender/redux'

import { ModalClose } from '../..'
import GroupOrderGuest from './GroupOrderGuest'
import GroupOrderStart from './GroupOrderStart'
import GroupOrderShare from './GroupOrderShare'

const GroupOrder = () => {
  const { auth } = useSelector(selectCustomer)
  const token = useSelector(selectGroupOrderToken)

  return (
    <>
      <ModalClose />
      {token ? (
        <GroupOrderShare />
      ) : auth ? (
        <GroupOrderStart />
      ) : (
        <GroupOrderGuest />
      )}
    </>
  )
}

GroupOrder.displayName = 'GroupOrder'

export default GroupOrder
