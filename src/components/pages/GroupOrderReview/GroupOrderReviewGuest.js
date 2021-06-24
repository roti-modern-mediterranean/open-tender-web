import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import styled from '@emotion/styled'
import {
  selectOrder,
  selectGroupOrder,
  resetGroupOrder,
  updateGroupOrder,
  reloadGuestOrder,
  resetOrder,
  selectMenuSlug,
  selectCartTotal,
} from '@open-tender/redux'
import { Message, ButtonStyled } from '@open-tender/components'

import { selectConfig } from '../../../slices'
import { Content, Header, Loading, Logo, Main, PageContainer } from '../..'
import { Back, NavMenu } from '../../buttons'
import CheckoutHeader from '../../CheckoutHeader'
import { FormWrapper } from '../../inputs'
import InlineLink from '../../InlineLink'
import CheckoutCartItem from '../CheckoutPayment/CheckoutCartItem'

const makeSubtitle = (error, cart, firstName, config) => {
  if (!error) {
    return config.subtitle
  } else {
    if (cart.length) {
      return 'This group order is now closed for editing, but the items below have been added.'
    } else {
      return `We're sorry, but this group order is already closed. Please contact ${firstName} to see if they can reopen it.`
    }
  }
}

const GroupOrderGuestGuestIntro = styled('div')`
  text-align: center;
  margin: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} 0 0;
  }

  p {
    margin: 1em 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const GroupOrderGuestGuestCart = styled('div')`
  margin: 0 auto;
  max-width: ${(props) => props.theme.breakpoints.tablet};
  padding: ${(props) => props.theme.layout.padding};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.light};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: ${(props) => props.theme.layout.paddingMobile};
    margin: 3rem auto;
  }

  & > div {
    border: 0;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.line};
    border-top-width: 0.1rem;
    padding-top: 1.1rem;
    margin-top: 0.6rem;

    &:first-of-type {
      border: 0;
      padding-top: 0.8rem;
      margin: 0;
    }

    &:last-of-type {
      span {
        font-weight: 500;
      }
    }
  }

  & > span + div {
    border: 0;
    padding-top: 0.8rem;
    margin: 0;
  }
`

const GroupOrderReviewGuest = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { groupOrders: config } = useSelector(selectConfig)
  const menuSlug = useSelector(selectMenuSlug)
  const { cart } = useSelector(selectOrder)
  const cartTotal = useSelector(selectCartTotal)
  const groupOrder = useSelector(selectGroupOrder)
  const {
    loading,
    error,
    cartOwner,
    cart: groupCart,
    cartGuest,
    closed,
  } = groupOrder
  const { cartGuestId } = cartGuest || {}
  const firstName = cartOwner ? cartOwner.first_name : ''
  const isLoading = loading === 'pending'
  const subtitle = makeSubtitle(error, groupCart, firstName, config)

  useEffect(() => {
    error ? dispatch(reloadGuestOrder()) : dispatch(updateGroupOrder())
  }, [dispatch, error, cartGuestId])

  const startOver = () => {
    dispatch(resetGroupOrder())
    dispatch(resetOrder())
    history.push('/')
  }

  const backToMenu = () => {
    history.push(menuSlug)
  }

  return (
    <>
      <Content>
        <Header
          left={
            closed || error ? (
              <NavMenu />
            ) : (
              <Back onClick={() => history.push(menuSlug)} />
            )
          }
          title={
            <Link to="/">
              <Logo />
            </Link>
          }
          right={null}
          bgColor={isBrowser ? 'dark' : 'primary'}
          borderColor={isBrowser ? 'dark' : 'primary'}
        />
        <Main>
          <PageContainer>
            <CheckoutHeader title={config.title} />
            <FormWrapper>
              {isLoading ? (
                <Loading text="Submitting your order to the group..." />
              ) : (
                <>
                  <GroupOrderGuestGuestIntro>
                    {subtitle && <p>{subtitle}</p>}
                    {!error ? (
                      <p>
                        <InlineLink onClick={backToMenu}>
                          Click here to head back to the menu and make changes
                          to your order.
                        </InlineLink>
                      </p>
                    ) : cart.length ? (
                      <Message color="alert">
                        This group order was closed while you were making
                        updates on the menu page, but the items you previously
                        submitted are listed below. Please contact {firstName}{' '}
                        if you need to make any changes.
                      </Message>
                    ) : null}
                    <p>
                      Want to start a new order just for you? Use the button
                      below.
                    </p>
                    <p>
                      <ButtonStyled onClick={startOver}>
                        Start A New Order
                      </ButtonStyled>
                    </p>
                  </GroupOrderGuestGuestIntro>
                  {cart.length > 0 && (
                    <GroupOrderGuestGuestCart>
                      {cart.map((item, index) => (
                        <CheckoutCartItem
                          key={`${item.id}-${index}`}
                          name={item.name}
                          quantity={item.quantity}
                          amount={item.totalPrice}
                        />
                      ))}
                      <CheckoutCartItem name="Cart Total" amount={cartTotal} />
                    </GroupOrderGuestGuestCart>
                  )}
                </>
              )}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

GroupOrderReviewGuest.displayName = 'GroupOrderReviewGuest'
export default GroupOrderReviewGuest
