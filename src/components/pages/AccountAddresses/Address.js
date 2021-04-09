import propTypes from 'prop-types'
// import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  updateCustomerAddress,
  // removeCustomerAddress,
  // setAddress,
} from '@open-tender/redux'

import { Preface } from '@open-tender/components'

import { Checkmark, Edit } from '../../icons'
import { openModal } from '../../../slices'
// import { XCircle } from 'react-feather'

const AddressCheckmarkView = styled('button')`
  display: inline-block;
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.1rem 0 0;
  margin: 0 auto;
  border-radius: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 250ms ease;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.bgColors.primary};
  box-shadow: none;

  &:hover:enabled,
  &:active:enabled,
  &:focus:enabled {
    background-color: ${(props) => props.theme.colors.beet};
  }

  &:disabled {
    opacity: 1;
    background-color: ${(props) => props.theme.colors.beet};
    box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.25);
  }
`

const AddressCheckmark = ({ isDefault, makeDefault }) => {
  return (
    <AddressCheckmarkView disabled={isDefault} onClick={makeDefault}>
      <span>
        <Checkmark />
      </span>
    </AddressCheckmarkView>
  )
}

AddressCheckmark.displayName = 'AddressCheckmark'
AddressCheckmark.prototypes = {
  isDefault: propTypes.bool,
  makeDefault: propTypes.func,
}

const AddressView = styled('div')`
  display: flex;
  align-items: center;
  padding: 2rem 2rem 2rem 0;
  margin: 0 0 2rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const AddressDefault = styled('div')`
  flex: 1 0 5.2rem;
  min-width: 5.2rem;
  max-width: 8rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 5.2rem;
  }
`

const AddressContent = styled('div')`
  flex: 1 1 auto;
`

const AddressRow = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-size: 1.7rem;
    line-height: 1.35;
  }
`

const AddressTitle = styled(Preface)`
  font-size: 2.2rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  // margin: 0 0 0.1rem;
`

const AddressActions = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const AddressButton = styled('button')`
  display: block;
  margin: 0 0 0 1rem;
`

// const CloseContainer = styled('span')`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 1.6rem;
//   height: 1.6rem;
//   border-radius: 0.8rem;
//   border: 0.1rem solid ${(props) => props.theme.colors.primary};
// `

const Address = ({ address, isLoading }) => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const {
    description,
    company,
    street,
    unit,
    city,
    state,
    postal_code,
    is_default,
  } = address

  const makeDefault = (evt) => {
    evt.preventDefault()
    const data = { ...address, is_default: true }
    const addressId = address.customer_address_id
    delete data.customer_address_id
    delete data.created_at
    delete data.last_used_at
    dispatch(updateCustomerAddress(addressId, data))
    evt.target.blur()
  }

  const edit = (evt, address) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'address', args: { address } }))
    evt.target.blur()
  }

  // const remove = (evt, address) => {
  //   evt.preventDefault()
  //   const addressId = address.customer_address_id
  //   dispatch(removeCustomerAddress(addressId))
  //   evt.target.blur()
  // }

  // const reorder = (address) => {
  //   dispatch(setAddress(address))
  //   history.push('/locations')
  // }

  return (
    <AddressView>
      <AddressDefault>
        <AddressCheckmark isDefault={is_default} makeDefault={makeDefault} />
      </AddressDefault>
      <AddressContent>
        <AddressRow>
          <div>
            <AddressTitle as="h2">
              {description ? `"${description}"` : company || street}
            </AddressTitle>
          </div>
          <AddressActions>
            <AddressButton
              onClick={(evt) => edit(evt, address)}
              disabled={isLoading}
            >
              <Edit />
            </AddressButton>
            {/* <AddressButton
              onClick={(evt) => remove(evt, address)}
              disabled={isLoading}
            >
              <XCircle size={16} />
            </AddressButton> */}
            {/* <AddressButton
              onClick={(evt) => reorder(evt, address)}
              disabled={isLoading}
            >
              <CartEmpty size="1.6rem" />
            </AddressButton> */}
          </AddressActions>
        </AddressRow>
        <AddressRow>
          <p>{street}</p>
          <p>{postal_code}</p>
        </AddressRow>
        <AddressRow>
          <p>{unit}</p>
          <p>
            {city}, {state}
          </p>
        </AddressRow>
      </AddressContent>
    </AddressView>
  )
}

Address.displayName = 'Address'
Address.prototypes = {
  address: propTypes.object,
  isLoading: propTypes.bool,
}

export default Address
