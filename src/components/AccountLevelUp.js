import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerLevelUp,
  removeCustomerLevelUp,
  fetchCustomerLevelUp,
  showNotification,
} from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectAccountConfig, openModal } from '../slices'
import iconMap from './iconMap'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionRow from './SectionRow'
import SectionEmpty from './SectionEmpty'
import SectionFooter from './SectionFooter'

const AccountLevelUp = () => {
  const [checking, setChecking] = useState(false)
  const dispatch = useDispatch()
  const {
    levelup: { title, subtitle, empty },
  } = useSelector(selectAccountConfig)
  const { levelup, loading, error } = useSelector(selectCustomerLevelUp)
  const isLoading = loading === 'pending'
  const status = levelup ? levelup.status : null

  useEffect(() => {
    if (loading === 'idle' && checking) {
      const msg = status === 'PENDING' ? 'Still pending' : 'Account connected!'
      dispatch(showNotification(msg))
      setChecking(false)
    }
  }, [loading, status, checking, dispatch])

  const handleDisconnect = (evt) => {
    evt.preventDefault()
    dispatch(removeCustomerLevelUp(levelup.levelup_connect_id))
    evt.target.blur()
  }

  const handleConnect = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'levelup' }))
    evt.target.blur()
  }

  const handleCheckStatus = (evt) => {
    evt.preventDefault()
    setChecking(true)
    dispatch(fetchCustomerLevelUp())
    evt.target.blur()
  }

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={levelup ? subtitle : empty} />
          <SectionLoading loading={isLoading} />
          <SectionError error={error} />
          {levelup ? (
            <div className="section__content ot-bg-color-primary ot-border-radius">
              <div className="section__rows">
                <SectionRow
                  title={
                    levelup.status === 'ACCEPTED' ? 'Connected' : 'Pending'
                  }
                >
                  {levelup.status === 'ACCEPTED' ? (
                    <div className="section__row__container ot-line-height">
                      <div className="section__row__container__content">
                        <p className="ot-color-success">Account connected!</p>
                        <p className="ot-font-size-small">
                          Your LevelUp account is currently connected via your{' '}
                          <span className="ot-color-headings ot-bold">
                            {levelup.email}
                          </span>{' '}
                          email address. If you need to change this, disconnect
                          your account and then connect it again.
                        </p>
                      </div>
                      <div className="section__row__container__buttons">
                        <Button
                          text="Disconnect"
                          icon={iconMap['XCircle']}
                          onClick={handleDisconnect}
                          classes="ot-btn--small ot-font-size-small"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="section__row__container ot-line-height">
                      <div className="section__row__container__content">
                        <p className="ot-color-headings">
                          Account Connection Pending
                        </p>
                        <p className="ot-font-size-small">
                          A LevelUp connection request was sent to your{' '}
                          <span className="ot-color-headings ot-bold">
                            {levelup.email}
                          </span>{' '}
                          email address. Please check your inbox and accept the
                          connection request, and then come back here (sometimes
                          it can take a few minutes to receive an email from
                          LevelUp).{' '}
                          <span className="ot-color-alert">
                            If you didn't receive an email from LevelUp or if
                            the connection request expired, please use the
                            button to the right to give it another try.
                          </span>
                        </p>
                        <p className="ot-font-size-small">
                          Already accepted the connection request?{' '}
                          <Button
                            text="Click here to check your connection status."
                            onClick={handleCheckStatus}
                            classes="ot-btn-link ot-font-size-small"
                            disabled={isLoading}
                          />
                        </p>
                      </div>
                      <div className="section__row__container__buttons">
                        <Button
                          text="Connect Again"
                          icon={iconMap['RefreshCw']}
                          onClick={handleConnect}
                          classes="ot-btn--small ot-font-size-small"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  )}
                </SectionRow>
              </div>
            </div>
          ) : (
            <>
              <Button
                text="Connect your LevelUp account"
                icon={iconMap['Link']}
                onClick={handleConnect}
                classes="ot-btn-link"
              />
              <SectionFooter>
                <p>
                  Don't have a LevelUp account?{' '}
                  <a
                    className="no-link"
                    href="https://www.thelevelup.com/users/new"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Click here to create one.
                  </a>
                </p>
              </SectionFooter>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

AccountLevelUp.displayName = 'AccountLevelUp'
export default AccountLevelUp
