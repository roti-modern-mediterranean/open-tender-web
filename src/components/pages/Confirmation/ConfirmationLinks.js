import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetCustomerOrder } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'

const ConfirmationLinks = ({ auth, brand }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const reviewAccount = () => {
    dispatch(resetCustomerOrder())
    history.push('/')
  }

  return (
    <div>
      <p>
        {auth ? (
          <ButtonLink onClick={reviewAccount}>
            Head back to your account
          </ButtonLink>
        ) : (
          <a href={brand.url} rel="noopener noreferrer">
            Head back to our website
          </a>
        )}
        {' or '}
        <ButtonLink onClick={() => history.push('/')}>
          start another order
        </ButtonLink>
      </p>
    </div>
  )
}

ConfirmationLinks.displayName = 'ConfirmationLinks'
export default ConfirmationLinks
