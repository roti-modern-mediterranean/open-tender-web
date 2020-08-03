import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomer, selectGroupOrderToken } from '@open-tender/redux'

import GroupOrderGuest from '../GroupOrderGuest'
import GroupOrderStart from '../GroupOrderStart'
import GroupOrderShare from '../GroupOrderShare'
import ModalClose from '../ModalClose'

const GroupOrderModal = () => {
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

GroupOrderModal.displayName = 'GroupOrderModal'

export default GroupOrderModal
