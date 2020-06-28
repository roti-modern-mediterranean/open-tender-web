import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { slugify } from 'open-tender-js'
import { selectAccountConfigSections } from '../slices/configSlice'
import {
  selectCustomerHouseAccounts,
  selectToken,
  fetchCustomerHouseAccounts,
} from '../slices/customerSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionRow from './SectionRow'
import SectionEmpty from './SectionEmpty'
import { orderTypeNamesMap, serviceTypeNamesMap } from 'open-tender-js'

const AccountHouseAccounts = () => {
  const dispatch = useDispatch()
  const {
    houseAccounts: { title, subtitle, empty },
  } = useSelector(selectAccountConfigSections)
  const token = useSelector(selectToken)
  const houseAccounts = useSelector(selectCustomerHouseAccounts)
  const isLoading = houseAccounts.loading === 'pending'
  const error = houseAccounts.error
  const showGiftCards = houseAccounts.entities.length

  useEffect(() => {
    dispatch(fetchCustomerHouseAccounts(token))
  }, [dispatch, token])

  return (
    <div id={slugify(title)} className="section container ot-section">
      <div className="section__container">
        <SectionHeader title={title} subtitle={subtitle} />
        <SectionLoading loading={isLoading} />
        <SectionError error={error} />
        {showGiftCards ? (
          <div className="section__content bg-color border-radius">
            <div className="section__rows">
              {houseAccounts.entities.map((houseAccount) => {
                const orderType =
                  orderTypeNamesMap[houseAccount.revenue_center_type]
                const orderTypes = orderType
                  ? `${orderType} orders`
                  : 'all order types'
                const serviceType =
                  serviceTypeNamesMap[houseAccount.service_type]
                const serviceTypes = serviceType
                  ? `the ${serviceType} service type`
                  : 'all service types'
                return (
                  <SectionRow
                    key={houseAccount.house_account_id}
                    title={houseAccount.pin}
                  >
                    <div className="section__row__container">
                      <div className="section__row__container__content">
                        <p>{houseAccount.name}</p>
                        <p className="font-size-small secondary-color">
                          {houseAccount.approved_contact
                            ? 'Your account has been specifically approved for this house account'
                            : `This house account is approved for all email addresses ending in ${houseAccount.domain}`}
                        </p>
                        <p className="font-size-small secondary-color">
                          Approved for <span className="">{orderTypes}</span>{' '}
                          and <span className="">{serviceTypes}</span>
                        </p>
                      </div>
                    </div>
                  </SectionRow>
                )
              })}
            </div>
          </div>
        ) : (
          <SectionEmpty message={empty} />
        )}
      </div>
    </div>
  )
}

AccountHouseAccounts.displayName = 'AccountHouseAccounts'
export default AccountHouseAccounts
