import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { selectBrand, selectConfig } from '../../../slices'
import { AppContext } from '../../../App'
import { Background, Content, HeaderMobile, Main, Welcome } from '../..'
import AccountSettingsButtons from './AccountSettingsButtons'
import { AccountBack, Logout } from '../../buttons'
import iconMap from '../../iconMap'

const AccountSettings = () => {
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { background } = accountConfig
  const { auth, profile } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  return profile ? (
    <>
      <Helmet>
        <title>Account Settings | {siteTitle}</title>
      </Helmet>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        <HeaderMobile
          maxWidth="76.8rem"
          bgColor={isBrowser ? 'primary' : 'transparent'}
          borderColor={isBrowser ? 'primary' : 'transparent'}
          left={<AccountBack color="light" />}
          right={<Logout color="light" />}
        />
        <Main padding="0" imageUrl={background}>
          <Welcome
            header={<h1>Account Settings</h1>}
            content={
              <ButtonStyled
                icon={iconMap.ArrowLeft}
                onClick={() => history.push('/account')}
                size="small"
              >
                Back to Account page
              </ButtonStyled>
            }
          >
            <AccountSettingsButtons />
          </Welcome>
        </Main>
      </Content>
    </>
  ) : null
}

AccountSettings.displayName = 'AccountSettings'
export default AccountSettings
