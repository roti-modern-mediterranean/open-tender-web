import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectCustomer,
  fetchCustomer,
  updateCustomer,
  resetLoginError,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'

import { maybeRefreshVersion } from '../../../app/version'
import {
  selectAccountConfig,
  selectBrand,
  selectOptIns,
  selectUpdateAccount,
} from '../../../slices'
import { AppContext } from '../../../App'
import {
  CheckoutHeader,
  Content,
  Loading,
  Main,
  PageContainer,
  VerifyAccount,
} from '../..'
import HeaderDefault from '../../HeaderDefault'
import { FormWrapper } from '../../inputs'
import { ProfileForm } from '../../forms'

const AccountProfile = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [submitted, setSubmitted] = useState(false)
  const { title: siteTitle } = useSelector(selectBrand)
  const updateAccount = useSelector(selectUpdateAccount)
  const account = useSelector(selectAccountConfig)
  const { title, subtitle } = account.profile
  const { profile, loading, error } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const update = useCallback(
    (data) => {
      dispatch(updateCustomer(data))
      setSubmitted(true)
    },
    [dispatch]
  )
  const optIns = useSelector(selectOptIns)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (error) {
      windowRef.current.scrollTop = 0
    } else if (submitted && !isLoading && updateAccount) {
      history.push('/checkout/details')
    }
  }, [error, windowRef, submitted, isLoading, updateAccount, history, dispatch])

  useEffect(() => {
    if (!customer_id) return history.push('/')
    dispatch(fetchCustomer())
    return () => dispatch(resetLoginError())
  }, [customer_id, dispatch, history])

  return (
    <>
      <Helmet>
        <title>
          {account.profile.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <CheckoutHeader title={title} />
            <FormWrapper>
              {subtitle && <p>{subtitle}</p>}
              {profile ? (
                <>
                  <VerifyAccount style={{ margin: '2rem 0 0' }} />
                  <ProfileForm
                    profile={profile}
                    loading={loading}
                    error={error}
                    update={update}
                    optIns={optIns}
                  />
                </>
              ) : isLoading ? (
                <Loading text="Retrieving your profile & preferences..." />
              ) : errMsg ? (
                <p>{errMsg}</p>
              ) : null}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountProfile.displayName = 'AccountProfile'
export default AccountProfile
