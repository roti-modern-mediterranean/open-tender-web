import React, { useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import {
  selectCurrentItem,
  setCurrentItem,
  addItemToCart,
  selectSoldOut,
  selectSelectedAllergenNames,
  selectGroupOrder,
  selectMenuSlug,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectDisplaySettings } from '../../../slices'
import { AppContext } from '../../../App'
import { Builder, Content, Header, Logo, Main, ScreenreaderTitle } from '../..'
import { Back, Cart } from '../../buttons'

const MenuItem = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const item = useSelector(selectCurrentItem)
  const soldOut = useSelector(selectSoldOut)
  const allergens = useSelector(selectSelectedAllergenNames)
  const displaySettings = useSelector(selectDisplaySettings)
  const menuSlug = useSelector(selectMenuSlug)
  const { cartId } = useSelector(selectGroupOrder)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!item) history.push(menuSlug)
  }, [item, history, menuSlug])

  const cancel = () => {
    dispatch(setCurrentItem(null))
  }

  const addItem = (item) => {
    dispatch(addItemToCart(item))
    dispatch(setCurrentItem(null))
  }

  if (!item) return null

  return (
    <>
      <Helmet>
        <title>Menu | {item.name}</title>
      </Helmet>
      <Content hasFooter={false}>
        <Header
          bgColor={isBrowser ? 'dark' : 'transparent'}
          borderColor={isBrowser ? 'dark' : 'transparent'}
          style={isBrowser ? null : { position: 'absolute' }}
          title={
            isBrowser ? (
              <Link to="/">
                <Logo />
              </Link>
            ) : null
          }
          left={<Back text="Close item & return to menu" onClick={cancel} />}
          right={<Cart />}
        />
        <Main style={isBrowser ? null : { padding: '0' }}>
          <ScreenreaderTitle>Menu</ScreenreaderTitle>
          <Builder
            menuItem={item}
            addItemToCart={addItem}
            cancel={cancel}
            soldOut={soldOut}
            allergens={allergens}
            showImage={true}
            displaySettings={displaySettings}
            cartId={cartId}
            windowRef={windowRef}
          />
        </Main>
      </Content>
    </>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
