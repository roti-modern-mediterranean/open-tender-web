import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { selectOrder, setOrderServiceType } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import styled from '@emotion/styled'
import iconMap from '../iconMap'

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

const Locations = ({ text = 'Find A Roti', icon = iconMap.MapPin }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { orderType, serviceType } = useSelector(selectOrder)
  const mobileStyles = { color: '#621C27' }

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
      <LocationsIcon>{icon}</LocationsIcon>
    </ButtonStyled>
  )
}

Locations.displayName = 'Locations'
Locations.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default Locations
