import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer, updateCustomer } from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { ProfileForm } from '@open-tender/components'

import { selectAccountConfig, selectOptIns } from '../slices'
import SectionHeader from './SectionHeader'
import SectionError from './SectionError'
import SectionLoading from './SectionLoading'

const AccountProfile = () => {
  const dispatch = useDispatch()
  const {
    profile: { title, subtitle },
  } = useSelector(selectAccountConfig)
  const { profile, loading, error } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const update = useCallback((data) => dispatch(updateCustomer(data)), [
    dispatch,
  ])
  const optIns = useSelector(selectOptIns)

  return (
    <div id={slugify(title)} className="section ot-bg-color-secondary">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
          <SectionError error={errMsg} />
        </div>
        <div className="section__content -max ot-bg-color-primary ot-border-radius">
          <ProfileForm
            profile={profile}
            loading={loading}
            error={error}
            update={update}
            optIns={optIns}
          />
        </div>
      </div>
    </div>
  )
}

AccountProfile.displayName = 'AccountProfile'
export default AccountProfile
