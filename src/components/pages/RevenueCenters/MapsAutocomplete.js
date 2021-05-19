import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { setAddress, selectOrder } from '@open-tender/redux'
import { GoogleMapsAutocomplete, Preface } from '@open-tender/components'

import iconMap from '../../iconMap'
import RevenueCentersSelect from './RevenueCentersSelect'

const MapsAutocompleteView = styled('div')`
  padding: 2rem 0 0;
  border-radius: 2.1rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${(props) => props.theme.bgColors.primary};

  z-index: 2;
  position: absolute;
  bottom: 0;
  width: 44rem;
  margin-left: 5%;
  max-height: 80%;
  min-height: 30rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    top: 100%;
    bottom: auto;
    width: 100%;
    margin-top: -33rem;
    min-height: 30rem;
    max-width: 44rem;
    margin-left: 0;
  }
`

const MapsAutocompleteHeader = styled('div')`
  margin: 0 2.5rem 1rem;

  h2 {
    font-size: 2.2rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
`

const MapsAutocompleteInput = styled('div')`
  margin: 0 2.5rem 2.5rem;

  // & > div {
  //   border-bottom: 0.1rem solid #7f8692;
  // }
`

const MapsAutocomplete = ({
  setCenter,
  maps,
  map,
  sessionToken,
  autocomplete,
  setActive,
  activeMarker,
}) => {
  const dispatch = useDispatch()
  const { address, serviceType, orderType } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const placeholder =
    serviceType === 'DELIVERY'
      ? 'enter a delivery address'
      : 'enter an address or zip code'
  const orderTypeName = orderType === 'CATERING' ? orderType : serviceType

  return (
    <MapsAutocompleteView>
      {!activeMarker && (
        <>
          <MapsAutocompleteHeader>
            <Preface as="h2">Find a {orderTypeName} location near you</Preface>
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
          </MapsAutocompleteInput>
        </>
      )}
      <RevenueCentersSelect setActive={setActive} activeMarker={activeMarker} />
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
  setActive: propTypes.func,
  activeMarker: propTypes.number,
}
export default MapsAutocomplete
