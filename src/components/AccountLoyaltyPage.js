import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'

// import { selectAccountConfig } from '../slices'
import SectionFooter from './SectionFooter'
import PageTitle from './PageTitle'
import AccountBackground from './AccountBackground'
import AccountLoyalty from './AccountLoyalty'
import AccountThanx from './AccountThanx'
import { selectBrand } from '../slices'

const AccountLoyaltyPage = () => {
  const sectionRef = useRef()
  // const dispatch = useDispatch()
  const history = useHistory()
  // const {
  //   favorites: { title, subtitle, empty },
  // } = useSelector(selectAccountConfig)
  const { has_thanx } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  return auth ? (
    <>
      <AccountBackground />
      <div ref={sectionRef} className="content">
        <PageTitle
          title="Your Rewards"
          subtitle="Your current loyalty progress and any rewards you've earned"
        />
        <div className="section">
          <div className="container">
            <div className="section__container">
              {has_thanx ? <AccountThanx /> : <AccountLoyalty />}
              <SectionFooter>
                <Link to="/account">Head back to your account page</Link>
              </SectionFooter>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null
}

AccountLoyaltyPage.displayName = 'AccountLoyaltyPage'
export default AccountLoyaltyPage
