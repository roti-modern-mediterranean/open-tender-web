import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setAddress, selectOrder } from '@open-tender/redux'
import { GoogleMapsAutocomplete } from '@open-tender/components'

import iconMap from './iconMap'
import { Container } from '.'
import styled from '@emotion/styled'

const MapsAutocompleteView = styled('div')`
  position: relative;
  z-index: 2;
  background-color: ${(props) => props.theme.bgColors.primary};
  // padding: ${(props) => props.theme.layout.padding} 0;
  padding: 2rem 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: fixed;
    top: 6rem;
    left: 0;
    right: 0;
    height: 6rem;
    padding: 0 0 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-bottom-style: solid;
    border-bottom-width: 0.1rem;
    border-bottom-color: ${(props) => props.theme.border.color};
  }
`

const MapsAutocomplete = ({
  setCenter,
  maps,
  map,
  sessionToken,
  autocomplete,
}) => {
  const dispatch = useDispatch()
  const { address } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''

  return (
    <MapsAutocompleteView>
      <Container>
        <GoogleMapsAutocomplete
          maps={maps}
          map={map}
          sessionToken={sessionToken}
          autocomplete={autocomplete}
          formattedAddress={formattedAddress}
          setAddress={(address) => dispatch(setAddress(address))}
          setCenter={setCenter}
          icon={iconMap.Navigation}
        />
      </Container>
    </MapsAutocompleteView>
  )
}

MapsAutocomplete.displayName = 'MapsAutocomplete'
MapsAutocomplete.propTypes = {
  revenueCenters: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default MapsAutocomplete
