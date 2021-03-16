import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

import { MapMarker } from '../icons'
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
  const history = useHistory()

  const back = () => {
    history.push(`/locations`)
  }

  return isBrowser ? (
    <ButtonStyled onClick={back} color="header" size="header">
      <LocationsText>{text}</LocationsText>
      <LocationsIcon>{icon}</LocationsIcon>
    </ButtonStyled>
  ) : (
    <ButtonIcon label={text} onClick={back}>
      {icon}
    </ButtonIcon>
  )
}

Locations.displayName = 'Locations'
Locations.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default Locations
