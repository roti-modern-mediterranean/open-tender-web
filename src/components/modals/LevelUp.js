import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  addCustomerLevelUp,
  resetCustomerLevelUpError,
  selectCustomerLevelUp,
  selectCustomer,
} from '@open-tender/redux'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'
import { LevelUpForm } from '../forms'
import styled from '@emotion/styled'

const LevelUpContent = styled('div')`
  margin: 0 0 3rem;

  p {
    line-height: ${(props) => props.theme.lineHeight};

    span {
      font-weight: 600;
    }

    a {
      color: ${(props) => props.theme.colors.primary};
      font-weight: 600;

      &:hover,
      &:active,
      &:focus {
        color: ${(props) => props.theme.links.primary.hover};
      }
    }

    &:last-of-type {
      font-weight: 600;
    }
  }
`

const LevelUp = ({ windowRef, validate }) => {
  const dispatch = useDispatch()
  const { profile } = useSelector(selectCustomer)
  const email = profile ? profile.email || '' : ''
  const { loading, error } = useSelector(selectCustomerLevelUp)
  const connect = useCallback(
    (data, callback) => dispatch(addCustomerLevelUp(data, callback)),
    [dispatch]
  )
  const callback = useCallback(() => {
    if (validate) validate()
    dispatch(closeModal())
  }, [dispatch, validate])

  useEffect(() => {
    return () => dispatch(resetCustomerLevelUpError())
  }, [dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <ModalView>
      <ModalContent
        title="Connect your LevelUp account"
        subtitle={
          <p>
            Enter the email address and password associated with your LevelUp
            account
          </p>
        }
      >
        <LevelUpContent>
          <p>
            Don't have a LevelUp account?{' '}
            <a
              href="https://www.thelevelup.com/users/new"
              rel="noopener noreferrer"
              target="_blank"
            >
              Click here to create one.
            </a>
          </p>
          <p>
            Please update the email address below if you use a different email
            address with your LevelUp account.
          </p>
        </LevelUpContent>
        <LevelUpForm
          email={email}
          loading={loading}
          error={error}
          connect={connect}
          callback={callback}
        />
      </ModalContent>
    </ModalView>
  )
}

LevelUp.displayName = 'LevelUp'
LevelUp.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default LevelUp
