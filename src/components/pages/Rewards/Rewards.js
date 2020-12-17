import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'

import SectionFooter from '../../SectionFooter'
import PageTitle from '../../PageTitle'
import AccountLoyalty from '../../AccountLoyalty'
import AccountThanx from '../../AccountThanx'
import { selectBrand, selectConfig } from '../../../slices'
import { Background, Content, HeaderButton, HeaderMobile, Main } from '../..'
import { ChevronLeft } from 'react-feather'

const Rewards = () => {
  const history = useHistory()
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { background } = accountConfig
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  return auth ? (
    <>
      <Helmet>
        <title>Rewards | {siteTitle}</title>
      </Helmet>
      {isBrowser && <Background imageUrl={background} />}
      {/* <AccountBackground /> */}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          bgColor="transparent"
          maxWidth="76.8rem"
          left={
            <HeaderButton onClick={() => history.push('/account')}>
              <ChevronLeft size={20} />
            </HeaderButton>
          }
          title="Rewards"
        />
        <Main>
          <PageTitle
            title="Your Rewards"
            subtitle="Your current loyalty progress and any rewards you've earned"
          />
          {has_thanx ? <AccountThanx /> : <AccountLoyalty />}
          <SectionFooter>
            <Link to="/account">Head back to your account page</Link>
          </SectionFooter>
        </Main>
      </Content>
    </>
  ) : null
}

Rewards.displayName = 'Rewards'
export default Rewards
