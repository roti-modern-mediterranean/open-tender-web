import { useEffect } from 'react'
import { useTheme } from '@emotion/react'
// import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerHouseAccounts,
  selectCustomerHouseAccounts,
} from '@open-tender/redux'

import { HouseAccounts, Loading } from '../..'
import { ErrMsg } from '../../inputs'

const PaymentHouseAccounts = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { entities, loading, error } = useSelector(selectCustomerHouseAccounts)

  useEffect(() => {
    dispatch(fetchCustomerHouseAccounts())
  }, [dispatch])

  return (
    <div>
      {error ? (
        <ErrMsg errMsg={error} />
      ) : loading === 'pending' ? (
        <Loading type="Puff" size={60} color={theme.colors.light} />
      ) : (
        <HouseAccounts houseAccounts={entities} />
      )}
    </div>
  )
}

PaymentHouseAccounts.displayName = 'PaymentHouseAccounts'
PaymentHouseAccounts.propTypes = {}

export default PaymentHouseAccounts
