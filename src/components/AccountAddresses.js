import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCustomerAddresses,
  selectCustomerAddresses,
} from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectAccountConfig } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import Addresses from './Addresses'
import SectionFooter from './SectionFooter'

const AccountAddresses = () => {
  const sectionRef = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    addresses: { title, subtitle },
  } = useSelector(selectAccountConfig)
  const { entities, loading, error } = useSelector(selectCustomerAddresses)
  const limit = 5

  useEffect(() => {
    dispatch(fetchCustomerAddresses(limit + 1))
  }, [dispatch])

  useEffect(() => {
    if (error) window.scrollTo(0, sectionRef.current.offsetTop)
  }, [error])

  const seeAll = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    history.push('/addresses')
  }

  return (
    <div
      id={slugify(title)}
      ref={sectionRef}
      className="section ot-bg-color-secondary"
    >
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={loading === 'pending'} />
          <SectionError error={error} />
          {entities.length > 0 && (
            <div className="section__content -max ot-bg-color-primary ot-border-radius">
              <Addresses
                addresses={entities}
                isLoading={loading === 'pending'}
              />
              {entities.length > limit ? (
                <SectionFooter>
                  <Button classes="ot-btn" onClick={seeAll}>
                    See all addresses
                  </Button>
                </SectionFooter>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

AccountAddresses.displayName = 'AccountAddresses'
export default AccountAddresses
