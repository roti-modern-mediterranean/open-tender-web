import React, {
  useEffect,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  resetSignUp,
  selectMenuSlug,
  selectCartValidate,
  selectCheckout,
  validateOrder,
  updateForm,
} from '@open-tender/redux'
import { isEmpty, handleCheckoutErrors } from '@open-tender/js'
import {
  ButtonLink,
  ButtonSubmit,
  useCheckout,
  useCheckoutGuest,
} from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import { Content, Header, Main, PageContainer } from '../..'
import {
  ErrMsg,
  FormFooter,
  FormHeader,
  FormSubmit,
  FormWrapper,
  Input,
} from '../../inputs'
import { Lock, Mail, Phone, User } from '../../icons'
import { Back, Cart } from '../../buttons'

const iconMap = {
  first_name: <User />,
  last_name: <User />,
  email: <Mail />,
  password: <Lock />,
  phone: <Phone />,
  company: <User />,
}

const CheckoutGuest = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const submitRef = useRef(null)
  const [hasSubmit, setHasSubmit] = useState(false)
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const menuSlug = useSelector(selectMenuSlug)
  const { check, form, loading } = useSelector(selectCheckout)
  const errors = handleCheckoutErrors({ params: check.errors })
  const { fields, data, formErrors, handleChange } = useCheckoutGuest(
    check,
    form,
    errors
  )
  console.log('formErrors', formErrors)
  const emptyRequired =
    fields.filter((i) => i.required && !data[i.name]).length > 0
  const errMsg = !isEmpty(formErrors)
    ? 'There are one or more errors below'
    : null

  // validate cart whenever form.customer changes
  const cartValidate = useSelector(selectCartValidate)
  const validate = useCallback((order) => dispatch(validateOrder(order)), [
    dispatch,
  ])
  const cartWithCustomer = { ...cartValidate, customer: form.customer }
  useCheckout(validate, cartWithCustomer)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(resetSignUp())
    return () => dispatch(resetSignUp())
  }, [windowRef, dispatch])

  useEffect(() => {
    if (auth) {
      history.push('/checkout/details')
    }
  }, [auth, history])

  useEffect(() => {
    if (loading === 'idle') {
      if (errMsg) {
        windowRef.current.scrollTop = 0
      } else if (!emptyRequired && hasSubmit) {
        history.push('/checkout/details')
      }
    }
  }, [loading, errMsg, emptyRequired, history, windowRef, hasSubmit])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setHasSubmit(true)
    dispatch(updateForm({ customer: data }))
    submitRef.current.blur()
  }

  return (
    <>
      <Helmet>
        <title>Checkout Register | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header
          left={<Back onClick={() => history.push(menuSlug)} />}
          right={<Cart />}
        />
        <Main>
          <PageContainer style={{ marginTop: '0' }}>
            <FormWrapper>
              <FormHeader>
                <h1>Contact Info</h1>
                <p>The bare minimum we need in order to fulfill your order.</p>
              </FormHeader>
              <form id="signup-form" onSubmit={handleSubmit} noValidate>
                <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
                <div>
                  {fields.map((field) => (
                    <Input
                      key={field.name}
                      icon={iconMap[field.name]}
                      label={field.label}
                      name={`customer-${field.name}`}
                      type={field.type}
                      value={data[field.name]}
                      onChange={handleChange}
                      error={formErrors[field.name]}
                      required={field.required}
                      autoComplete={field.autoComplete}
                    />
                  ))}
                </div>
                <FormSubmit>
                  <ButtonSubmit
                    size="big"
                    color="secondary"
                    disabled={emptyRequired || loading === 'pending'}
                    submitRef={submitRef}
                  >
                    {loading === 'pending' ? 'Submitting...' : 'Submit'}
                  </ButtonSubmit>
                </FormSubmit>
              </form>
              <FormFooter>
                <p style={{ margin: '2rem 0' }}>
                  Already a member?{' '}
                  <ButtonLink onClick={() => history.push('/checkout/login')}>
                    Log In
                  </ButtonLink>
                </p>
              </FormFooter>
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CheckoutGuest.displayName = 'CheckoutGuest'
export default CheckoutGuest
