import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { setAddress, selectOrder } from '@open-tender/redux'
import {
  ButtonStyled,
  GoogleMapsAutocomplete,
  Preface,
} from '@open-tender/components'

import iconMap from '../../iconMap'
import RevenueCentersSelect from './RevenueCentersSelect'

const MapsAutocompleteView = styled('div')`
  z-index: 2;
  position: absolute;
  top: 100%;
  width: 100%;
  margin-top: -31rem;
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
  margin: -0.5rem 0 0 -1.5rem;

  button {
    width: 100%;
    border: 0;
  }
`

const ChangeLocation = ({ onClick }) => {
  return (
    <ChangeLocationView>
      <ButtonStyled
        icon={iconMap.RefreshCw}
        onClick={onClick}
        color="secondary"
        size="small"
      >
        Change location
      </ButtonStyled>
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
      {activeMarker && <ChangeLocation onClick={() => setActive(null)} />}
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
