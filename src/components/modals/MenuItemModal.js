import propTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentItem, setCurrentItem } from '../../slices/orderSlice'
import { closeModal } from '../../slices/modalSlice'
import ModalClose from '../ModalClose'

const MenuItemModal = () => {
  const dispatch = useDispatch()
  const item = useSelector(selectCurrentItem)
  const bgStyle = item.large_image_url
    ? { backgroundImage: `url(${item.large_image_url}` }
    : null

  const onClick = () => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 500)
  }

  return (
    <>
      <ModalClose classes="link-light" onClick={onClick} />
      <div className="modal__content">
        {bgStyle && (
          <div
            className="modal__image bg-image bg-secondary-color"
            style={bgStyle}
          >
            &nbsp;
          </div>
        )}
        <div className="modal__header">
          <h2>{item.name}</h2>
          {item.description && <p>{item.description}</p>}
        </div>
        {/* <div className="modal__content"></div> */}
      </div>
    </>
  )
}

MenuItemModal.displayName = 'MenuItemModal'
MenuItemModal.propTypes = {
  close: propTypes.func,
}

export default MenuItemModal
