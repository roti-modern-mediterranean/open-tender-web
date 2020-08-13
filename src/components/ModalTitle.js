import React from 'react'
import propTypes from 'prop-types'

const ModalTitle = ({ title, id = 'dialogTitle' }) => {
  return (
    <p id={id} className="modal__title ot-heading ot-font-size-h3">
      {title}
    </p>
  )
}

ModalTitle.displayName = 'ModalTitle'
ModalTitle.propTypes = {
  title: propTypes.string,
  id: propTypes.string,
}

export default ModalTitle
