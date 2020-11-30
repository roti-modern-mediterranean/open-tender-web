import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCustomerThanx,
  resetCustomerThanx,
  selectCustomerThanx,
  logoutCustomer,
  addMessage,
} from '@open-tender/redux'

import { selectAccountConfig } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import ProgressBar from './ProgressBar'
import SectionEmpty from './SectionEmpty'

const defaultConfig = {
  title: 'Rewards',
  subtitle: 'Earn rewards & discounts with each purchase you make.',
  empty: "Looks like you haven't earned any rewards yet.",
}

const AccountThanx = () => {
  const dispatch = useDispatch()
  const { thanx: thanxConfig } = useSelector(selectAccountConfig)
  const { title, subtitle, empty } = thanxConfig || defaultConfig
  const { thanx, loading, error } = useSelector(selectCustomerThanx)
  const { progress, rewards } = thanx || {}
  const hasProgress = progress && progress.percentage
  const hasRewards = rewards && rewards.length > 0

  useEffect(() => {
    dispatch(fetchCustomerThanx())
    return () => dispatch(resetCustomerThanx())
  }, [dispatch])

  useEffect(() => {
    if (error === 'This customer does not have a connected Thanx account') {
      dispatch(logoutCustomer())
      dispatch(resetCustomerThanx())
      dispatch(addMessage('Please login to reauthenticate your account'))
    }
  }, [error, dispatch])

  return (
    <div id="rewards" className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={loading === 'pending'} />
          <SectionError error={error} />
          {hasProgress || hasRewards ? (
            <div className="section__content -max ot-bg-color-primary ot-border-radius">
              <div className="loyalty__program">
                {hasProgress && (
                  <>
                    <div className="loyalty__program__header">
                      <p className="ot-heading ot-font-size-h5">
                        Current Progress
                      </p>
                    </div>
                    <ProgressBar progress={parseInt(progress.percentage)} />
                    <p
                      className="ot-font-size-small"
                      style={{ margin: '1rem 0 0' }}
                    >
                      You're {parseInt(progress.percentage)}% of the way towards{' '}
                      {progress.towards}!
                    </p>
                  </>
                )}
              </div>
              {hasRewards && (
                <>
                  <div
                    className="loyalty__program__header"
                    style={{ margin: '3rem 0 0' }}
                  >
                    <p className="ot-heading ot-font-size-h5">Your Rewards</p>
                    <p className="ot-font-size-small">
                      You'll have the opportunity to redeem these on the
                      checkout page.
                    </p>
                  </div>
                  <div className="loyalty__program__rewards">
                    {rewards.map((reward) => {
                      return (
                        <div
                          key={reward.ext_id}
                          className="loyalty__program__reward"
                        >
                          <div className="loyalty__program__reward__container ot-bg-color-secondary">
                            <p className="ot-color-headings">{reward.name}</p>
                            {reward.description && (
                              <p className="ot-font-size-small">
                                {reward.description}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <SectionEmpty message={empty} />
          )}
        </div>
      </div>
    </div>
  )
}

AccountThanx.displayName = 'AccountThanx'
export default AccountThanx
