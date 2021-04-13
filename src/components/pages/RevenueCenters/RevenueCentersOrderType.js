import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import {
  selectOrder,
  setOrderServiceType,
  resetOrderType,
} from '@open-tender/redux'

import { ButtonToggle } from '../../buttons'

const RevenueCentersOrderTypeView = styled('div')`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  height: 16rem;
  background: linear-gradient(
    0deg,
    rgba(212, 219, 228, 0) 0%,
    rgb(212, 219, 228) 100%
  );
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 12rem;
  }
`

const RevenueCentersOrderTypeButtons = styled('div')`
  width: 40rem;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 0 0.6rem;
  margin-top: 7.6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-top: 6.4rem;
  }

  & > div {
    width: 33.33333%;
    padding: 0 0.6rem;
  }
`

const RevenueCentersOrderType = ({ setActive }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { orderType, serviceType } = useSelector(selectOrder)

  const setType = (orderType, serviceType) => {
    setActive(null)
    dispatch(resetOrderType())
    dispatch(setOrderServiceType(orderType, serviceType))
    if (orderType === 'CATERING') {
      history.push('/catering')
    }
  }

  return (
    <RevenueCentersOrderTypeView>
      <RevenueCentersOrderTypeButtons>
        <ButtonToggle
          disabled={orderType === 'OLO' && serviceType === 'DELIVERY'}
          onClick={() => setType('OLO', 'DELIVERY')}
        >
          Delivery
        </ButtonToggle>
        <ButtonToggle
          disabled={orderType === 'OLO' && serviceType === 'PICKUP'}
          onClick={() => setType('OLO', 'PICKUP')}
        >
          Pickup
        </ButtonToggle>
        <ButtonToggle
          disabled={orderType === 'CATERING'}
          onClick={() => setType('CATERING', 'DELIVERY')}
        >
          Catering
        </ButtonToggle>
      </RevenueCentersOrderTypeButtons>
    </RevenueCentersOrderTypeView>
  )
}

RevenueCentersOrderType.displayName = 'RevenueCentersOrderType'
RevenueCentersOrderType.propTypes = {
  setActive: propTypes.func,
}

export default RevenueCentersOrderType
