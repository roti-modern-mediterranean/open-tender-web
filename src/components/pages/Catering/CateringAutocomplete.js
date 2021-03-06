import { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'
import ClipLoader from 'react-spinners/ClipLoader'
import { setAddress, selectOrder } from '@open-tender/redux'
import {
  ButtonLink,
  GoogleMap,
  GoogleMapsAutocomplete,
  Preface,
} from '@open-tender/components'

import { selectSettings } from '../../../slices'
import { MapPin } from 'react-feather'
import { ButtonToggle } from '../../buttons'
import { Loading } from '../..'

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
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // padding: 2rem;
  border-radius: ${(props) => props.theme.border.radius};
  // background-color: ${(props) => props.theme.colors.light};
  // opacity: 0;
  // animation: slide-up 0.25s ease-in-out 0.25s forwards;
`

const CateringAutocompleteButtons = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  margin: 3rem auto 0;

  & > div {
    width: 50%;
    padding: 0 1.5rem;

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

const CateringAutocompleteTime = styled('div')`
  margin: 0 0 1rem;
  text-align: center;

  p {
    color: ${(props) => props.theme.colors.light};
    margin: 0 0 1rem;

    button {
      color: ${(props) => props.theme.colors.light};
      font-size: 1.3rem;
      padding-bottom: 0.2rem;
      border-bottom: 0.1rem solid ${(props) => props.theme.colors.light};

      &:enabled:hover,
      &:enabled:active,
      &:enabled:focus {
        color: ${(props) => props.theme.colors.paprika};
        border-color: ${(props) => props.theme.colors.paprika};
      }

      &:disabled {
        color: ${(props) => props.theme.colors.light};
        border-bottom: 0.1rem solid ${(props) => props.theme.colors.light};
      }
    }
  }
`

const CateringAutocompleteTimeDate = styled(Preface)`
  color: ${(props) => props.theme.colors.light};
  font-size: 2.7rem;
`

const CateringLoading = styled('div')`
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: center;

  p {
    color: ${(props) => props.theme.colors.light};
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const CateringAutocomplete = ({
  requestedAtStr,
  clearTime,
  selectServiceType,
  disabled,
  error,
}) => {
  const dispatch = useDispatch()
  const { address } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const { googleMaps } = useSelector(selectSettings)
  const { apiKey, defaultCenter, zoom, styles } = googleMaps
  const [, setCenter] = useState(defaultCenter)
  const serviceTypeDisabled = disabled || !address ? true : false
  const theme = useTheme()

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
        <CateringAutocompleteTime>
          <p>You selected a date and time of</p>
          <p>
            <CateringAutocompleteTimeDate>
              {requestedAtStr}
            </CateringAutocompleteTimeDate>
          </p>
          <p>
            <ButtonLink disabled={disabled} onClick={clearTime}>
              Choose a different time
            </ButtonLink>
          </p>
        </CateringAutocompleteTime>
        <CateringAutocompleteInput
          formattedAddress={formattedAddress}
          setCenter={setCenter}
          setAddress={(address) => dispatch(setAddress(address))}
        />
        <CateringAutocompleteButtons>
          <ButtonToggle
            onClick={() => selectServiceType('PICKUP')}
            disabled={serviceTypeDisabled}
          >
            Pickup
          </ButtonToggle>
          <ButtonToggle
            onClick={() => selectServiceType('DELIVERY')}
            disabled={serviceTypeDisabled}
          >
            Delivery
          </ButtonToggle>
        </CateringAutocompleteButtons>
        <CateringLoading>
          {disabled ? (
            <Loading
              color={theme.colors.light}
              text="Finding location nearest you..."
            />
          ) : error ? (
            <p>{error}</p>
          ) : null}
        </CateringLoading>
      </GoogleMap>
    </CateringAutocompleteView>
  )
}

CateringAutocomplete.displayName = 'CateringAutocomplete'
CateringAutocomplete.propTypes = {
  requestedAtStr: propTypes.string,
  clearTime: propTypes.func,
  selectServiceType: propTypes.func,
  disabled: propTypes.bool,
}
export default CateringAutocomplete
