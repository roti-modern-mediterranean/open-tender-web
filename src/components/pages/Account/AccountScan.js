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
    padding: 0.8rem 1.5rem 0.8rem 1.3rem;
    border-width: ${(props) => props.theme.border.width};
    color: ${(props) => props.theme.colors.light};
    border-color: ${(props) => props.theme.colors.light};
    background-color: transparent;

    &:hover,
    &:active,
    &:focus {
      color: ${(props) => props.theme.colors.light};
      border-color: ${(props) => props.theme.colors.light};
      background-color: transparent;
    }
  }
`

const AccountScan = () => {
  const dispatch = useDispatch()
  const { has_pos } = useSelector(selectBrand)
  const { qrcode, loading, error } = useSelector(selectCustomerQRCode)
  const hasQRCode = has_pos && qrcode && !error && loading === 'idle'

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
              args: { src: qrcode, alt: 'Scan to sign in' },
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
