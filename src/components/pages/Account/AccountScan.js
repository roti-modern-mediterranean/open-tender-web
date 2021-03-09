import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { fetchCustomerQRCode, selectCustomerQRCode } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { openModal, selectBrand } from '../../../slices'
import iconMap from '../../iconMap'

const AccountScanView = styled('div')`
  display: inline-block;
  opacity: 0;
  animation: slide-down 0.25s ease-in-out 0.125s forwards;

  button {
    padding: 0.6rem 1.3rem 0.6rem 1.1rem;
    border-width: 0.1rem;
    color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
    background-color: transparent;

    &:hover,
    &:active,
    &:focus {
      color: ${(props) => props.theme.colors.primary};
      border-color: ${(props) => props.theme.colors.primary};
      background-color: transparent;
    }
  }
`

const AccountScan = () => {
  const dispatch = useDispatch()
  const { has_pos } = useSelector(selectBrand)
  const { qrcode, loading, error } = useSelector(selectCustomerQRCode)
  const hasQRCode = has_pos && qrcode && !error && loading === 'idle'
  const src = qrcode
  const alt = 'Sign Into Your Account'
  const title = alt
  const alert = 'Only relevant for IN-STORE transactions'
  const footnote = "This is NOT required if you're paying with a credit card"

  useEffect(() => {
    if (has_pos) dispatch(fetchCustomerQRCode())
  }, [dispatch, has_pos])

  return hasQRCode ? (
    <AccountScanView>
      <ButtonStyled
        icon={iconMap.Grid}
        onClick={() =>
          dispatch(
            openModal({
              type: 'qrCode',
              args: { src, alt, title, alert, footnote },
            })
          )
        }
      >
        Scan
      </ButtonStyled>
    </AccountScanView>
  ) : null
}

AccountScan.displayName = 'Welcome'

export default AccountScan
