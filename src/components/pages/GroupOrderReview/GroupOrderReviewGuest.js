import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
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
import { GroupOrderReviewIntro, GroupOrderReviewCart } from './GroupOrderReview'

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
                  <GroupOrderReviewIntro>
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
                  </GroupOrderReviewIntro>
                  {cart.length > 0 && (
                    <GroupOrderReviewCart>
                      <div>
                        <CheckoutCartItem name="Your Items" />
                        {cart.map((item, index) => (
                          <CheckoutCartItem
                            key={`${item.id}-${index}`}
                            name={item.name}
                            quantity={item.quantity}
                            amount={item.totalPrice}
                          />
                        ))}
                        <CheckoutCartItem
                          name="Cart Total"
                          amount={cartTotal}
                        />
                      </div>
                    </GroupOrderReviewCart>
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
