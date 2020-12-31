import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  selectAutoSelect,
  selectRevenueCenterCount,
  selectGroupOrder,
} from '@open-tender/redux'

import { HeaderMobile } from '../..'
import {
  Account,
  Allergens,
  CancelEdit,
  GroupGuest,
  GroupOrder,
  LeaveGroup,
  Locations,
  RequestedAt,
  RevenueCenter,
  ServiceType,
  StartOver,
} from '../../buttons'
import { isBrowser } from 'react-device-detect'

const MenuHeader = ({ maxWidth = '100%', title, bgColor, borderColor }) => {
  const autoSelect = useSelector(selectAutoSelect)
  const count = useSelector(selectRevenueCenterCount)
  const showLocations = !autoSelect && count !== 1
  const { cartGuest } = useSelector(selectGroupOrder)

  const left = cartGuest ? (
    <LeaveGroup />
  ) : showLocations ? (
    <Locations />
  ) : (
    <StartOver />
  )

  return (
    <HeaderMobile
      title={title}
      maxWidth={maxWidth}
      bgColor={bgColor}
      borderColor={borderColor}
      left={left}
      right={
        <>
          {isBrowser ? (
            <>
              {cartGuest ? (
                <>
                  <Allergens />
                  <GroupGuest />
                </>
              ) : (
                <>
                  <Account />
                  <RevenueCenter />
                  <ServiceType />
                  <RequestedAt />
                  <Allergens />
                  <GroupOrder />
                  <CancelEdit />
                </>
              )}
            </>
          ) : null}
        </>
      }
    />
  )
}

MenuHeader.displayName = 'MenuHeader'
MenuHeader.propTypes = {
  maxWidth: propTypes.string,
  title: propTypes.string,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
}

export default MenuHeader
