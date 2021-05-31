import { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { setAddress, selectOrder } from '@open-tender/redux'
import { GoogleMap, GoogleMapsAutocomplete } from '@open-tender/components'

import { selectSettings } from '../../../slices'
import iconMap from '../../iconMap'

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

const CateringAutocompleteInput = ({
  maps,
  map,
  sessionToken,
  autocomplete,
  formattedAddress,
  setCenter,
  setAddress,
}) => (
  <GoogleMapsAutocomplete
    maps={maps}
    map={map}
    sessionToken={sessionToken}
    autocomplete={autocomplete}
    formattedAddress={formattedAddress}
    setCenter={setCenter}
    setAddress={setAddress}
    icon={iconMap.MapPin}
    placeholder="please enter your address"
  />
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
  width: 100%;
  height: 100%;
  padding: 2rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.colors.light};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
`

const CateringAutocomplete = () => {
  const dispatch = useDispatch()
  const { address } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const { googleMaps } = useSelector(selectSettings)
  const { apiKey, defaultCenter, zoom, styles } = googleMaps
  const [center, setCenter] = useState(defaultCenter)
  console.log(center)

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
