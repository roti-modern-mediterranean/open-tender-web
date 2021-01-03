import React, { useState } from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'
import {
  selectAutoSelect,
  selectRevenueCenterCount,
  selectGroupOrder,
  selectOrder,
} from '@open-tender/redux'
import { serviceTypeNamesMap } from '@open-tender/js'
import { Preface, Heading } from '@open-tender/components'

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
import iconMap from '../../iconMap'

const MenuHeaderTitleServiceType = styled(Preface)`
  display: block;
  line-height: 1;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const MenuHeaderTitleRevenueCenter = styled('button')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.4rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.big};

  span {
    display: inline-block;

    &:first-of-type {
      max-width: 20rem;
      height: ${(props) => props.theme.fonts.sizes.big};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:last-of-type {
      margin: 0.3rem 0 0 0.5rem;
      width: 1.6rem;
      height: 1.6rem;
      color: ${(props) => props.theme.fonts.headings.color};
    }
  }
`

const MenuHeaderTitle = ({ serviceType, revenueCenter, show, setShow }) => {
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  return (
    <>
      <MenuHeaderTitleServiceType>
        Ordering {serviceTypeName}
      </MenuHeaderTitleServiceType>
      <MenuHeaderTitleRevenueCenter onClick={() => setShow(!show)}>
        <Heading>{revenueCenter.name}</Heading>
        <span>{iconMap.ChevronDown}</span>
      </MenuHeaderTitleRevenueCenter>
    </>
  )
}

const MenuHeaderOrderView = styled('div')`
  position: fixed;
  z-index: 18;
  top: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  transition: all 0.25s ease;
  transform: translateY(${(props) => (props.show ? '6rem' : '-100%')});
  background-color: ${(props) => props.theme.bgColors.primary};
`

const MenuHeaderOrder = ({ order, show }) => {
  return (
    <MenuHeaderOrderView show={show}>
      <div>This is where the order content will go.</div>
    </MenuHeaderOrderView>
  )
}

const MenuHeader = ({ maxWidth = '100%', title, bgColor, borderColor }) => {
  const [show, setShow] = useState(false)
  const autoSelect = useSelector(selectAutoSelect)
  const order = useSelector(selectOrder)
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
      title={
        <>
          <MenuHeaderTitle {...order} show={show} setShow={setShow} />
          <MenuHeaderOrder order={order} show={show} />
        </>
      }
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
          ) : (
            <Allergens />
          )}
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
