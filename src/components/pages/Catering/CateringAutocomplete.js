import { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { setAddress, selectOrder } from '@open-tender/redux'
import { GoogleMap, GoogleMapsAutocomplete } from '@open-tender/components'

import { selectSettings } from '../../../slices'
import { MapPin } from 'react-feather'
import { ButtonToggle } from '../../buttons'

const CateringMapView = styled('div')`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
`

const CateringMap = ({ mapRef }) => (
  <CateringMapView>
    <div ref={mapRef} />
  </CateringMapView>
)

const CateringAutocompleteInputView = styled('div')`
  width: 100%;

  input {
    color: ${(props) => props.theme.colors.light};
    border-color: ${(props) => props.theme.colors.light};
    &::placeholder {
      color: ${(props) => props.theme.colors.light};
    }

    &:focus {
      outline: none;
    }
  }

  input + div + div {
    opacity: 1;
    left: 0;
    margin-top: -0.8rem;
    color: ${(props) => props.theme.colors.light};
  }
`

const CateringAutocompleteInput = ({
  maps,
  map,
  sessionToken,
  autocomplete,
  formattedAddress,
  setCenter,
  setAddress,
}) => (
  <CateringAutocompleteInputView>
    <GoogleMapsAutocomplete
      maps={maps}
      map={map}
      sessionToken={sessionToken}
      autocomplete={autocomplete}
      formattedAddress={formattedAddress}
      setCenter={setCenter}
      setAddress={setAddress}
      icon={<MapPin size={18} />}
      placeholder="enter your address"
    />
  </CateringAutocompleteInputView>
)

CateringAutocompleteInput.displayName = 'CateringAutocompleteInput'
CateringAutocompleteInput.propTypes = {
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
  formattedAddress: propTypes.string,
  setAddress: propTypes.func,
}

const CateringAutocompleteView = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // padding: 2rem;
  border-radius: ${(props) => props.theme.border.radius};
  // background-color: ${(props) => props.theme.colors.light};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
`

const CateringAutocompleteButtons = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  margin: 4rem auto 0;

  & > div {
    width: 50%;
    padding: 0 2rem;

    button,
    button:hover,
    button:active,
    button:focus {
      span {
        font-size: 1.8rem;
      }
    }

    button:disabled,
    button:disabled:hover {
      opacity: 0.5;
      background-color: ${(props) => props.theme.colors.light};
      border-color: ${(props) => props.theme.colors.light};
      box-shadow: none;

      span {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }
`

const CateringAutocomplete = ({ handlePickup, handleDelivery }) => {
  const dispatch = useDispatch()
  const { address } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const { googleMaps } = useSelector(selectSettings)
  const { apiKey, defaultCenter, zoom, styles } = googleMaps
  const [, setCenter] = useState(defaultCenter)

  return (
    <CateringAutocompleteView>
      <GoogleMap
        apiKey={apiKey}
        zoom={zoom}
        styles={styles}
        center={defaultCenter}
        loader={<ClipLoader size={30} loading={true} />}
        renderMap={(props) => <CateringMap {...props} />}
      >
        <CateringAutocompleteInput
          formattedAddress={formattedAddress}
          setCenter={setCenter}
          setAddress={(address) => dispatch(setAddress(address))}
        />
        <CateringAutocompleteButtons>
          <ButtonToggle
            onClick={handlePickup}
            disabled={address ? false : true}
          >
            Pickup
          </ButtonToggle>
          <ButtonToggle
            onClick={handleDelivery}
            disabled={address ? false : true}
          >
            Delivery
          </ButtonToggle>
        </CateringAutocompleteButtons>
      </GoogleMap>
    </CateringAutocompleteView>
  )
}

CateringAutocomplete.displayName = 'CateringAutocomplete'
CateringAutocomplete.propTypes = {
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default CateringAutocomplete
