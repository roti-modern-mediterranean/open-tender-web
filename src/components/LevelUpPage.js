import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import {
  selectCustomer,
  selectLevelUp,
  fetchLevelUpCustomer,
  resetLevelUpCustomer,
} from '@open-tender/redux'

import { selectConfig, setGeoLatLng } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'

const LevelUpPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const config = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const { loading, error } = useSelector(selectLevelUp)
  let { token } = useParams()
  const query = new URLSearchParams(useLocation().search)
  token = token || query.get('user_token')
  const lat = query.get('latitude')
  const lng = query.get('longitude')

  useEffect(() => {
    window.scroll(0, 0)
    if (auth) {
      history.push('/account')
    } else if (token) {
      if (lat && lng) {
        const geoLatLng = { lat: parseFloat(lat), lng: parseFloat(lng) }
        dispatch(setGeoLatLng(geoLatLng))
      }
      dispatch(fetchLevelUpCustomer(token))
    } else {
      history.push('/')
    }
    return () => dispatch(resetLevelUpCustomer())
  }, [auth, token, lat, lng, history, dispatch])

  return (
    <>
      {isBrowser && <Background imageUrl={config.home.background} />}
      <div className="content">
        <PageTitle
          title="Retrieving your LevelUp account"
          subtitle="Please hang tight. This will only take a second."
        />
        <div className="section">
          <div className="container">
            <div className="section__container">
              <SectionLoading loading={loading === 'pending'} />
              <SectionError error={error} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

LevelUpPage.displayName = 'LevelUpPage'
export default LevelUpPage
