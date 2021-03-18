import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { setAddress, selectOrder } from '@open-tender/redux'
import {
  ButtonLink,
  GoogleMapsAutocomplete,
  Preface,
} from '@open-tender/components'

import iconMap from '../../iconMap'
import RevenueCentersSelect from './RevenueCentersSelect'
import { PrefaceTitle } from '../..'

const MapsAutocompleteView = styled('div')`
  z-index: 2;
  position: absolute;
  top: 100%;
  width: 100%;
  margin-top: -30rem;
  transform: translate3D(0, 0, 0);
  // position: relative;
  // margin-top: calc(100vh - 30rem);
  // margin-left: 50%;
  // transform: translate3D(-50%, 0, 0);
  margin-left: 5%;
  min-height: 30rem;
  max-width: 44rem;
  padding: 2rem 2.5rem;
  border-radius: 2.1rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-left: 0;
    transform: translate3D(0, 0, 0);
  }
`

const MapsAutocompleteHeader = styled('div')`
  margin: 0 0 1rem;

  h2 {
    font-size: 2.2rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
`

const MapsAutocompleteInput = styled('div')`
  margin: 0 0 2.5rem;

  & > div {
    border-bottom: 0.1rem solid #7f8692;
  }
`
const ChangeLocationView = styled('div')`
  button {
    span {
      color: ${(props) => props.theme.links.primary.color};
    }

    span:first-of-type {
      display: inline-block;
      width: 1.4rem;
      height: 1.4rem;
      margin: 0 0.75rem 0 0;
    }
  }
`

const ChangeLocation = ({ onClick }) => {
  return (
    <ChangeLocationView>
      <ButtonLink onClick={onClick}>
        <span>{iconMap.RefreshCw}</span>
        <PrefaceTitle>Change location</PrefaceTitle>
      </ButtonLink>
    </ChangeLocationView>
  )
}

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
  const { address, serviceType } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const placeholder =
    serviceType === 'DELIVERY'
      ? 'enter a delivery address'
      : 'enter an address or zip code'

  return (
    <MapsAutocompleteView>
      <MapsAutocompleteHeader>
        {activeMarker ? (
          <ChangeLocation onClick={() => setActive(null)} />
        ) : (
          <Preface as="h2">Find a pickup location near you</Preface>
        )}
      </MapsAutocompleteHeader>
      {!activeMarker && (
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
