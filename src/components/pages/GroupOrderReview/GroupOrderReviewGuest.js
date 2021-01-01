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
} from '@open-tender/redux'
import { Message, CartItem, ButtonStyled } from '@open-tender/components'

import { selectConfig, selectDisplaySettings } from '../../../slices'
import iconMap from '../../iconMap'
import {
  Background,
  Container,
  Content,
  Loading,
  Main,
  OrderQuantity,
  PageTitle,
  PageContent,
  HeaderMobile,
} from '../..'
import { Menu, StartOver } from '../../buttons'
import styled from '@emotion/styled'

const CartTitle = styled('h2')`
  font-size: ${(props) => props.theme.fonts.sizes.h3};
  margin: 4rem 0 2rem;
`

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
  const displaySettings = useSelector(selectDisplaySettings)
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

  return (
    <>
      {isBrowser && <Background imageUrl={config.background} />}
      <Content maxWidth="76.8rem">
        <HeaderMobile
          title={isBrowser ? null : 'Join Group Order'}
          maxWidth="76.8rem"
          left={closed || error ? <StartOver /> : <Menu />}
          right={null}
        />
        <Main>
          <Container>
            <PageTitle title={config.title} subtitle={subtitle} />
            <PageContent>
              {isLoading ? (
                <Loading text="Submitting your order to the group..." />
              ) : (
                <>
                  {!error ? (
                    <p>
                      <Link to={menuSlug}>
                        Click here to head back to the menu and make changes to
                        your order.
                      </Link>
                    </p>
                  ) : cart.length ? (
                    <Message color="alert">
                      This group order was closed while you were making updates
                      on the menu page, but the items you previously submitted
                      are listed below. Please contact {firstName} if you need
                      to make any changes.
                    </Message>
                  ) : null}
                  <p>
                    Want to start a new order just for you? Use the button
                    below.
                  </p>
                  <p>
                    <ButtonStyled icon={iconMap.RefreshCw} onClick={startOver}>
                      Start A New Order
                    </ButtonStyled>
                  </p>
                  {cart.length > 0 && (
                    <>
                      <CartTitle>
                        Items submitted to {firstName}'s group order
                      </CartTitle>
                      <ul>
                        {cart.map((item, index) => {
                          return (
                            <li key={`${item.id}-${index}`}>
                              <CartItem
                                item={item}
                                showModifiers={true}
                                displaySettings={displaySettings}
                              >
                                <OrderQuantity item={item} show={false} />
                              </CartItem>
                            </li>
                          )
                        })}
                      </ul>
                    </>
                  )}
                </>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

GroupOrderReviewGuest.displayName = 'GroupOrderReviewGuest'
export default GroupOrderReviewGuest
