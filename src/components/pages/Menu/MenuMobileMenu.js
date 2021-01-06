import styled from '@emotion/styled'
import { Box, FormRow, Preface } from '@open-tender/components'
import { useSelector } from 'react-redux'
import { selectAutoSelect } from '@open-tender/redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import {
  Account,
  CancelEdit,
  GroupOrder,
  RequestedAt,
  RevenueCenter,
  ServiceType,
} from '../../buttons'

const MenuMobileMenuView = styled('div')`
  position: fixed;
  z-index: 12;
  top: 6rem;
  left: 0;
  right: 0;
  padding: ${(props) => props.theme.layout.paddingMobile};
  transition: all 0.125s ease;
  transform: translateY(${(props) => (props.show ? '0' : '-100%')});
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const MenuMobileMenuOverlay = styled('div')`
  position: fixed;
  z-index: 11;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlay.dark};
`

const MenuMobileMenuContainer = styled(Box)`
  padding: 0 ${(props) => props.theme.layout.paddingMobile};
  // background-color: ${(props) => props.theme.bgColors.primary};
`

const MenuMobileMenuButtons = styled('div')`
  padding: ${(props) => props.theme.layout.paddingMobile};
  padding-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: block;
  }

  button + button {
    margin-left: 1rem;
  }
`

const MenuMobileMenu = ({ order, showMenu, setShowMenu }) => {
  const { revenueCenter, serviceType, requestedAt } = order
  const autoSelect = useSelector(selectAutoSelect)

  return (
    <>
      <MenuMobileMenuView show={showMenu}>
        <MenuMobileMenuButtons>
          <Account useButton={true} />
          <GroupOrder useButton={true} />
          <CancelEdit useButton={true} />
        </MenuMobileMenuButtons>
        <MenuMobileMenuContainer>
          {revenueCenter && !autoSelect && (
            <FormRow
              type="div"
              label={<Preface size="xSmall">Location</Preface>}
              input={
                <RevenueCenter
                  style={{ position: 'relative', right: '-1.3rem' }}
                  useButton={true}
                />
              }
            />
          )}
          {serviceType && (
            <FormRow
              type="div"
              label={<Preface size="xSmall">Service Type</Preface>}
              input={
                <ServiceType
                  style={{ position: 'relative', right: '-1.3rem' }}
                  useButton={true}
                />
              }
            />
          )}
          {requestedAt && (
            <FormRow
              type="div"
              label={<Preface size="xSmall">Requested Time</Preface>}
              input={
                <RequestedAt
                  style={{ position: 'relative', right: '-1.3rem' }}
                  useButton={true}
                />
              }
            />
          )}
        </MenuMobileMenuContainer>
      </MenuMobileMenuView>
      <TransitionGroup component={null}>
        {showMenu ? (
          <CSSTransition
            key="mobile-menu-overlay"
            classNames="overlay"
            timeout={250}
          >
            <MenuMobileMenuOverlay onPointerUp={() => setShowMenu(false)} />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

export default MenuMobileMenu
