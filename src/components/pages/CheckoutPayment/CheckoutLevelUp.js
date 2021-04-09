import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { checkAmountRemaining } from '@open-tender/js'
import { selectCheckout, selectCustomer, updateForm } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { FormHeader, FormSubmit } from '../../inputs'
import { useHistory } from 'react-router-dom'
import { InlineLink } from '../..'

const CheckoutLevelUpView = styled('div')`
  p {
    line-height: ${(props) => props.theme.lineHeight};

    span {
      font-weight: 600;
    }

    a {
      color: ${(props) => props.theme.colors.primary};
      font-weight: 600;
    }
  }
`

const CheckoutLevelUp = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { auth } = useSelector(selectCustomer)
  const { check, form } = useSelector(selectCheckout)
  const total = check.totals ? check.totals.total : 0.0
  const amount = checkAmountRemaining(total, form.tenders).toFixed(2)
  const levelup = check.customer.levelup || {}
  const applied =
    form.tenders.filter((i) => i.tender_type === 'LEVELUP').length > 0

  const apply = () => {
    const tender = { tender_type: 'LEVELUP', amount }
    dispatch(updateForm({ tenders: [tender] }))
  }

  const remove = () => {
    dispatch(updateForm({ tenders: [] }))
  }

  const goToAccount = () => {
    history.push('/credit-cards')
  }

  return levelup.connected ? (
    <CheckoutLevelUpView>
      <FormHeader style={{ margin: '0 0 1.5rem' }}>
        <h2>LevelUp Connected</h2>
      </FormHeader>
      <p>
        Your LevelUp account is currently connected via your{' '}
        <span>{levelup.email}</span> email address.
      </p>
      {!applied && (
        <p>
          You can change your connected account{' '}
          <InlineLink
            onClick={goToAccount}
            label="Go to account page to connect LevelUp"
          >
            from your account page
          </InlineLink>
          .
        </p>
      )}
      <FormSubmit style={{ margin: '1.5rem 0 0' }}>
        <ButtonStyled
          size="big"
          color="secondary"
          onClick={applied ? remove : apply}
        >
          {applied ? 'Remove' : 'Apply'}
        </ButtonStyled>
      </FormSubmit>
    </CheckoutLevelUpView>
  ) : auth ? (
    <CheckoutLevelUpView>
      <FormHeader>
        <h2>LevelUp Not Connected</h2>
      </FormHeader>
      <p>
        Your LevelUp account is not currently connected so you cannot use
        LevelUp for payment.
        <InlineLink
          onClick={goToAccount}
          label="Go to account page to connect LevelUp"
        >
          Click here to connect LevelUp
        </InlineLink>{' '}
        or{' '}
        <a
          href="https://www.thelevelup.com/users/new"
          rel="noopener noreferrer"
          target="_blank"
        >
          click here to create a LevelUp account
        </a>{' '}
        if you {"don't"} have one.
      </p>
    </CheckoutLevelUpView>
  ) : (
    <CheckoutLevelUpView>
      <FormHeader>
        <h2>Registration Required</h2>
      </FormHeader>
      <p>
        In order to pay with LevelUp, you must first create a Roti account and
        then connect your LevelUp account to your Roti account.{' '}
        <InlineLink onClick={() => history.push('/checkout/register')}>
          Click here to sign up for a Roti account.
        </InlineLink>
      </p>
    </CheckoutLevelUpView>
  )
}

export default CheckoutLevelUp
