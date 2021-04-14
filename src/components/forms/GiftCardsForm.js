import React, { useMemo } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
// import ReCAPTCHA from 'react-google-recaptcha'
import {
  ButtonStyled,
  ButtonSubmit,
  useGiftCardsForm,
} from '@open-tender/components'
import {
  ErrMsg,
  FormHeader,
  FormSubmit,
  Input,
  Quantity,
  Select,
} from '../inputs'
import { CreditCards } from '..'
import { CreditCardInputs } from '.'
import { Mail, User } from '../icons'

// import { CreditCardInputs } from '..'
// import { ButtonStyled, ButtonSubmit, Input } from '../..'

const GiftCardsView = styled('div')`
  margin: 0 0 3rem;
`

const GiftCardsTable = styled('div')`
  padding: 2rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.light};
`

const GiftCardsRow = styled('span')`
  display: block;
  width: 100%;
  margin: 0 0 2rem;

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > span {
      &:first-of-type {
        flex: 0 0 12rem;
        margin: 0 1rem 0 0;
        @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
          flex: 0 0 8rem;
        }
      }

      &:last-of-type {
        flex-grow: 1;
        margin: 0 0 0 1rem;
      }
    }
  }
`

const GiftCardsForm = ({
  purchase,
  reset,
  loading,
  error,
  success,
  purchasedCards,
  setAlert,
  iconMap,
  windowRef,
  customer = {},
  creditCards = [],
  recaptchaKey = null,
}) => {
  const amounts = ['10.00', '25.00', '50.00', '100.00', '500.00']
  const options = amounts.map((i) => ({
    name: `$${parseFloat(i).toFixed(0)}`,
    value: i,
  }))
  const initState = { amount: '10.00', quantity: 1, email: '' }
  const {
    formRef,
    inputRef,
    submitRef,
    recaptchaRef,
    cardType,
    setCardType,
    creditCardOptions,
    handleName,
    handleEmail,
    handleChange,
    handleQuantity,
    handleAddAnother,
    handleCreditCard,
    handleSubmit,
    handleReset,
    name,
    email,
    cards,
    isNewCard,
    creditCard,
    setCreditCard,
    errors,
    submitting,
  } = useGiftCardsForm(
    purchase,
    reset,
    loading,
    error,
    success,
    purchasedCards,
    setAlert,
    iconMap,
    windowRef,
    customer,
    creditCards,
    recaptchaKey,
    initState
  )
  const errMsg =
    errors.form && errors.form.includes('parameters')
      ? 'There are one or more errors below'
      : errors.form || null
  const newCardErrors = useMemo(
    () =>
      errors
        ? Object.entries(errors)
            .filter(([key]) => key !== 'form')
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
        : {},
    [errors]
  )

  return success ? (
    <>
      <FormHeader>
        <h2>
          Success! Please check your email for your receipt and assigned gift
          cards.
        </h2>
        <p>Below is the list of gift cards you purchased.</p>
      </FormHeader>
      {purchasedCards && (
        <GiftCardsTable>
          <table>
            <thead>
              <tr>
                <th>Card Number</th>
                <th>Recipient</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {purchasedCards.map((i) => (
                <tr key={i.card_number}>
                  <td>{i.card_number}</td>
                  <td>{i.email || 'none'}</td>
                  <td>${i.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GiftCardsTable>
      )}
      <FormSubmit>
        <ButtonStyled size="big" color="secondary" onClick={handleReset}>
          Purchase More Gift Cards
        </ButtonStyled>
      </FormSubmit>
    </>
  ) : (
    <>
      <form
        id="gift-cards-form"
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
      >
        <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
        {!customer && (
          <>
            <FormHeader>
              <h2>Enter your name and email address</h2>
              <p style={{ marginBottom: '0' }}>
                We'll send a receipt and your purchased gift card numbers to the
                email address you enter below.
              </p>
            </FormHeader>
            <div>
              <Input
                ref={inputRef}
                icon={<User />}
                label="Your Name"
                name="name"
                type="text"
                value={name}
                onChange={handleName}
                error={errors.name}
                required={true}
              />
              <Input
                icon={<Mail />}
                label="Your Email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmail}
                error={errors.email}
                required={true}
              />
            </div>
          </>
        )}
        <>
          <FormHeader style={{ margin: '4rem 0 3rem' }}>
            <h2>Add your gift cards</h2>
            <p>
              You can purchase one or more gift cards and optionally enter an
              email address to gift the gift card to someone else (the recipient
              will receive an email notification, and the card will
              automatically be added to their account if they have one or create
              a new one).
            </p>
          </FormHeader>
          <GiftCardsView>
            {cards.map((card, index) => (
              <GiftCardsRow key={`card-${index}`}>
                <div>
                  <Select
                    label={`Gift card ${index} amount`}
                    name={`amount-${index}`}
                    value={card.amount}
                    onChange={handleChange}
                    error={errors[`amount-${index}`]}
                    required={true}
                    options={options}
                  />
                  <Quantity
                    id={`gift-card-quantity-${index}`}
                    name={`Gift card ${index}`}
                    quantity={card.quantity}
                    update={(quantity) => handleQuantity(index, quantity)}
                    iconMap={iconMap}
                  />
                  <span>
                    <input
                      aria-label={`Gift card ${index} email recipient`}
                      id={`email-${index}`}
                      name={`email-${index}`}
                      type="email"
                      autoComplete={null}
                      value={card.email}
                      placeholder="enter email address (optional)"
                      disabled={submitting}
                      onChange={handleChange}
                    />
                  </span>
                </div>
                <ErrMsg
                  errMsg={errors[`gift_cards.${index}.email`]}
                  // style={{ margin: '0 0 2rem' }}
                />
              </GiftCardsRow>
            ))}
            <div>
              <ButtonStyled
                onClick={handleAddAnother}
                disabled={submitting}
                color="secondary"
              >
                Add Another
              </ButtonStyled>
            </div>
          </GiftCardsView>
        </>
        {creditCards.length ? (
          <>
            <FormHeader>
              <h2>Add your payment information</h2>
              <p>
                Choose an existing credit card or add new one from your account
                page.
              </p>
            </FormHeader>
            {/* <div>
                <Select
                  label="Choose Card"
                  name="credit_card"
                  value={creditCard.customer_card_id}
                  onChange={handleCreditCard}
                  error={errors.credit_card}
                  required={true}
                  options={creditCardOptions}
                />
              </div> */}
            <CreditCards
              creditCards={creditCards}
              selectedId={creditCard}
              apply={handleCreditCard}
            />
          </>
        ) : (
          <>
            <FormHeader>
              <h2>Add your payment information</h2>
              <p>Please enter your payment info below.</p>
            </FormHeader>
            <CreditCardInputs
              data={creditCard}
              update={setCreditCard}
              cardType={cardType}
              setCardType={setCardType}
              errors={newCardErrors}
            />
          </>
        )}
        {/* {recaptchaKey && (
            <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaKey} />
          )} */}
        <FormSubmit>
          <ButtonSubmit
            size="big"
            color="secondary"
            submitRef={submitRef}
            submitting={submitting}
          >
            {submitting ? 'Submitting...' : 'Purchase Gift Cards'}
          </ButtonSubmit>
        </FormSubmit>
      </form>
    </>
  )
}

GiftCardsForm.displayName = 'GiftCardsForm'
GiftCardsForm.propTypes = {
  purchase: propTypes.func,
  setAlert: propTypes.func,
  reset: propTypes.func,
  loading: propTypes.string,
  error: propTypes.object,
  success: propTypes.bool,
  purchasedCards: propTypes.array,
  iconMap: propTypes.object,
  customer: propTypes.object,
  creditCards: propTypes.array,
  windowRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
  recaptchaKey: propTypes.string,
}

export default GiftCardsForm
