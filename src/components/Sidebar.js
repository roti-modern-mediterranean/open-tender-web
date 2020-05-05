import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSidebar, toggleSidebar } from '../slices/sidebarSlice'
// import { iconMap } from '../utils/icons'
import SidebarOverlay from './SidebarOverlay'
import Button from './Button'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector(selectSidebar)
  const classes = `sidebar bg-secondary-color ${isOpen ? 'is-open' : ''}`

  const handleClick = (evt) => {
    evt.preventDefault()
    dispatch(toggleSidebar())
    evt.target.blur()
  }

  return (
    <>
      <SidebarOverlay />
      <div className={classes}>
        <div className="sidebar__container">
          <div className="sidebar__header">
            <h2>Your Order</h2>
          </div>
          <div className="sidebar__footer bg-color">
            {/* <Button
              onClick={handleClick}
              icon="ChevronLeft"
              text="Back To Order"
            />
            <Button onClick={handleClick} icon="DollarSign" text="Checkout" /> */}
            <div className="sidebar__back">
              <Button onClick={handleClick} classes="btn">
                Back To Order
              </Button>
            </div>
            <div className="sidebar__checkout">
              <Button onClick={handleClick} classes="btn btn--checkout">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Sidebar.displayName = 'Sidebar'

export default Sidebar
