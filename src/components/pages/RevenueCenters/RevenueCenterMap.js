import styled from '@emotion/styled'
import { ClipLoader } from 'react-spinners'

const RevenueCenterMapView = styled('div')`
  position: fixed;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    bottom: 17.9rem;
  }
`

const RevenueCenterMapLoading = styled('div')`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RevenueCenterMap = ({ loading, mapRef }) => {
  return (
    <RevenueCenterMapView>
      {loading && (
        <RevenueCenterMapLoading>
          <ClipLoader size={30} loading={true} />
        </RevenueCenterMapLoading>
      )}
      <div ref={mapRef} style={{ height: '100%' }} />
    </RevenueCenterMapView>
  )
}

export default RevenueCenterMap
