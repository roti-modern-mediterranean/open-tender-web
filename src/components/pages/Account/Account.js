import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { selectCustomer, fetchCustomer } from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import Background from '../../Background'
import AccountButtons from './AccountButtons'
import AccountWelcome from './AccountWelcome'
import Content from '../../Content'
import Main from '../../Main'
import HeaderMobile from '../../HeaderMobile'
import HeaderButton from '../../HeaderButton'
import { Menu } from 'react-feather'

// const AccountSection = ({ section }) => sections[section]

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { background, title } = accountConfig
  const { auth, profile } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!token) return history.push('/')
    dispatch(fetchCustomer({ token }))
  }, [token, dispatch, history])

  return profile ? (
    <>
      <Helmet>
        <title>Welcome Back | {siteTitle}</title>
      </Helmet>
      {isBrowser && <Background imageUrl={background} />}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor="transparent"
          maxWidth="76.8rem"
          left={
            <HeaderButton onClick={() => console.log('clicked')}>
              <Menu size={20} />
            </HeaderButton>
          }
        />
        <Main bgColor="secondary">
          <AccountWelcome>
            <AccountButtons />
          </AccountWelcome>
        </Main>
      </Content>
    </>
  ) : null
}

Account.displayName = 'Account'
export default Account
