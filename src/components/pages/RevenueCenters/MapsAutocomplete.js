import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { setAddress, selectOrder } from '@open-tender/redux'
import { GoogleMapsAutocomplete, Preface } from '@open-tender/components'

import iconMap from '../../iconMap'
import RevenueCentersSelect from './RevenueCentersSelect'

const MapsAutocompleteView = styled('div')`
  position: relative;
  z-index: 2;
  margin-top: calc(100vh - 30rem);
  min-height: 30rem;
  max-width: 44rem;
  border-radius: 2.1rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${(props) => props.theme.bgColors.primary};
  transform: translate3D(-50%, 0, 0);
  margin-left: 50%;
  // padding: ${(props) => props.theme.layout.paddingMobile};
  padding: 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-left: 0;
    transform: translate3D(0, 0, 0);
  }
`

const MapsAutocompleteHeader = styled('div')`
  h2 {
    font-size: 2.2rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
`

const MapsAutocompleteInput = styled('div')`
  margin: 1.5rem 0 0;

  & > div {
    border-bottom: 0.1rem solid #7f8692;
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
  const { address, serviceType } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const placeholder =
    serviceType === 'DELIVERY'
      ? 'enter a delivery address'
      : 'enter an address or zip code'

  return (
    <MapsAutocompleteView>
      <MapsAutocompleteHeader>
        <Preface as="h2">Find a pickup location near you</Preface>
      </MapsAutocompleteHeader>
      <MapsAutocompleteInput>
        <GoogleMapsAutocomplete
          maps={maps}
          map={map}
          sessionToken={sessionToken}
          autocomplete={autocomplete}
          formattedAddress={formattedAddress}
          setAddress={(address) => dispatch(setAddress(address))}
          setCenter={setCenter}
          icon={iconMap.MapPin}
          placeholder={placeholder}
        />
        <RevenueCentersSelect />
      </MapsAutocompleteInput>
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
