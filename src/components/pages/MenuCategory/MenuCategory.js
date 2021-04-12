import React, { useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import {
  selectCurrentCategory,
  selectCurrentItem,
  setCurrentCategory,
  setCurrentItem,
  selectMenuSlug,
  selectSoldOut,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { AppContext } from '../../../App'
import {
  CateringContact,
  Container,
  Content,
  Header,
  Logo,
  Main,
  PageTitle,
  SidebarModal,
} from '../..'
import { Back, Cart } from '../../buttons'
import MenuAllergenFilter from '../Menu/MenuAllergenFilter'
import {
  MenuCateringView,
  MenuCateringCategories,
  MenuCateringCategoryItem,
} from '../Menu/MenuCatering'
import MenuCategoryItem from './MenuCategoryItem'
import { Builder } from '../../sidebarModals'
import styled from '@emotion/styled'

const MenuCategoryChild = styled('div')`
  margin: 0 0 4rem;
`

const MenuCategoryChildHeader = styled('div')`
  margin: 0 0 3rem;

  h3 {
    font-size: 3.8rem;
    line-height: 1;
  }

  p {
    margin: 1rem 0 0;
  }
`

const MenuCategory = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const category = useSelector(selectCurrentCategory)
  const item = useSelector(selectCurrentItem)
  const soldOut = useSelector(selectSoldOut)
  const menuSlug = useSelector(selectMenuSlug)
  const { name, description, items, children } = category || {}

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!category) history.push(menuSlug)
  }, [category, history, menuSlug])

  const cancel = () => {
    dispatch(setCurrentCategory(null))
    dispatch(setCurrentItem(null))
  }

  if (!category) return null

  return (
    <>
      <Helmet>
        <title>Menu | {name}</title>
      </Helmet>
      <Content hasFooter={false}>
        <Header
          bgColor={isBrowser ? 'dark' : 'transparent'}
          borderColor={isBrowser ? 'dark' : 'transparent'}
          // style={isBrowser ? null : { position: 'absolute' }}
          title={
            isBrowser ? (
              <Link to="/">
                <Logo />
              </Link>
            ) : null
          }
          left={<Back text="Back to menu" onClick={cancel} />}
          right={<Cart />}
        />
        <Main>
          <MenuCateringView>
            <Container>
              <PageTitle title={name} subtitle={description}>
                <MenuAllergenFilter />
              </PageTitle>
              <MenuCateringCategories>
                {items.map((item) => (
                  <MenuCateringCategoryItem key={item.id}>
                    <MenuCategoryItem category={category} item={item} />
                  </MenuCateringCategoryItem>
                ))}
                {children.length === 0 && (
                  <MenuCateringCategoryItem>
                    <CateringContact />
                  </MenuCateringCategoryItem>
                )}
              </MenuCateringCategories>
              {children.map((child) => (
                <MenuCategoryChild>
                  <MenuCategoryChildHeader>
                    <h3>{child.name}</h3>
                    {child.description && <p>{child.description}</p>}
                  </MenuCategoryChildHeader>
                  <MenuCateringCategories>
                    {child.items.map((item) => (
                      <MenuCateringCategoryItem key={item.id}>
                        <MenuCategoryItem category={category} item={item} />
                      </MenuCateringCategoryItem>
                    ))}
                  </MenuCateringCategories>
                </MenuCategoryChild>
              ))}
              {children.length > 0 && (
                <MenuCateringCategories>
                  <MenuCateringCategoryItem>
                    <CateringContact />
                  </MenuCateringCategoryItem>
                </MenuCateringCategories>
              )}
            </Container>
          </MenuCateringView>
        </Main>
      </Content>
      <SidebarModal>
        <Builder menuItem={item} soldOut={soldOut} />
      </SidebarModal>
    </>
  )
}

MenuCategory.displayName = 'MenuCategory'
export default MenuCategory
