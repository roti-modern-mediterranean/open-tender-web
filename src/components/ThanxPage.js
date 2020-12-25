import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import {
  selectCustomer,
  // resetCustomer,
  authCustomerThanx,
} from '@open-tender/redux'

import { selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'

const ThanxPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const config = useSelector(selectConfig)
  const { auth, loading, error } = useSelector(selectCustomer)
  const query = new URLSearchParams(useLocation().search)
  const code = query.get('code')

  useEffect(() => {
    window.scroll(0, 0)
    if (auth) {
      history.push('/account')
    } else if (code) {
      dispatch(authCustomerThanx(code))
    } else {
      history.push('/')
    }
  }, [auth, code, history, dispatch])

  // useEffect(() => {
  //   return () => dispatch(resetCustomer())
  // }, [dispatch])

  return (
    <>
      {isBrowser && <Background imageUrl={config.home.background} />}
      <div className="content">
        <PageTitle
          title={error ? 'Something went wrong' : 'Retrieving your account'}
          subtitle={
            error
              ? 'Please see the error message below and use the Login link to try again'
              : 'Please hang tight. This will only take a second.'
          }
        />
        <div className="section">
          <div className="container">
            <div className="section__container">
              <SectionLoading loading={loading === 'pending'} />
              <SectionError error={error} />
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ThanxPage.displayName = 'ThanxPage'
export default ThanxPage
