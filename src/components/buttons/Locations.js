import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { selectOrder, setOrderServiceType } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import styled from '@emotion/styled'
import iconMap from '../iconMap'
import { selectTheme } from '../../slices'

const LocationsText = styled('span')`
  display: block;
  margin: 0 0.5rem 0 0;
`

const LocationsIcon = styled('span')`
  position: relative;
  top: 0.1rem;
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  line-height: 0;
`

const Locations = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { orderType, serviceType, revenueCenter } = useSelector(selectOrder)
  const theme = useSelector(selectTheme)
  const mobileStyles = { color: theme.colors.beet }
  const text = revenueCenter ? revenueCenter.name : 'Find a Roti'

  const onClick = () => {
    if (!orderType || !serviceType) {
      dispatch(setOrderServiceType('OLO', 'PICKUP'))
    }
    history.push(`/locations`)
  }

  return (
    <ButtonStyled
      onClick={onClick}
      color="header"
      size="header"
      style={!isBrowser ? mobileStyles : null}
    >
      <LocationsText>{text}</LocationsText>
      <LocationsIcon>{iconMap.MapPin}</LocationsIcon>
    </ButtonStyled>
  )
}

Locations.displayName = 'Locations'

export default Locations
