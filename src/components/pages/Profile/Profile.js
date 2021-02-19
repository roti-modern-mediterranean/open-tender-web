import React, { useCallback, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
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
  HeaderAccount,
  Loading,
  Main,
  PageTitle,
  PageContent,
} from '../..'

const AccountProfile = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const account = useSelector(selectAccountConfig)
  const { auth, profile, loading, error } = useSelector(selectCustomer)
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
    if (!auth) return history.push('/')
    return () => dispatch(resetLoginError())
  }, [auth, dispatch, history])

  return (
    <>
      <Helmet>
        <title>
          {account.profile.title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={account.background} />
      <Content maxWidth="76.8rem">
        <HeaderAccount
          title={isBrowser ? null : account.profile.title}
          maxWidth="76.8rem"
          text="Back to Account"
          path="/account/settings"
          bgColor="secondary"
          borderColor="secondary"
        />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...account.profile} />
            <PageContent>
              {profile ? (
                <FormWrapper>
                  <ProfileForm
                    profile={profile}
                    loading={loading}
                    error={error}
                    update={update}
                    optIns={optIns}
                  />
                </FormWrapper>
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
