import propTypes from 'prop-types'
import React from 'react'

const BuilderRadio = ({ option, handler, classes = '' }) => {
  const price = parseFloat(option.price).toFixed(2)
  return (
    <label htmlFor={option.id} className={`label radio ${classes}`}>
      <input
        id={option.id}
        type="radio"
        className="radio__input"
        checked={option.quantity >= 1}
        onChange={handler}
      />
      <span className="radio__custom" />
      <span className="radio__desc">
        {option.name} ${price}
      </span>
    </label>
  )
}

BuilderRadio.displayName = 'BuilderRadio'
BuilderRadio.propTypes = {
  groupId: propTypes.number,
  option: propTypes.object,
  handler: propTypes.func,
  classes: propTypes.string,
}

export default BuilderRadio
