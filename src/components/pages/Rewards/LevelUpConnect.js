import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  selectCustomerLevelUp,
  removeCustomerLevelUp,
  fetchCustomerLevelUp,
  showNotification,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { openModal } from '../../../slices'
import { InlineLink, Loading } from '../..'
import { FormHeader, FormSubmit } from '../../inputs'

const LevelUpConnectView = styled('div')`
  p {
    line-height: ${(props) => props.theme.lineHeight};

    span {
      font-weight: 600;
    }

    a {
      color: ${(props) => props.theme.colors.primary};
      font-weight: 600;
    }
  }
`

const LevelUpConnect = () => {
  const [checking, setChecking] = useState(false)
  const dispatch = useDispatch()
  const { levelup, loading } = useSelector(selectCustomerLevelUp)
  const isLoading = loading === 'pending'
  const status = levelup ? levelup.status : null

  useEffect(() => {
    if (loading === 'idle' && checking) {
      const msg = status === 'PENDING' ? 'Still pending' : 'Account connected!'
      dispatch(showNotification(msg))
      setChecking(false)
    }
  }, [loading, status, checking, dispatch])

  const handleDisconnect = () => {
    dispatch(removeCustomerLevelUp(levelup.levelup_connect_id))
  }

  const handleConnect = () => {
    dispatch(openModal({ type: 'levelup' }))
  }

  const handleCheckStatus = () => {
    setChecking(true)
    dispatch(fetchCustomerLevelUp())
  }

  return (
    <LevelUpConnectView>
      {isLoading ? (
        <Loading text="Retrieving your LevelUp account status..." />
      ) : levelup ? (
        levelup.status === 'ACCEPTED' ? (
          <>
            <FormHeader style={{ margin: '0 0 1.5rem' }}>
              <h2>LevelUp Connected</h2>
            </FormHeader>
            <p>
              Your LevelUp account is currently connected via your{' '}
              <span>{levelup.email}</span> email address. If you need to change
              this, disconnect your account and then connect it again.
            </p>
            <FormSubmit style={{ margin: '1.5rem 0 0' }}>
              <ButtonStyled
                size="big"
                color="secondary"
                onClick={handleDisconnect}
                disabled={isLoading}
              >
                Disconnect
              </ButtonStyled>
            </FormSubmit>
          </>
        ) : (
          <>
            <FormHeader style={{ margin: '0 0 1.5rem' }}>
              <h2>Account Connection Pending</h2>
            </FormHeader>
            <p>
              A LevelUp connection request was sent to your{' '}
              <span>{levelup.email}</span> email address. Please check your
              inbox and accept the connection request, and then come back here
              (sometimes it can take a few minutes to receive an email from
              LevelUp).{' '}
            </p>
            <p>
              If you didn't receive an email from LevelUp or if the connection
              request expired, please use the button to the right to give it
              another try.
            </p>
            <p>
              Already accepted the connection request?{' '}
              <InlineLink onClick={handleCheckStatus} disabled={isLoading}>
                Click here to check your connection status.
              </InlineLink>
            </p>
            <FormSubmit style={{ margin: '1.5rem 0 0' }}>
              <ButtonStyled
                size="big"
                color="secondary"
                onClick={handleConnect}
                disabled={isLoading}
              >
                Connect Again
              </ButtonStyled>
            </FormSubmit>
          </>
        )
      ) : (
        <>
          <FormHeader style={{ margin: '0 0 1.5rem' }}>
            <h2>Connect your LevelUp account</h2>
          </FormHeader>
          <p>
            Click the button below to connect your LevelUp account to your Roti
            account. Don't have a LevelUp account?{' '}
            <a
              href="https://www.thelevelup.com/users/new"
              rel="noopener noreferrer"
              target="_blank"
            >
              Click here to create one.
            </a>
          </p>
          <FormSubmit style={{ margin: '1.5rem 0 0' }}>
            <ButtonStyled
              size="big"
              color="secondary"
              onClick={handleConnect}
              disabled={isLoading}
            >
              Connect
            </ButtonStyled>
          </FormSubmit>
        </>
      )}
    </LevelUpConnectView>
  )
}

LevelUpConnect.displayName = 'LevelUpConnect'
export default LevelUpConnect
