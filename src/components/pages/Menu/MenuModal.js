import { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { openModal, selectModalPrefs } from '../../../slices'

const MenuModal = () => {
  const dispatch = useDispatch()
  const { greenShug } = useSelector(selectModalPrefs) || {}

  useEffect(() => {
    let timer = null
    if (!greenShug) {
      timer = setTimeout(() => dispatch(openModal({ type: 'greenShug' })), 3000)
    }
    return () => clearTimeout(timer)
  }, [dispatch, greenShug])

  return null
}

MenuModal.displayName = 'MenuModal'
MenuModal.propTypes = {
  topOffset: propTypes.number,
}

export default MenuModal
