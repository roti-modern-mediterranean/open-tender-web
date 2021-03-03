import React, { useEffect, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  verifyAccount,
  selectVerifyAccount,
  sendCustomerVerificationEmail,
} from '@open-tender/redux'
import { ButtonLink, Text } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageTitle,
  PageContent,
} from '../..'

const VerifyAccount = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { hash } = useLocation()
  const verifyToken = hash.includes('#') ? hash.split('#')[1] : ''
  const { auth } = useSelector(selectCustomer)
  const { account: config } = useSelector(selectConfig)
  const title = 'Verify Account'
  const { title: siteTitle } = useSelector(selectBrand)
  const { success, loading, error } = useSelector(selectVerifyAccount)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!verifyToken) {
      return history.push('/')
    } else {
      dispatch(verifyAccount(verifyToken))
    }
  }, [verifyToken, history, dispatch])

  const retryVerifyAccount = async () => {
    const linkUrl = `${window.location.origin}/verify`
    dispatch(sendCustomerVerificationEmail(linkUrl))
  }

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={config.background} />
      <Content maxWidth="76.8rem">
        <HeaderDefault
          title={isBrowser ? null : title}
          bgColor="secondary"
          borderColor="secondary"
        />
        <Main bgColor="secondary">
          <Container>
            {success ? (
              <>
                <PageTitle
                  title="Success! Your account has been verified."
                  subtitle="Please head back to your account or close this page and pick up where you left off."
                />
                <PageContent>
                  <div>
                    <p>
                      <ButtonLink onClick={() => history.push('/')}>
                        {auth
                          ? 'Head back to your account'
                          : 'Head back to the home page'}
                      </ButtonLink>
                    </p>
                  </div>
                </PageContent>
              </>
            ) : error ? (
              <>
                <PageTitle
                  title="Something went wrong"
                  subtitle="Please review the error message below."
                />
                <PageContent>
                  <Text color="error" as="p">
                    {error}.
                  </Text>
                  <p>
                    {auth ? (
                      <ButtonLink onClick={retryVerifyAccount}>
                        Click here to give it another try.
                      </ButtonLink>
                    ) : (
                      'Log into your account and visit your profile page to give it another try.'
                    )}
                  </p>
                </PageContent>
              </>
            ) : loading === 'pending' ? (
              <Loading text="Verifying your account. Please sit tight." />
            ) : null}
          </Container>
        </Main>
      </Content>
    </>
  )
}

VerifyAccount.displayName = 'VerifyAccount'
export default VerifyAccount
