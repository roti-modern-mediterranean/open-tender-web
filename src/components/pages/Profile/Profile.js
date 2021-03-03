import React, { useCallback, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  fetchCustomer,
  updateCustomer,
  resetLoginError,
  sendCustomerVerificationEmail,
} from '@open-tender/redux'
import { ButtonLink, ProfileForm } from '@open-tender/components'
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
} from '../..'
import AccountTabs from '../Account/AccountTabs'
import styled from '@emotion/styled'

const VerifyAccount = styled('div')`
  margin: 0 0 ${(props) => props.theme.layout.padding};

  p {
    color: ${(props) => props.theme.colors.primary};
    line-height: ${(props) => props.theme.lineHeight};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const AccountProfile = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
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

  const verifyAccount = async () => {
    const linkUrl = `${window.location.origin}/verify`
    dispatch(sendCustomerVerificationEmail(linkUrl))
  }

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
                  {has_deals && !profile.is_verified && (
                    <VerifyAccount>
                      <p>
                        Your account has not yet been verified, which gives you
                        access to certain deals and rewards that are made
                        available only to verified accounts.{' '}
                        <ButtonLink onClick={verifyAccount}>
                          Click here to verify your account.
                        </ButtonLink>
                      </p>
                    </VerifyAccount>
                  )}
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
