import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetCustomerOrder } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'
import styled from '@emotion/styled'

const ConfirmationLinksView = styled('div')`
  margin: -1rem 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: -1rem 0 1rem;
    text-align: center;
  }
`

const ConfirmationLinks = ({ auth, brand }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const reviewAccount = () => {
    dispatch(resetCustomerOrder())
    history.push('/')
  }

  return (
    <ConfirmationLinksView>
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
    </ConfirmationLinksView>
  )
}

ConfirmationLinks.displayName = 'ConfirmationLinks'
export default ConfirmationLinks
