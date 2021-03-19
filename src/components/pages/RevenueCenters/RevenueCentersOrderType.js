import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, setOrderServiceType } from '@open-tender/redux'
import { ButtonStyled, Heading } from '@open-tender/components'

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
`

const RevenueCentersOrderTypeButton = styled('div')`
  width: 33.33333%;
  padding: 0 0.6rem;

  button,
  button:hover,
  button:active,
  button:focus {
    width: 100%;
    padding: 1.4rem 0 1.5rem;
    border-radius: ${(props) => props.theme.border.radius};
    background-color: ${(props) =>
      props.isActive ? props.theme.colors.secondary : props.theme.colors.light};
    border-color: ${(props) =>
      props.isActive ? props.theme.colors.secondary : props.theme.colors.light};
    box-shadow: ${(props) =>
      props.isActive ? 'none' : '0px 6px 20px rgba(0, 0, 0, 0.13)'};

    span {
      font-size: 1.4rem;
      font-weight: 600;
      color: ${(props) =>
        props.isActive
          ? props.theme.colors.light
          : props.theme.colors.secondary};
    }
  }
`

const RevenueCentersOrderType = ({ setActive }) => {
  const dispatch = useDispatch()
  const { orderType, serviceType } = useSelector(selectOrder)

  const setType = (orderType, serviceType) => {
    setActive(null)
    dispatch(setOrderServiceType(orderType, serviceType))
  }

  return (
    <RevenueCentersOrderTypeView>
      <RevenueCentersOrderTypeButtons>
        <RevenueCentersOrderTypeButton
          isActive={orderType === 'OLO' && serviceType === 'DELIVERY'}
        >
          <ButtonStyled onClick={() => setType('OLO', 'DELIVERY')}>
            <Heading>Delivery</Heading>
          </ButtonStyled>
        </RevenueCentersOrderTypeButton>
        <RevenueCentersOrderTypeButton
          isActive={orderType === 'OLO' && serviceType === 'PICKUP'}
        >
          <ButtonStyled onClick={() => setType('OLO', 'PICKUP')}>
            <Heading>Pickup</Heading>
          </ButtonStyled>
        </RevenueCentersOrderTypeButton>
        <RevenueCentersOrderTypeButton isActive={orderType === 'CATERING'}>
          <ButtonStyled onClick={() => setType('CATERING', 'DELIVERY')}>
            <Heading>Catering</Heading>
          </ButtonStyled>
        </RevenueCentersOrderTypeButton>
      </RevenueCentersOrderTypeButtons>
    </RevenueCentersOrderTypeView>
  )
}

RevenueCentersOrderType.displayName = 'RevenueCentersOrderType'
export default RevenueCentersOrderType
