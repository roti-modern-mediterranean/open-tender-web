import React, { useCallback, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  fetchCustomer,
  updateCustomer,
  resetLoginError,
} from '@open-tender/redux'
import { ProfileForm } from '@open-tender/components'
import { Helmet } from 'react-helmet'

import { maybeRefreshVersion } from '../../../app/version'
import { selectAccountConfig, selectBrand, selectOptIns } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  FormWrapper,
  HeaderUser,
  Loading,
  Main,
  PageContent,
  PageTitle,
  VerifyAccount,
} from '../..'
import AccountTabs from '../Account/AccountTabs'

const AccountProfile = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const account = useSelector(selectAccountConfig)
  const { profile, loading, error } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const update = useCallback((data) => dispatch(updateCustomer(data)), [
    dispatch,
  ])
  const optIns = useSelector(selectOptIns)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

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
      <Background imageUrl={account.background} />
      <Content maxWidth="76.8rem">
        <HeaderUser
          title={isBrowser ? null : account.profile.title}
          maxWidth="76.8rem"
          bgColor="secondary"
          borderColor="secondary"
        />
        <Main bgColor="secondary">
          {!isBrowser && <AccountTabs />}
          <Container>
            <PageTitle {...account.profile} />
            <PageContent>
              {profile ? (
                <>
                  <VerifyAccount style={{ margin: '-1rem 0 3rem' }} />
                  <FormWrapper>
                    <ProfileForm
                      profile={profile}
                      loading={loading}
                      error={error}
                      update={update}
                      optIns={optIns}
                    />
                  </FormWrapper>
                </>
              ) : isLoading ? (
                <Loading text="Retrieving your profile & preferences..." />
              ) : errMsg ? (
                <p>{errMsg}</p>
              ) : null}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

AccountProfile.displayName = 'AccountProfile'
export default AccountProfile
